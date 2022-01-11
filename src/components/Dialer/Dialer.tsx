import { useState } from "react";
import { SOCKET, useSocket } from "../../context/SocketContext";
import { axios, callConnectId, getToken } from "../../utils/api";
import { useMutation } from "react-query";
import { useTwillioDevice } from "./useTwillioDevice";
import { useAudioRecorder } from "./useAudioRecorder";

interface DialerProps {
  phoneNumber: string;
  onStart: () => void;
  onDisconnect: () => void;
  fromNumber: string;
}

type DialerStatus =
  | "IDLE"
  | "READY"
  | "CONNECTING"
  | "RINGING"
  | "ON CALL"
  | "UPLOADING"
  | "DISCONNECTED"
  | "ERROR";

const STATUS_TO_MSG: Record<DialerStatus, string> = {
  "ON CALL": "On Call",
  CONNECTING: "Connecting",
  DISCONNECTED: "Disconnected",
  ERROR: "Error",
  IDLE: "Call",
  READY: "Call",
  RINGING: "Ringing",
  UPLOADING: "Uploading",
};

const uploadToS3 = async ({
  recorderURL,
  id,
}: {
  recorderURL: string;
  id: string;
}): Promise<"OK"> => {
  const fileName = id + ".ogg";
  const blob = await fetch(recorderURL).then((r) => r.blob());
  const file = new File([blob], fileName);
  const formData = new FormData();
  formData.append("file", file);
  formData.append("key", "recordings/" + id);
  return await axios
    .post("/api/aws/upload", formData, {
      headers: {
        authorization: "Bearer " + getToken(),
        "Content-Type": "multipart/form-data",
      },
    })
    .then(() => "OK");
};

export default function Dialer({
  phoneNumber,
  onStart,
  onDisconnect,
  fromNumber,
}: DialerProps) {
  const [status, setStatus] = useState<DialerStatus>("IDLE");
  // const [muted, setMuted] = useState(false);
  const socket = useSocket();
  const { device, status: deviceStatus, setupDevice } = useTwillioDevice();
  const [callRecordId, setCallRecordId] = useState("");
  const { startRecording, stopRecording } = useAudioRecorder(device);
  const mutation = useMutation(uploadToS3, {
    onMutate: () => {
      setStatus("UPLOADING");
    },
    onSuccess: () => {
      setStatus("DISCONNECTED");
    },
    onError: (error) => {
      console.log(error);
      setStatus("ERROR");
    },
  });

  const canConnect = !(
    status === "CONNECTING" ||
    status === "ON CALL" ||
    status === "RINGING"
  );
  // const canDisconnect = !canConnect;
  // const toggleMute = () => {
  //   device.activeConnection()?.mute(!muted);
  //   setMuted(!muted);
  // };

  const startCall = async () => {
    if (deviceStatus !== "created") {
      setupDevice();
    }
    setStatus("CONNECTING");
    const { callRecordID } = await callConnectId(fromNumber, "+" + phoneNumber);
    setCallRecordId(callRecordID);
    device.connect({
      from: fromNumber,
      to: "+" + phoneNumber,
      callRecordID,
      isAdmin: "false",
    });
    setStatus("RINGING");
    device.activeConnection()?.once("accept", () => setStatus("ON CALL"));
    onStart?.();
    startRecording();
  };

  const disconnectToServer = () => {
    socket.emit(SOCKET.USER_CALL_END, { callID: callRecordId });
  };

  const endCall = async () => {
    // Disconnect call and then destroy device
    device.disconnectAll();
    disconnectToServer();
    stopRecording(callRecordId, (recorderURL, id) => {
      mutation.mutate({
        recorderURL,
        id,
      });
    });
    setStatus("DISCONNECTED");
    onDisconnect?.();
  };

  if (device) {
    return (
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <button
          style={{
            width: "90%",
            padding: "0.5em",
            fontSize: "0.9em",
            backgroundColor: "#CA4C7C",
            outline: "none",
            border: "1px solid white",
            borderRadius: "0.3em",
            color: "white",
          }}
          onClick={() => {
            if (canConnect) {
              startCall();
            } else {
              endCall();
            }
          }}
        >
          {STATUS_TO_MSG[status]}
        </button>
        {/* {canDisconnect && (
          <div>
            You are {muted ? "muted" : "not muted"}
            <button onClick={toggleMute}>{muted ? "Unute" : "Mute"}</button>
          </div>
        )} */}
      </div>
    );
  }
  return <div style={{ marginTop: 10 }}>Creating Device</div>;
}

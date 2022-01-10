import { useState } from "react";
import { SOCKET, useSocket } from "../../context/SocketContext";
import { callConnectId } from "../../utils/api";
import S3 from "react-aws-s3";
import { useMutation } from "react-query";
import { useTwillioDevice } from "./useTwillioDevice";
import { useAudioRecorder } from "./useAudioRecorder";

interface DialerProps {
  phoneNumber: string;
  onStart: () => void;
  onDisconnect: () => void;
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
  const dirName = new Date().toDateString().replace(" ", "-");
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    dirName: dirName /* optional */,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY,
  };
  const blob = await fetch(recorderURL).then((r) => r.blob());
  const S3Client = new S3(config);
  return await S3Client.uploadFile(blob, id + ".opus");
};

export default function Dialer({
  phoneNumber,
  onStart,
  onDisconnect,
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
    const { callRecordID } = await callConnectId(
      "+18564153631",
      "+" + phoneNumber
    );
    setCallRecordId(callRecordID);
    device.connect({
      from: "+18564153631",
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
    stopRecording(callRecordId, (audioURL, recordId) => {
      fetch(audioURL);
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

import React, { useEffect, useRef, useState } from "react";
import { Connection, Device } from "twilio-client";
import { SOCKET, useSocket } from "../context/SocketContext";
import { callConnectId } from "../utils/api";
import S3 from "react-aws-s3";
import { useMutation } from "react-query";

interface DialerProps {
  phoneNumber: string;
  device: Device;
  token: string;
  onDisconnect: () => void;
  setRecorderURL: (url: string) => void;
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
  token,
  device,
  onDisconnect,
  setRecorderURL,
}: DialerProps) {
  const [status, setStatus] = useState<DialerStatus>("IDLE");
  const [muted, setMuted] = useState(false);
  const socket = useSocket();
  const [callRecordId, setCallRecordId] = useState("");
  const callStreamRef = useRef(new MediaStream());
  const callStream = callStreamRef.current;
  const recorderRef = useRef(new MediaRecorder(callStream));
  const recorder = recorderRef.current;
  const chunks = useRef<BlobEvent["data"][]>([]);
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
  const canDisconnect = !canConnect;
  const toggleMute = () => {
    device.activeConnection()?.mute(!muted);
    setMuted(!muted);
  };

  const startCall = async () => {
    setStatus("CONNECTING");
    const { callRecordID } = await callConnectId(
      "+18564153631",
      "+1" + phoneNumber
    );
    setCallRecordId(callRecordID);
    device.connect({
      from: "+18564153631",
      to: "+1" + phoneNumber,
      callRecordID,
      isAdmin: "false",
    });
    setStatus("RINGING");
  };

  useEffect(() => {
    recorder.ondataavailable = (e) => {
      chunks.current.push(e.data);
    };
    recorder.onstop = (e) => {
      console.log("Stopped Recording");
      const audioBlob = new Blob(chunks.current, {
        type: "audio/ogg; codecs=opus",
      });
      chunks.current = [];
      const audioURL = URL.createObjectURL(audioBlob);
      console.log(audioURL);
      setRecorderURL(audioURL);
      mutation.mutate({
        recorderURL: audioURL,
        id: callRecordId,
      });
      const newStream = new MediaStream();
      callStreamRef.current = newStream;
      recorderRef.current = new MediaRecorder(newStream);
    };
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    const disconnectToServer = () => {
      socket.emit(SOCKET.USER_CALL_END, { callID: callRecordId });
    };
    device.setup(token, {
      fakeLocalDTMF: true,
      enableRingingState: true,
    });
    // const mergedStream = new MediaStream();
    // const recorder = new MediaRecorder(mergedStream);
    // const chunks: BlobEvent["data"][] = [];
    // let isRecording = false;
    // recorder.ondataavailable = (e) => {
    //   chunks.push(e.data);
    // };
    // recorder.onstop = (e) => {
    //   console.log(isRecording);
    //   if (isRecording) {
    //     console.log("Stopped Recording");
    //     const audioBlob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
    //     chunks.length = 0;
    //     const audioURL = URL.createObjectURL(audioBlob);
    //     console.log(audioURL);
    //     setRecorderURL(audioURL);
    //     isRecording = false;
    //   }
    // };

    device.on("ready", () => {
      console.log("Twilio.Device Ready!");
      setStatus("READY");
    });

    device.on("error", function (error) {
      console.log("Twilio.Device Error: " + error.message);
      setStatus("ERROR");
    });

    device.on("connect", function (conn: Connection) {
      console.log("Successfully established call!");
      conn.on("accept", () => {
        setStatus("ON CALL");
      });
      const localStream = conn.getLocalStream();
      const remoteStream = conn.getRemoteStream();
      if (localStream && remoteStream) {
        callStream.addTrack(localStream.getAudioTracks()[0]);
        callStream.addTrack(remoteStream.getAudioTracks()[0]);
        recorder.start();
        console.log("Started Recording", recorder.state);
      }
      // console.log(localStream, remoteStream);
      // socket.emit(SOCKET.CALL_ADD_CSID, {
      //   callId: ref.current,
      //   csid: conn.parameters.CallSid,
      // });
      // socket.emit(SOCKET.USER_CALL_START, { callID: ref.current });
    });

    device.on("disconnect", function (conn) {
      console.log("Disconnected");
      setStatus("DISCONNECTED");
      if (recorder.state === "recording") {
        recorder.stop();
      }
      // console.log("Stopping Recording");
      // if (isRecording) {
      //   recorder.stop();
      // }
      disconnectToServer();
      // _device.destroy();
      // onDisconnect();
    });

    // return () => {
    //   _device.disconnectAll();
    //   _device.destroy();
    //   onDisconnect();
    // };
  }, [token, device]);
  if (device) {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>
          Device Status : <code>{status}</code>
        </h3>
        {canConnect && (
          <button style={{ marginRight: 20 }} onClick={startCall}>
            Connect
          </button>
        )}
        {canDisconnect && (
          <button
            onClick={() => {
              device.disconnectAll();
            }}
          >
            Disconnect
          </button>
        )}
        {canDisconnect && (
          <div>
            You are {muted ? "muted" : "not muted"}
            <button onClick={toggleMute}>{muted ? "Unute" : "Mute"}</button>
          </div>
        )}
      </div>
    );
  }
  return <div style={{ marginTop: 10 }}>Creating Device</div>;
}

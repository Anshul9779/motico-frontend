import { useRef, useState } from "react";
import { Device } from "twilio-client";

type RecorderStatus = "idle" | "recording" | "error" | "ended";

export const useAudioRecorder = (device: Device) => {
  const [status, setStatus] = useState<RecorderStatus>("idle");
  const callStreamRef = useRef(new MediaStream());
  const callStream = callStreamRef.current;
  const recorderRef = useRef(new MediaRecorder(callStream));
  const recorder = recorderRef.current;
  const chunks = useRef<BlobEvent["data"][]>([]);

  const log = (logStr: any, type: "ERR" | "LOG" = "LOG") =>
    console.log(`${type} [useAudioRecorder] `, logStr);

  const startRecording = () => {
    const conn = device.activeConnection();
    if (!conn) {
      log("active connection is not there");
      return;
    }
    conn.once("sample", () => {
      const localStream = conn.getLocalStream();
      const remoteStream = conn.getRemoteStream();
      if (localStream && remoteStream) {
        callStream.addTrack(localStream.getAudioTracks()[0]);
        callStream.addTrack(remoteStream.getAudioTracks()[0]);
        recorder.start();
        setStatus("recording");
        recorder.ondataavailable = (e) => chunks.current.push(e.data);
        recorder.onerror = (ev) => {
          log(ev, "ERR");
          setStatus("error");
        };
      } else {
        log("Cannot start recording", "ERR");
      }
    });
  };

  const stopRecording = (
    id: string,
    callback: (recorderURL: string, id: string) => void
  ) => {
    recorder.stop();
    recorder.onstop = () => {
      const audioBlob = new Blob(chunks.current, {
        type: "audio/ogg; codecs=opus",
      });
      chunks.current = [];
      setStatus("ended");
      const audioURL = URL.createObjectURL(audioBlob);
      callback(audioURL, id);
      callStreamRef.current = new MediaStream();
      recorderRef.current = new MediaRecorder(callStreamRef.current);
    };
  };

  return {
    status,
    startRecording,
    stopRecording,
  };
};

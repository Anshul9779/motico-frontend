import React, { useEffect, useRef, useState } from "react";
import { Device } from "twilio-client";
import Dialer from "./components/Dialer";
import { twillioToken } from "./utils/api";

export default function Call() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [calling, setCalling] = useState(false);
  const [recorderURL, setRecorderURL] = useState("");
  const device = useRef(new Device()).current;

  useEffect(() => {
    twillioToken().then(setToken);
  }, []);

  return (
    <div>
      <input
        type="number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={() => setCalling(true)}>Call</button>
      {recorderURL && <audio src={recorderURL} controls />}
      {calling && (
        <Dialer
          phoneNumber={phoneNumber}
          token={token}
          onDisconnect={() => {
            setCalling(false);
          }}
          device={device}
          setRecorderURL={setRecorderURL}
        />
      )}
    </div>
  );
}

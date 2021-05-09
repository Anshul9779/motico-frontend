import React, { useEffect, useState } from "react";
import Dialer from "./components/Dialer";
import { twillioToken } from "./utils/api";

export default function Call() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [token, setToken] = useState("");
  const [calling, setCalling] = useState(false);

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
      {calling && (
        <Dialer
          phoneNumber={phoneNumber}
          token={token}
          onDisconnect={() => {
            setCalling(false);
          }}
        />
      )}
    </div>
  );
}

import React, { useEffect, useRef, useState } from "react";
import { Connection, Device } from "twilio-client";

interface DialerProps {
  token: string;
  onDisconnect: () => void;
  callRecordID: string;
}

export default function AdminDialer({
  token,
  onDisconnect,
  callRecordID,
}: DialerProps) {
  const [status, setStatus] = useState("");
  const device = useRef<Device>();
  const connection = useRef<Connection>();
  const [muted, setMuted] = useState(true);
  // const [connection, setConnection] = useState<Connection>();
  const ref = useRef("");

  useEffect(() => {
    if (!token) {
      return;
    }
    const _device = new Device(token, {
      fakeLocalDTMF: true,
      enableRingingState: true,
    });
    device.current = _device;
    _device.on("ready", () => {
      console.log("Twilio.Device Ready!");
      setStatus("Ready");
    });

    _device.on("error", function (error) {
      console.log("Twilio.Device Error: " + error.message);
      setStatus("ERROR: " + error.message);
    });

    _device.on("connect", function (conn) {
      console.log("Successfully established call!");
      setStatus("In call");
    });

    _device.on("disconnect", function (conn) {
      console.log("Disconnected");
      setStatus("Disconnect -> Ready");
      _device.destroy();
      onDisconnect();
    });

    return () => {
      _device.disconnectAll();
      _device.destroy();
      onDisconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  if (muted && !connection.current?.isMuted()) {
    connection.current?.mute(true);
  }
  if (device) {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>
          Device Status : <code>{status}</code>
        </h3>
        <button
          style={{ marginRight: 20 }}
          onClick={async () => {
            ref.current = callRecordID;
            const conn = device.current?.connect({
              // Not used server side
              // from: "+18564153631",
              // to: "+91" + phoneNumber,
              callRecordID,
              // TS types are Record<string, string>
              isAdmin: "true",
            });
            conn?.mute(true);
            connection.current = conn;
            connection.current?.mute(true);
          }}
        >
          Connect
        </button>
        <button
          onClick={() => {
            device.current?.disconnectAll();
            device.current?.destroy();
          }}
        >
          Disconnect
        </button>
        {
          <div>
            You are {muted ? "muted" : "not muted"}
            <button
              onClick={() => {
                setMuted(!muted);
                connection.current?.mute(!muted);
              }}
            >
              {muted ? "UnMute" : "Mute"}
            </button>
          </div>
        }
      </div>
    );
  }
  return <div style={{ marginTop: 10 }}>Creating Device</div>;
}

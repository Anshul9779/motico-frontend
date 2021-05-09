import React, { useEffect, useRef, useState } from "react";
import { Connection, Device } from "twilio-client";
import { SOCKET, useSocket } from "../context/SocketContext";
import { callConnectId } from "../utils/api";

interface DialerProps {
  phoneNumber: string;
  token: string;
  onDisconnect: () => void;
}

export default function Dialer({
  phoneNumber,
  token,
  onDisconnect,
}: DialerProps) {
  const [status, setStatus] = useState("");
  const [device, setDevice] = useState<Device>(null!);
  const connection = useRef<Connection>();
  const socket = useSocket();
  const ref = useRef("");
  const [muted, setMuted] = useState(false);

  const disconnectToServer = () => {
    socket.emit(SOCKET.USER_CALL_END, { callID: ref.current });
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const _device = new Device(token, {
      fakeLocalDTMF: true,
      enableRingingState: true,
    });
    setDevice(_device);
    _device.on("ready", () => {
      console.log("Twilio.Device Ready!");
      setStatus("Ready");
    });

    _device.on("error", function (error) {
      console.log("Twilio.Device Error: " + error.message);
      setStatus("ERROR: " + error.message);
    });

    _device.on("connect", function (conn: Connection) {
      console.log("Successfully established call!");
      setStatus("In call with " + phoneNumber);
      console.log(conn);
      socket.emit(SOCKET.CALL_ADD_CSID, {
        callId: ref.current,
        csid: conn.parameters.CallSid,
      });
      socket.emit(SOCKET.USER_CALL_START, { callID: ref.current });
    });

    _device.on("disconnect", function (conn) {
      console.log("Disconnected");
      setStatus("Disconnect -> Ready");
      disconnectToServer();
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
  if (device) {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>
          Device Status : <code>{status}</code>
        </h3>
        <button
          style={{ marginRight: 20 }}
          onClick={async () => {
            const { callRecordID } = await callConnectId(
              "+18564153631",
              "+91" + phoneNumber
            );
            ref.current = callRecordID;
            const conn = device.connect({
              from: "+18564153631",
              to: "+91" + phoneNumber,
              callRecordID,
              isAdmin: "false",
            });
            connection.current = conn;
          }}
        >
          Connect
        </button>
        <button
          onClick={() => {
            device.disconnectAll();
            device.destroy();
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

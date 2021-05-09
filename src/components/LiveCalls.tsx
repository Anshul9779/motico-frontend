import React, { useState } from "react";
import { SocketCallRecord } from "../LiveActivity";
import ReactModal from "react-modal";
import Barge from "../Barge";
import BargeImage from "./../images/barge.jpg";
import Whisper from "./../images/whispher.jpg";

export default function LiveCalls({
  liveCalls,
}: {
  liveCalls: SocketCallRecord[];
}) {
  const [interceptingCallId, setInterceptingCallId] = useState("");
  const [showModal, setShowModal] = useState(false);
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1em",
        borderRadius: "4px",
        minHeight: "10em",
      }}
    >
      <ReactModal
        isOpen={showModal}
        style={{
          overlay: {
            zIndex: 10,
          },
        }}
      >
        {showModal && (
          <Barge
            query={interceptingCallId}
            onDisconnect={() => setShowModal(false)}
          />
        )}
      </ReactModal>
      <table style={{ width: "100%" }}>
        <tr style={{ color: "#6C7A81" }}>
          <th style={{ fontWeight: "normal" }}>Agent</th>
          <th style={{ fontWeight: "normal" }}>From</th>
          <th style={{ fontWeight: "normal" }}>To</th>
          <th style={{ fontWeight: "normal" }}>Start Time</th>
          <th style={{ fontWeight: "normal" }}>Status</th>
          <th style={{ fontWeight: "normal" }}>Function</th>
        </tr>
        {liveCalls.map((call) => {
          return (
            <tr>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {call.agent}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {call.from}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {call.to}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {new Date(call.startTime).toLocaleTimeString()}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {call.status}
              </td>
              <td
                style={{
                  textAlign: "center",
                  paddingTop: "1em",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                }}
                onClick={() => {
                  setInterceptingCallId(call.id);
                  setShowModal(true);
                }}
              >
                <img
                  src={BargeImage}
                  style={{
                    borderRadius: "50%",
                    objectFit: "contain",
                    marginRight: "0.5em",
                  }}
                  width={20}
                  alt=""
                />
                <img
                  src={Whisper}
                  style={{ borderRadius: "50%", objectFit: "contain" }}
                  width={20}
                  alt=""
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

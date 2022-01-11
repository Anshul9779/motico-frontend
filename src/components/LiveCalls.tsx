import React, { useState } from "react";
import ReactModal from "react-modal";
import Barge from "../Barge";
import { CallRecord } from "../utils/types";
import BargeImage from "./../images/barge.jpg";
import Whisper from "./../images/whispher.jpg";

export default function LiveCalls({
  callIds,
  callRecords,
}: {
  callIds: string[];
  callRecords: Record<string, CallRecord>;
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
        {callIds.map((callId) => {
          const callRecord = callRecords[callId];
          if (!callRecord) {
            return null;
          }
          return (
            <tbody key={callRecord.id}>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {callRecord.user.firstName}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {callRecord.from}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {callRecord.to}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {new Date(callRecord.startTime).toLocaleTimeString()}
              </td>
              <td style={{ textAlign: "center", paddingTop: "1em" }}>
                {callRecord.type[0] + callRecord.type.slice(1).toLowerCase()}
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
                  setInterceptingCallId(callRecord.id);
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
            </tbody>
          );
        })}
      </table>
    </div>
  );
}

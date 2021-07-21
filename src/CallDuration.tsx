import React from "react";
import { useQuery } from "react-query";
import { axios, getToken } from "./utils/api";
import ProgressBar from "@ramonak/react-progress-bar";
import StatsCard from "./components/Card/StatsCard";

export default function CallDuration() {
  const { data } = useQuery<{
    inboundDuration: number;
    outgoingDuration: number;
    yearTalkTime: number;
    monthTalktime: number;
    weekTalktime: number;
    todayTalkTime: number;
  }>(
    "call-duration",
    () =>
      axios
        .get("/api/call/call-duration", {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        })
        .then((data) => data.data),
    {
      staleTime: 60 * 1000,
    }
  );
  return (
    <div style={{ flex: 1 }}>
      <div style={{ backgroundColor: "white", paddingLeft: "1.5rem" }}>
        <div
          style={{
            padding: "0 1.2rem 0.8rem 1.2rem",
            borderBottom: "5px solid #2B3144",
            width: "fit-content",
            cursor: "pointer",
            color: "#6C7A81",
          }}
        >
          Call Duration
        </div>
      </div>
      <div
        style={{
          marginTop: "1em",
          backgroundColor: "white",
          borderRadius: 8,
          padding: "1.5em",
          margin: "2em",
        }}
      >
        <h3>Total Talktime</h3>
        <div style={{ marginTop: "2em" }}>
          <p>Year</p>
          <ProgressBar
            completed={((data?.yearTalkTime ?? 0) * 100) / 20000000}
            isLabelVisible={false}
            height={"10px"}
            bgColor="#9C4974"
          />
          <p>Month</p>
          <ProgressBar
            completed={((data?.monthTalktime ?? 0) * 100) / 2000}
            isLabelVisible={false}
            height={"10px"}
            bgColor="#DE9395"
          />
          <p>Week</p>
          <ProgressBar
            completed={((data?.weekTalktime ?? 0) * 100) / 2000}
            isLabelVisible={false}
            height={"10px"}
            bgColor="#FE7183"
          />
          <p>Day</p>
          <ProgressBar
            completed={((data?.todayTalkTime ?? 0) * 100) / 2000}
            isLabelVisible={false}
            height={"10px"}
            bgColor="#FF9580"
          />
        </div>
      </div>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ margin: "3em", flex: 1, maxWidth: "30%" }}>
          <div>
            <StatsCard
              theme="orange"
              title="OutBound TalkTime"
              body={(data?.outgoingDuration ?? 0).toFixed(2) + "min"}
            />
          </div>
        </div>
        <div style={{ margin: "3em", flex: 1, maxWidth: "30%" }}>
          <div>
            <StatsCard
              title="InBound TalkTime"
              body={(data?.inboundDuration ?? 0).toFixed(2) + "min"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import Avatar from "./components/Avatar";
import { Card } from "./components/Card/Card";
import StatsCard from "./components/Card/StatsCard";
import { callAnalytics } from "./utils/api";
import { useAuth } from "./utils/hooks";
import Online from "./images/online.jpg";

export default function CallSummary() {
  const { firstName } = useAuth();
  const [
    { inbound, outgoing, missed, total, averageMinutes },
    setAnalytics,
  ] = useState({
    inbound: 0,
    outgoing: 0,
    missed: 0,
    total: 0,
    averageMinutes: 0,
  });
  useEffect(() => {
    callAnalytics().then(setAnalytics);
  }, []);
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
          Call Summary
        </div>
      </div>
      <div style={{ display: "flex", flex: 1, gap: "1.5em", padding: "2rem" }}>
        <div style={{ flex: 1, display: "flex" }}>
          <Card style={{ width: "100%" }}>
            <Card.Header background="none" />
            <Card.Body
              style={{
                height: "90%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  marginTop: "2em",
                  flexDirection: "column",
                }}
              >
                <Avatar size={100} />
                <div
                  style={{
                    marginTop: "0.5em",
                    fontWeight: "bold",
                    fontSize: "2em",
                    color: "rgb(110,55,110)",
                  }}
                >
                  {firstName}
                </div>
              </div>
              <div
                style={{
                  alignItems: "center",
                  display: "flex",
                  marginBottom: "1.7em",
                  flexDirection: "column",
                }}
              >
                <img
                  src={Online}
                  alt="Online"
                  style={{ marginBottom: "1em" }}
                />
                <div style={{ marginBottom: "0.5em" }}>Total Calls Made</div>
                <div style={{ fontSize: "2em" }}>{total}</div>
              </div>
            </Card.Body>
            <Card.Footer />
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <StatsCard
            title="Total Calls"
            body={inbound + outgoing + missed}
            theme="gradient"
            style={{ marginBottom: "1.5rem" }}
            perToday
          />
          <StatsCard
            title="Total Outbound"
            body={outgoing}
            theme="light"
            style={{ marginBottom: "1.5rem" }}
            perToday
          />
          <StatsCard title="Total Successful Calls" body="2,300" perToday />
        </div>
        <div style={{ flex: 1 }}>
          <StatsCard
            title="Total Inbound"
            body={inbound}
            theme="light"
            style={{ marginBottom: "1.5rem" }}
            perToday
          />
          <StatsCard
            title="Total Missed Calls"
            body={missed}
            style={{ marginBottom: "1.5rem" }}
            perToday
          />
          <StatsCard
            title="Average Call Duration"
            theme="light"
            body={`${Number(averageMinutes ?? 0).toFixed(2)} Min`}
            perToday
          />
        </div>
      </div>
    </div>
  );
}

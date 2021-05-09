import React from "react";
import { Card } from "./components/Card/Card";
import { GiTimeTrap } from "react-icons/gi";
import { Link } from "react-router-dom";
import LiveActivity from "./images/live_activity.jpg";
import Analytics from "./images/analytics.jpg";
import CallSummary from "./images/call_summary.jpg";
import StatsCard from "./components/Card/StatsCard";

export default function Dashboard() {
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
          Dashboard
        </div>
      </div>
      <div
        style={{
          backgroundColor: "#F2F6F7",
          padding: "2rem 2.5rem",
          display: "flex",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 2, display: "flex", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", gap: "1em", marginBottom: "1em" }}>
              <Link to="/call-summary" style={{ textDecoration: "none" }}>
                <img
                  src={CallSummary}
                  alt="Cal Summary"
                  style={{ borderRadius: "8px" }}
                />
              </Link>

              <Link to="/live-activity" style={{ textDecoration: "none" }}>
                <img
                  src={LiveActivity}
                  alt="Live Activity"
                  style={{ borderRadius: "8px" }}
                />
              </Link>
            </div>
            <Link to="/analytics" style={{ textDecoration: "none" }}>
              <img
                src={Analytics}
                alt="Analytics"
                style={{ borderRadius: "8px" }}
              />
            </Link>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <StatsCard
            title="Total Numbers"
            body="345"
            theme="light"
            style={{ marginBottom: "1.5em" }}
          />
          <StatsCard
            title="Free Incoming Min"
            body="2,300 Min"
            theme="dark"
            style={{ marginBottom: "1.5em" }}
          />
          <StatsCard title="Total Users" body="345" theme="light" />
        </div>
      </div>
    </div>
  );
}

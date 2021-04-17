import React from "react";
import { Card } from "./components/Card/Card";
import { FiActivity, FiPhoneCall } from "react-icons/fi";
import { RiDonutChartFill } from "react-icons/ri";
import { GiTimeTrap } from "react-icons/gi";

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
          <div style={{ flex: 1.5 }}>
            <Card style={{ cursor: "pointer" }}>
              <Card.Header
                background="light"
                style={{ padding: "1.5rem", paddingBottom: 0 }}
              >
                Call Summary
              </Card.Header>
              <Card.Body
                background="light"
                style={{ textAlign: "center", paddingTop: "0.5rem" }}
              >
                <FiPhoneCall style={{ color: "white", fontSize: "5.2rem" }} />
              </Card.Body>
              <Card.Footer background="light" />
            </Card>
            <Card style={{ cursor: "pointer", marginTop: "2.5rem" }}>
              <Card.Header
                background="dark"
                style={{ padding: "1.5rem", paddingBottom: 0 }}
              >
                Analytics
              </Card.Header>
              <Card.Body
                background="dark"
                style={{ textAlign: "center", paddingTop: "0.5rem" }}
              >
                <RiDonutChartFill
                  style={{ color: "white", fontSize: "5.2rem" }}
                />
              </Card.Body>
              <Card.Footer background="dark" />
            </Card>
          </div>
          <div style={{ flex: 1 }}>
            <Card style={{ cursor: "pointer" }}>
              <Card.Header
                background="dark"
                style={{ padding: "1.5rem", paddingBottom: 0 }}
              >
                Live Activity
              </Card.Header>
              <Card.Body
                background="dark"
                style={{ textAlign: "center", paddingTop: "0.5rem" }}
              >
                <FiActivity style={{ color: "white", fontSize: "5.2rem" }} />
              </Card.Body>
              <Card.Footer background="dark" />
            </Card>
            <Card style={{ cursor: "pointer", marginTop: "2.5rem" }}>
              <Card.Header
                background="light"
                style={{ padding: "1.5rem", paddingBottom: 0 }}
              >
                Call Duration
              </Card.Header>
              <Card.Body
                background="light"
                style={{ textAlign: "center", paddingTop: "0.5rem" }}
              >
                <GiTimeTrap style={{ color: "white", fontSize: "5.2rem" }} />
              </Card.Body>
              <Card.Footer background="light" />
            </Card>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Card style={{ cursor: "pointer" }}>
            <Card.Header background="light" style={{ padding: "0.75rem" }}>
              Total Numbers
            </Card.Header>
            <Card.Body
              background="none"
              style={{ textAlign: "center", paddingTop: "0.5rem" }}
            >
              <div style={{ fontSize: "2rem" }}>345</div>
            </Card.Body>
            <Card.Footer background="none" />
          </Card>
          <Card style={{ cursor: "pointer", marginTop: "1rem" }}>
            <Card.Header background="dark" style={{ padding: "0.75rem" }}>
              Free Incoming Min
            </Card.Header>
            <Card.Body
              background="none"
              style={{ textAlign: "center", paddingTop: "0.5rem" }}
            >
              <div style={{ fontSize: "2rem" }}>2,300 Min</div>
            </Card.Body>
            <Card.Footer background="none" />
          </Card>
          <Card style={{ cursor: "pointer", marginTop: "1rem" }}>
            <Card.Header background="light" style={{ padding: "0.75rem" }}>
              Total Users
            </Card.Header>
            <Card.Body
              background="none"
              style={{ textAlign: "center", paddingTop: "0.5rem" }}
            >
              <div style={{ fontSize: "2rem" }}>345</div>
            </Card.Body>
            <Card.Footer background="none" />
          </Card>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Card } from "./Card/Card";
import Toggle from "react-toggle";
import Edit from "./../images/edit.png";
import Dialer from "./../images/dialer.png";
import Delete from "./../images/delete.png";

export default function FrwdToDevice() {
  return (
    <div
      style={{
        minHeight: "90vh",
        flex: 1,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        gap: "1.5em",
        padding: "1em",
      }}
    >
      <Card style={{ flex: 2 }}>
        <Card.Body
          background="gradient"
          style={{ borderRadius: "0.5em", padding: "2em" }}
        >
          <h3 style={{ color: "white" }}>Forward to Device</h3>
          <div style={{ marginTop: "1em", display: "flex" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img src={Dialer} alt="" style={{ height: 150 }} />
            </div>
            <div style={{ flex: 1 }}>
              {" "}
              <h4 style={{ color: "white" }}>Forward to Device</h4>{" "}
              <p style={{ color: "white" }}>
                The number of SMS that can be sent by this user is been set to
                200 per day. To increase the limit, please contact us on
                support@motico.com
              </p>
              <div
                style={{
                  marginTop: "0.5em",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <p style={{ color: "white", fontWeight: "bold" }}>
                    +91838383860696
                  </p>
                  <div
                    style={{
                      marginLeft: "3em",
                      marginRight: "auto",
                      gap: "1em",
                    }}
                  >
                    <img
                      src={Edit}
                      alt=""
                      style={{
                        height: 20,
                        borderRadius: "50%",
                      }}
                    />
                    <img
                      src={Delete}
                      alt=""
                      style={{
                        height: 20,
                        borderRadius: "50%",
                        marginLeft: "1.5em",
                      }}
                    />
                  </div>
                </div>
                <div>
                  <Toggle checked={true} />
                </div>
              </div>
              <p style={{ color: "white" }}>
                Number of calls on forward calling : 0
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>
      <Card style={{ flex: 1 }}>
        <Card.Body
          background="gradient"
          style={{ borderRadius: "0.5em", padding: "2em" }}
        >
          <h3 style={{ color: "white" }}>Strict Mode</h3>
          <form>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ color: "white" }}>It goes to call waiting</p>{" "}
              <input type="radio" name="" id="" />
            </div>
            <p style={{ color: "white" }}>
              Machine Detection for forward device
            </p>
            <h3 style={{ color: "white" }}>Moderate Mode</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p style={{ color: "white" }}>If sticky agent is busy</p>{" "}
              <input type="radio" name="" id="" />
            </div>
            <p style={{ color: "white" }}>Transfer call to another agent</p>
          </form>
        </Card.Body>
      </Card>
    </div>
  );
}

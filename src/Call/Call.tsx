import React, { useEffect, useRef, useState } from "react";
import { Device } from "twilio-client";
import Dialer from "../components/Dialer";
import { twillioToken } from "../utils/api";
import Logo from "./../images/MotiCo Logo.png";
import NumberButton from "./NumberButton";
import Timer from "./Timer";
import { BUTTONS } from "./utils";

export default function Call() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("+91");
  const [token, setToken] = useState("");
  const [calling, setCalling] = useState(false);
  const [, setRecorderURL] = useState("");
  const device = useRef(new Device()).current;

  useEffect(() => {
    twillioToken().then(setToken);
  }, []);

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#2B3144",
            height: "100vh",
            width: "15vw",
          }}
        >
          <img
            src={Logo}
            alt="MotiCo"
            style={{ objectFit: "contain", width: "80%", padding: "1em" }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "2em",
              paddingTop: "5em",
              background:
                "linear-gradient(90deg, rgba(204,87,124,1) 0%, rgba(254,157,122,1) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                minHeight: "13%",
                width: "60%",
                backgroundColor: "#983F75",
                border: "1px solid white",
                margin: "1em",
                borderRadius: "0.3em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {calling && <Timer />}
            </div>
            <div
              style={{
                backgroundColor: "#77386E",
                padding: "0.3em",
                maxWidth: "33%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.3em",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <select
                  name=""
                  id=""
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  style={{
                    fontSize: "1.5em",
                    padding: "0.5em",
                    outline: "none",
                    borderTopLeftRadius: "0.5em",
                    borderBottomLeftRadius: "0.5em",
                  }}
                >
                  <option value="+91">+91</option>
                  <option value="+1">+1</option>
                </select>
                <input
                  type="number"
                  value={phoneNumber}
                  style={{
                    fontSize: "1.5em",
                    padding: "0.5em",
                    outline: "none",
                    borderTopRightRadius: "0.5em",
                    borderBottomRightRadius: "0.5em",
                    border: "none",
                  }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div
                style={{
                  margin: "0.5em 0",
                  color: "white",
                  textAlign: "center",
                }}
              >
                {`${new Date().getHours()}:${new Date().getMinutes()}, ${new Date().toDateString()}`}
              </div>
              <div
                style={{
                  backgroundColor: "#FF6F87",
                  flex: 1,
                  padding: "0.9em",
                  borderRadius: "0.1em",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "1.5em",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                {BUTTONS.map((numberButton) => {
                  return (
                    <NumberButton
                      key={numberButton.characters + numberButton.number}
                      {...numberButton}
                      onClick={() => {
                        setPhoneNumber(
                          (oldNumber) => oldNumber + numberButton.number
                        );
                      }}
                    />
                  );
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.5em 0",
                }}
              >
                {token ? (
                  <Dialer
                    phoneNumber={code + phoneNumber}
                    token={token}
                    key={phoneNumber}
                    onStart={() => {
                      setCalling(true);
                    }}
                    onDisconnect={() => {
                      setCalling(false);
                    }}
                    device={device}
                    setRecorderURL={setRecorderURL}
                  />
                ) : (
                  <button
                    style={{
                      width: "90%",
                      padding: "0.5em",
                      fontSize: "0.9em",
                      backgroundColor: "#CA4C7C",
                      outline: "none",
                      border: "1px solid white",
                      opacity: 0.7,
                      borderRadius: "0.3em",
                      color: "white",
                    }}
                  >
                    Setting Up
                  </button>
                )}
              </div>
            </div>
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Spinner } from "react-activity";
import { useHistory } from "react-router-dom";
import Dialer from "../components/Dialer";
import NotAuthorized from "../components/NotAuthorized";
import { useMe, useUser } from "../utils/hooks";
import Logo from "./../images/MotiCo Logo.png";
import Flag from "./Flag";
import LeftSidebar from "./LeftSidebar";
import NumberButton from "./NumberButton";
import Timer from "./Timer";
import { BUTTONS } from "./utils";

export default function Call() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("+91");
  const [calling, setCalling] = useState(false);
  const { data } = useUser();
  const [fromNumber, setFromNumber] = useState(data?.phoneNumbers?.[0]?.number);
  const { data: me } = useMe();
  const history = useHistory();

  console.log({ fromNumber }, data?.phoneNumbers?.[0]?.number);
  if (!me) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </div>
    );
  }

  if (!me.dialler) {
    return <NotAuthorized />;
  }

  if (!fromNumber && !data?.phoneNumbers?.[0]?.number) {
    return <NotAuthorized label="You don't have any assigned phonenumbers" />;
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#2B3144",
            minHeight: "100vh",
            width: "15vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={Logo}
            alt="MotiCo"
            onClick={() => history.push("/")}
            style={{
              objectFit: "contain",
              width: "80%",
              padding: "1em",
              cursor: "pointer",
            }}
          />
          <LeftSidebar />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              padding: "1.75em",
              paddingTop: "2em",
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
                minHeight: "10%",
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
                <Dialer
                  phoneNumber={code + phoneNumber}
                  onStart={() => {
                    setCalling(true);
                  }}
                  onDisconnect={() => {
                    setCalling(false);
                  }}
                  fromNumber={
                    fromNumber ? fromNumber : data?.phoneNumbers[0].number ?? ""
                  }
                />
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "0.5em 0",
                  gap: "0.5em",
                }}
              >
                {data && (
                  <Flag
                    phoneNumbers={data?.phoneNumbers ?? []}
                    number={fromNumber ?? ""}
                  />
                )}
                <select
                  value={fromNumber}
                  onChange={(e) => setFromNumber(e.target.value)}
                  style={{
                    backgroundColor: "#77376D",
                    outline: "none",
                    border: "none",
                    color: "white",
                    padding: "0.25em",
                    fontSize: "1.1em",
                    fontWeight: "bold",
                  }}
                >
                  {data?.phoneNumbers.map((number) => {
                    return (
                      <option key={number._id} value={number.number}>
                        {number.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

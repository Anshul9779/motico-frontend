import React, { useEffect, useRef } from "react";
import AfterCallUser from "./components/AfterCallUser";
import { Card } from "./components/Card/Card";
import FrwdToDevice from "./components/FrwdToDevice";
import TimeZoneUser from "./components/TimeZoneUser";
import EC from "./images/EC.png";
import Mail from "./images/mail.png";
import Call from "./images/call.png";
import SMS from "./images/sms.png";
import { useQuery } from "react-query";
import { axios, getRegisteredPhone, getToken } from "./utils/api";
import { Phonenumber } from "./utils/types";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const PhoneCard = ({
  data,
  index,
  selected,
  onClick,
}: {
  data: Phonenumber;
  index: number;
  selected?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Card.Body
      onClick={onClick}
      style={{
        borderRadius: "0.5em",
        padding: "1em 2em",
        cursor: "pointer",
        border: selected ? "2px solid black" : "2px solid white",
      }}
      background={index % 2 === 0 ? "gradient" : "orange"}
    >
      <h3>{data.name}</h3>
      <p>{data.number}</p>
    </Card.Body>
  );
};

export default function User() {
  const [selectedNumber, setSelectedNumber] = useState<Phonenumber["_id"][]>(
    []
  );
  const ref = useRef<HTMLDivElement>(null);
  const availRef = useRef<HTMLDivElement>(null);
  const allocateRef = useRef<HTMLDivElement>(null);
  const afterCallRef = useRef<HTMLDivElement>(null);
  const smsRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const { id }: { id: string } = useParams();
  const query = useQuery(
    "registeredPhone",
    () => {
      if (id !== "new") return getRegisteredPhone();
    },
    {
      staleTime: 5 * 60 * 60 * 1000,
    }
  );
  const userQuery = useQuery(
    ["user", id],
    () => {
      if (id !== "new")
        return axios
          .post(
            "/api/admin/user",
            { userId: id },
            {
              headers: {
                Authorization: "Bearer " + getToken(),
              },
            }
          )
          .then(
            (data) =>
              data.data as {
                id: string;
                firstName: string;
                lastName: string;
                email: string;
              }
          );
    },
    {
      staleTime: 5 * 60 * 60 * 1000,
    }
  );
  useEffect(() => {
    if (query.data && userQuery.data) {
      setSelectedNumber(
        query.data
          .filter((phn) =>
            phn.assignedTo.includes(
              userQuery?.data?.id ?? "NO_THIS_IS_NOT_ICLUDED"
            )
          )
          .map((phn) => phn._id)
      );
    }
  }, [query.data, userQuery.data]);

  useEffect(() => {
    const isEqual = (
      arr1: string[] | undefined,
      arr2: string[] | undefined
    ) => {
      if (!arr1 || !arr2) {
        return false;
      }
      if (arr1.length !== arr2.length) {
        return false;
      }
      if (!arr1.every((val) => arr2.includes(val))) {
        return false;
      }
      if (!arr2.every((val) => arr1.includes(val))) {
        return false;
      }
      return true;
    };
    const queryPhnIds = query.data
      ?.filter((phn) => phn.assignedTo.includes(userQuery.data?.id ?? ""))
      .map((phn) => phn._id);
    if (userQuery.data && query.data && !isEqual(queryPhnIds, selectedNumber))
      axios.post(
        "/api/phonenumber/assign",
        {
          userId: userQuery.data?.id,
          phoneNumberIds: selectedNumber,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      );
  }, [query.data, selectedNumber, userQuery.data]);
  // Dont know Dont care.
  if (id === "new") {
    return null;
  }
  return (
    <div>
      <div
        style={{
          top: 0,
          left: "1em",
          right: "1em",
          backgroundColor: "#2C3243",
          position: "sticky",
          display: "flex",
          padding: "0.5em 2em",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() =>
            userRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          User
        </div>
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() => ref.current?.scrollIntoView({ behavior: "smooth" })}
        >
          Forward to Device
        </div>
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() =>
            availRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Availability
        </div>
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() =>
            allocateRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Allocate Number
        </div>
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() =>
            afterCallRef.current?.scrollIntoView({ behavior: "smooth" })
          }
        >
          After Call
        </div>
        <div
          style={{ padding: "1em", color: "white", cursor: "pointer" }}
          onClick={() => smsRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          SMS
        </div>
      </div>
      <section style={{ minHeight: "80vh", paddingTop: "10vh" }} ref={userRef}>
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1em",
            padding: "1.5em",
            margin: "2em",
          }}
        >
          <h4>User Name and PhoneNumber</h4>
          <div style={{ display: "flex", margin: "1em", gap: "1.5em" }}>
            <Card.Body
              style={{ padding: "1em", flex: 1, borderRadius: "0.5em" }}
              background="dark"
            >
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
              >
                <img
                  src={EC}
                  alt=""
                  style={{ objectFit: "contain", borderRadius: "100%" }}
                />
                <div>
                  <h5 style={{ color: "white" }}>{`${
                    userQuery.data?.firstName
                  } ${userQuery.data?.lastName ?? ""}`}</h5>
                  <p style={{ color: "white", marginTop: "1em" }}>
                    Employee full name
                  </p>
                </div>
              </div>
            </Card.Body>
            <Card.Body
              style={{ padding: "1em", flex: 1, borderRadius: "0.5em" }}
              background="orange"
            >
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
              >
                <img
                  src={Mail}
                  alt=""
                  style={{
                    objectFit: "contain",
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                  }}
                />
                <div>
                  <h5 style={{ color: "white" }}>{userQuery.data?.email}</h5>
                  <p style={{ color: "white", marginTop: "1em" }}>Email ID</p>
                </div>
              </div>
            </Card.Body>
            <Card.Body
              style={{
                padding: "1em",
                flex: 1,
                borderRadius: "0.5em",
              }}
              background="gradient"
            >
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
              >
                <img
                  src={Call}
                  alt=""
                  style={{
                    objectFit: "contain",
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                  }}
                />
                <div>
                  <h5 style={{ color: "white" }}>150</h5>
                  <p style={{ color: "white", marginTop: "1em" }}>
                    User Extension
                  </p>
                </div>
              </div>
            </Card.Body>
          </div>
        </div>
      </section>
      <section ref={ref} style={{ minHeight: "80vh", paddingTop: "10vh" }}>
        <FrwdToDevice />
      </section>
      <section style={{ minHeight: "80vh", paddingTop: "10vh" }} ref={availRef}>
        <TimeZoneUser />
      </section>
      <section
        style={{ minHeight: "80vh", paddingTop: "10vh" }}
        ref={allocateRef}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "1em",
            padding: "1.5em",
            margin: "2em",
          }}
        >
          <h4>Allocate Number</h4>
          <div style={{ display: "flex", gap: "1em", marginTop: "1em" }}>
            {query.data?.map((phone, index) => {
              return (
                <PhoneCard
                  data={phone}
                  index={index}
                  selected={selectedNumber.includes(phone._id)}
                  onClick={() => {
                    if (selectedNumber.includes(phone._id)) {
                      setSelectedNumber(
                        selectedNumber.filter((n) => n !== phone._id)
                      );
                    } else {
                      setSelectedNumber([...selectedNumber, phone._id]);
                    }
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>
      <section
        style={{ minHeight: "80vh", paddingTop: "10vh" }}
        ref={afterCallRef}
      >
        <AfterCallUser />
      </section>
      <section style={{ minHeight: "80vh", paddingTop: "10vh" }} ref={smsRef}>
        <div style={{ margin: "2em" }}>
          <img
            src={SMS}
            alt=""
            style={{ objectFit: "contain", maxWidth: "100%" }}
          />
        </div>
      </section>
    </div>
  );
}

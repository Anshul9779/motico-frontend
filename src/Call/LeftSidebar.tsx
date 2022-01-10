import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { useAuth } from "../utils/hooks";

export default function LeftSidebar() {
  const { firstName, email } = useAuth();

  return (
    <div
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <MdAccountCircle
        style={{ fontSize: "6rem", color: "#4F5F68", cursor: "pointer" }}
      />
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          marginTop: "0.25em",
        }}
      >
        {firstName}
      </div>
      <div
        style={{
          color: "gray",
          padding: "0.5em",
          width: "12vw",
          marginLeft: "auto",
          marginRight: "auto",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {email}
      </div>
    </div>
  );
}

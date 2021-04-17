import React from "react";
import { useNotifications } from "../../utils/hooks";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { MdAccountCircle } from "react-icons/md";

export default function Header() {
  const { notifications } = useNotifications();
  return (
    <div
      style={{
        backgroundColor: "white",
        textAlign: "right",
        padding: "1.5rem",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
      }}
    >
      <span
        style={{ fontSize: "2rem", marginRight: "1.5rem", cursor: "pointer" }}
      >
        {notifications.length > 0 ? (
          <VscBellDot style={{ color: "#7EA0B1" }} />
        ) : (
          <VscBell style={{ color: "#7EA0B1" }} />
        )}
      </span>
      <MdAccountCircle
        style={{ fontSize: "3rem", color: "#4F5F68", cursor: "pointer" }}
      />
    </div>
  );
}

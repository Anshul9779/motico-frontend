import React from "react";
import { useNotifications } from "../../utils/hooks";
import { VscBell, VscBellDot } from "react-icons/vsc";
import { MdAccountCircle } from "react-icons/md";
import Button from "../Button";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Menu, MenuItem } from "@szhsin/react-menu";

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
      <a
        href="/call"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <Button
          style={{
            padding: "0.8em 1.1em",
            fontSize: "1em",
            marginRight: "1.5em",
          }}
        >
          Open Dialer
        </Button>
      </a>
      <span
        style={{ fontSize: "2rem", marginRight: "1.5rem", cursor: "pointer" }}
      >
        {notifications.length > 0 ? (
          <VscBellDot style={{ color: "#7EA0B1" }} />
        ) : (
          <VscBell style={{ color: "#7EA0B1" }} />
        )}
      </span>
      <Menu
        menuButton={
          <div>
            <MdAccountCircle
              style={{ fontSize: "3rem", color: "#4F5F68", cursor: "pointer" }}
            />
          </div>
        }
        transition
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>
          <div style={{ textDecoration: "none" }}>
            <a href="/logout" style={{ textDecoration: "none" }}>
              Logout
            </a>
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}

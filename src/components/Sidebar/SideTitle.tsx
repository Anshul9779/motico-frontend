import React from "react";
import { IconType } from "react-icons";
import { Link } from "react-router-dom";

export interface SideTitleProps {
  Icon: IconType;
  title: string;
  link: string;
}

export default function SideTitle({ Icon, title, link }: SideTitleProps) {
  return (
    <Link to={link} style={{ textDecoration: "none" }}>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginTop: "2rem",
          marginBottom: "2rem",
          color: "white",
          alignItems: "center",
          cursor: "pointer",
          fontSize: "1.1rem",
        }}
      >
        <Icon style={{ color: "#7EA0B1" }} />{" "}
        <span style={{ textTransform: "capitalize", color: "#B4B9C0" }}>
          {title}
        </span>
      </div>
    </Link>
  );
}

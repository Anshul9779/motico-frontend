import React from "react";
import { MdAccountCircle } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { useAuth } from "../utils/hooks";

const SideBarButton = ({
  name,
  onClick,
}: {
  name: string;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        border: "none",
        outline: "none",
        padding: "0.75em 1.75em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.3em",
        cursor: "pointer",
        alignSelf: "stretch",
        boxShadow: "0px 0px 3px 2px rgba(0,0,0,0.39)",
        margin: "0.5em auto",
      }}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default function LeftSidebar() {
  const { firstName, email } = useAuth();
  const history = useHistory();

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
      <div
        style={{
          marginTop: "2em",
        }}
      >
        <SideBarButton name="Dialer" onClick={() => history.push("/call")} />
        <SideBarButton
          name="Call Recordings"
          onClick={() => history.push("/call/record")}
        />
        <SideBarButton
          name="Voicemails"
          onClick={() => history.push("/call/voicemail")}
        />
      </div>
    </div>
  );
}

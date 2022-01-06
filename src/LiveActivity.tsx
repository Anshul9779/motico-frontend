import React, { useEffect, useState } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Avatar, { AvatarProps } from "./components/Avatar";
import StatsCard from "./components/Card/StatsCard";
import LiveCalls from "./components/LiveCalls";
import { SOCKET, useSocket } from "./context/SocketContext";
import { getOnlineUsers } from "./utils/api";

interface AvatarWithNameProps extends AvatarProps {
  name: string;
}

const AvatarWithName = ({ name, ...rest }: AvatarWithNameProps) => {
  return (
    <div
      style={{
        marginRight: "2rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Avatar {...rest} />
      <div>{name}</div>
    </div>
  );
};

export interface SocketCallRecord {
  from: string;
  to: string;
  id: string;
  agent: string;
  startTime: number;
  status: "INCOMING" | "OUTGOING" | "MISSED";
}

export default function LiveActivity() {
  const socket = useSocket();
  const [onlineUsers, setOnlineUsers] = useState<
    {
      id: string;
      name: string;
      avatarURL?: string;
    }[]
  >([]);
  const [userCall, setUserCall] = useState<SocketCallRecord[]>([]);

  useEffect(() => {
    getOnlineUsers().then((data) => {
      setOnlineUsers(data);
    });

    const addOnlineUsers = (newUser: {
      id: string;
      name: string;
      avatarURL?: string;
    }) => {
      setOnlineUsers((prev) => {
        if (!prev.find((prevUser) => prevUser.id === newUser.id))
          return [...prev, newUser];
        return prev;
      });
    };

    socket.on(
      SOCKET.USER_ONLINE,
      (data: { id: string; name: string; avatarURL?: string }) => {
        console.log("User Online", data);
        addOnlineUsers(data);
      }
    );
    socket.on(SOCKET.USER_LOGOUT, (data: { id: string }) => {
      console.log("User Offline", data);
      setOnlineUsers((prevOnline) =>
        prevOnline.filter((user) => user.id !== data.id)
      );
    });
    socket.on(SOCKET.CALL_ADD, (data: SocketCallRecord) => {
      console.log("Call Started", data);
      setUserCall((prev) => [...prev, data]);
    });
    socket.on(SOCKET.CALL_END, (data: { id: string }) => {
      console.log("Call Ended", data);
      setUserCall((prev) => prev.filter((p) => p.id !== data.id));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
          Live Activity
        </div>
      </div>
      <div
        style={{
          background: "white",
          margin: "1.5em 1.5em",
          padding: "0.75em",
        }}
      >
        <div
          style={{
            color: "#4f5f68",
            marginLeft: "1.5em",
            marginBottom: "1.5em",
          }}
        >
          Available Person on Call
        </div>
        <ScrollMenu
          data={onlineUsers.map(({ name, id, avatarURL }) => {
            return (
              <AvatarWithName
                name={name}
                size={50}
                key={id}
                url={avatarURL}
                dotColor="#05B714"
              />
            );
          })}
          wrapperStyle={{ width: "100%" }}
          arrowLeft={<MdKeyboardArrowLeft size={32} />}
          arrowRight={<MdKeyboardArrowRight size={32} />}
        />
      </div>
      <div style={{ display: "flex", gap: "1.5em", margin: "2em" }}>
        <StatsCard
          title="Available Agent"
          body={onlineUsers.length}
          style={{ flex: 1 }}
        />
        <StatsCard
          title="Calls In Queue"
          body={0}
          style={{ flex: 1 }}
          bodyTheme="gradient"
        />
        <StatsCard
          title="Live Calls"
          body={userCall.length}
          style={{ flex: 1 }}
          bodyTheme="orange"
        />
      </div>
      <div
        style={{
          marginTop: "1.5em",
          backgroundColor: "#71386f",
          color: "white",
          width: "fit-content",
          padding: "0.5em 1.5em",
          marginLeft: "2em",
          borderRadius: "8px 8px 0 0",
        }}
      >
        Live Calls
      </div>
      <div
        style={{
          margin: "0 2em",
          backgroundColor: "#71386f",
          borderRadius: "0 8px 8px 8px ",
        }}
      >
        <LiveCalls liveCalls={userCall} />
      </div>
    </div>
  );
}

import React from "react";

export default function UserCard({
  name,
  email,
  selected,
  onClick,
}: {
  name: string;
  email: string;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: selected ? "#C2497B" : "white",
        padding: "0 1.5em",
        textAlign: "center",
        borderRadius: "1em",
        border: "5px solid white",
      }}
    >
      <h3>{name}</h3>
      <h3>{email}</h3>
    </div>
  );
}

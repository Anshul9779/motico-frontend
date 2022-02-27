import React from "react";
import { Team } from "../utils/types";

export default function UserCard({
  name,
  email,
  selected,
  onClick,
  team,
}: {
  name: string;
  email: string;
  team: Team | null;
  selected?: boolean;
  onClick?: () => void;
}) {
  const hasTeam = Boolean(team);

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: selected ? "#C2497B" : "white",
        padding: "0 1.5em",
        textAlign: "center",
        borderRadius: "1em",
        border: "5px solid white",
        cursor: hasTeam ? "not-allowed" : "pointer",
        opacity: hasTeam ? 0.6 : 1,
      }}
    >
      <h3>{name}</h3>
      <p>{hasTeam ? "Already in a team" : email} </p>
    </div>
  );
}

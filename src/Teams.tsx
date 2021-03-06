import React from "react";
import Delete from "./images/delete.png";
import Setting from "./images/settings.png";
import NewTeam from "./images/NewTeam.png";
import { useHistory } from "react-router-dom";
import { useDeleteTeams, useTeams } from "./utils/hooks/useTeams";
import { Spinner } from "react-activity";

const TeamCard = ({
  name,
  count,
  email,
  onDelete,
}: {
  name: string;
  count: number;
  email?: string;
  onDelete: () => void;
}) => {
  return (
    <div
      style={{
        width: "25%",
        maxWidth: "22%",
        flex: 1,
        padding: "0.5em",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 8,
        background: "linear-gradient(90deg,#813866 0%,#ff9d82 100%)",
      }}
    >
      <h3>{name}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div
          style={{
            padding: "0.3em 0.7em",
            fontSize: 24,
            color: "white",
            backgroundColor: "#C1497B",
            borderRadius: 30,
            border: "2px solid white",
          }}
        >
          {count}
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "0 0.6em",
            fontWeight: "bold",
          }}
        >
          {email ?? "support@gmail.com"}
        </div>
      </div>
      <div
        style={{ display: "flex", flexDirection: "row-reverse", width: "100%" }}
      >
        <div
          style={{
            padding: "0.5em 0",
            marginLeft: "auto",
            marginRight: "0.5em",
          }}
        >
          <img
            src={Setting}
            alt="Setting"
            style={{
              objectFit: "contain",
              maxHeight: 25,
              borderRadius: "50%",
              marginRight: "0.3em",
            }}
          />
          <img
            src={Delete}
            alt="Delete"
            onClick={() => {
              const doDelete = window.confirm(
                `Do you want to delete ${name} team?`
              );
              if (doDelete && onDelete) {
                onDelete();
              }
            }}
            style={{
              objectFit: "contain",
              maxHeight: 25,
              borderRadius: "50%",
              cursor: "pointer",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default function Teams() {
  const history = useHistory();
  const { isLoading, data: teams } = useTeams();
  const { mutate } = useDeleteTeams();

  if (isLoading || !teams) {
    return <Spinner />;
  }

  return (
    <div style={{ padding: "2em 1em" }}>
      <div
        style={{ backgroundColor: "white", borderRadius: 10, padding: "2em" }}
      >
        <div>TEAMS</div>
        <div style={{ marginTop: "1em" }}>
          <div style={{ display: "flex", gap: "1em", flexWrap: "wrap" }}>
            {teams.map((team) => {
              return (
                <TeamCard
                  count={team.users.length}
                  name={team.name}
                  onDelete={() => {
                    mutate(team.id);
                  }}
                  key={team.id}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div
        style={{ width: "100%", textAlign: "right" }}
        onClick={() => {
          history.push("/teams/new");
        }}
      >
        <img
          src={NewTeam}
          alt="New Team"
          style={{ maxHeight: 50, marginRight: 50 }}
        />
      </div>
    </div>
  );
}

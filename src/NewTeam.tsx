import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import { Card } from "./components/Card/Card";
import Input from "./components/Input";
import UserCard from "./components/UserCard";
import { axios, getToken } from "./utils/api";
import { BasicUser } from "./utils/types";

export default function NewTeam() {
  const history = useHistory();
  const query = useQuery("users", () => {
    return axios
      .post(
        "/api/admin/user/get-company",
        {},
        {
          headers: { authorization: "Bearer " + getToken() },
        }
      )
      .then((data) => data.data as BasicUser[]);
  });
  const [selectedUserIds, setSelectedUserIds] = useState<BasicUser["id"][]>([]);
  return (
    <div style={{ padding: "2em 1em" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            name: { value: string };
            cascading: { value: string };
          };
          axios
            .post(
              "/api/teams/new",
              {
                name: target.name.value,
                cascading: target.cascading.value,
                userIds: selectedUserIds,
              },
              {
                headers: { authorization: "Bearer " + getToken() },
              }
            )
            .then(() => history.push("/teams"));
        }}
      >
        <Card>
          <Card.Body
            background="light"
            style={{ padding: "2em", borderRadius: 8 }}
          >
            <div style={{ color: "white" }}>New Team</div>
            <div style={{ marginTop: "2em", color: "white" }}>
              Team Name : <Input name="name" required />
            </div>
            <div style={{ marginTop: "2em", color: "white" }}>
              Cascading Order
            </div>
            <div
              style={{
                marginTop: "1em",
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <div>
                <label htmlFor="Simultaneously" style={{ color: "white" }}>
                  Simultaneously
                </label>
                <input
                  type="radio"
                  id="Simultaneously"
                  value="Simultaneously"
                  name="cascading"
                  required
                />
              </div>
              <div>
                <label htmlFor="FindOrder" style={{ color: "white" }}>
                  Find Order
                </label>
                <input
                  type="radio"
                  id="FindOrder"
                  value="FindOrder"
                  name="cascading"
                  required
                />
              </div>
              <div>
                <label htmlFor="RoundRobin" style={{ color: "white" }}>
                  Round Robin
                </label>
                <input
                  type="radio"
                  id="RoundRobin"
                  value="RoundRobin"
                  name="cascading"
                  required
                />
              </div>
            </div>
            <div style={{ marginTop: "2em", color: "white" }}>
              Allocate Members
            </div>
            <div
              style={{
                marginTop: "2em",
                display: "flex",
                flexWrap: "wrap",
                gap: "1em",
              }}
            >
              {query.data?.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    name={`${user.firstName} ${user.lastName ?? ""}`}
                    email={user.email}
                    selected={selectedUserIds.includes(user.id)}
                    onClick={() => {
                      if (selectedUserIds.includes(user.id)) {
                        setSelectedUserIds(
                          selectedUserIds.filter((u) => u !== user.id)
                        );
                      } else {
                        setSelectedUserIds([...selectedUserIds, user.id]);
                      }
                    }}
                  />
                );
              })}
            </div>
          </Card.Body>
        </Card>
        <div
          style={{
            display: "flex",
            gap: "1em",
            marginTop: "1em",
            justifyContent: "flex-end",
          }}
        >
          <Button type="reset">Cancel</Button>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import { Card } from "./components/Card/Card";
import Input from "./components/Input";
import UserCard from "./components/UserCard";
import { axios, getToken } from "./utils/api";
import { useCompanyUsers } from "./utils/hooks/useCompanyUsers";
import { usePhoneNumbers } from "./utils/hooks/usePhoneNumbers";
import { BasicUser } from "./utils/types";

export default function NewTeam() {
  const history = useHistory();
  const { data: users } = useCompanyUsers();
  const [selectedUserIds, setSelectedUserIds] = useState<BasicUser["id"][]>([]);
  const { data: numbers } = usePhoneNumbers();
  const client = useQueryClient();

  const validNumbers =
    numbers?.filter(
      (number) => number.userIds.length === 0 && number.teamId === null
    ) ?? [];

  return (
    <div style={{ padding: "2em 1em" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            name: { value: string };
            cascading: { value: string };
            phoneNumber: { value: string };
          };

          const phonenumber =
            target.phoneNumber.value === "None"
              ? undefined
              : parseInt(target.phoneNumber.value, 10);

          axios
            .post(
              "/api/teams",
              {
                name: target.name.value,
                callType: target.cascading.value,
                userIds: selectedUserIds,
                phonenumber,
              },
              {
                headers: { authorization: "Bearer " + getToken() },
              }
            )
            .then(() => {
              client.invalidateQueries("phonenumbers");
              client.invalidateQueries("teams");
              history.push("/teams");
            });
        }}
      >
        <Card>
          <Card.Body
            background="light"
            style={{ padding: "2em", borderRadius: 8 }}
          >
            <h3 style={{ color: "white" }}>New Team</h3>
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
                  value="SIMULTANEOUSLY"
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
                  value="FIRST_ORDER"
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
                  value="ROUND_ROBIN"
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
              {users?.map((user) => {
                return (
                  <UserCard
                    key={user.id}
                    name={`${user.firstName} ${user.lastName ?? ""}`}
                    email={user.email}
                    selected={selectedUserIds.includes(user.id)}
                    team={user.team}
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
            <div
              style={{
                display: "flex",
                gap: "1em",
                alignItems: "center",
                marginTop: "2em",
              }}
            >
              <div style={{ color: "white" }}>Assign Phone number</div>
              <div>
                <select
                  name="phoneNumber"
                  id=""
                  style={{
                    padding: "0.5em",
                    outline: "none",
                    borderRadius: "0.25em",
                  }}
                >
                  <option value="None">None</option>
                  {validNumbers?.map((number) => {
                    return (
                      <option
                        value={number.id}
                      >{`${number.name} (${number.number})`}</option>
                    );
                  })}
                </select>
              </div>
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

import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import { Card } from "./components/Card/Card";
import Input from "./components/Input";
import { PhoneCard } from "./User";
import { axios, getToken } from "./utils/api";
import { usePhoneNumbers } from "./utils/hooks/usePhoneNumbers";
import { useTeams } from "./utils/hooks/useTeams";
import { Phonenumber } from "./utils/types";

export default function NewUser() {
  const [selectedNumber, setSelectedNumber] = useState<Phonenumber["id"][]>([]);
  const history = useHistory();
  const { data: numbers, isLoading: numberLoading } = usePhoneNumbers();
  const teamsQuery = useTeams();
  const client = useQueryClient();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
          firstName: { value: string };
          lastName: { value: string };
          email: { value: string };
          team: { value: string };
        };
        axios
          .post(
            "/api/admin/user/invite",
            {
              firstName: target.firstName.value,
              lastName: target.lastName.value,
              email: target.email.value,
              phoneNumbers: selectedNumber,
              team: parseInt(target.team.value, 10),
            },
            {
              headers: { authorization: "Bearer " + getToken() },
            }
          )
          .then((data) => {
            client.invalidateQueries("users");
            client.invalidateQueries("phonenumbers");
            history.push("/users");
          });
      }}
    >
      <Card.Body
        style={{
          padding: "1.5em",
          margin: "2em",
          borderRadius: "0.5em",
          color: "white",
        }}
        background="gradient"
      >
        <h4>New User</h4>
        <div style={{ margin: "1em" }}>
          <label htmlFor="" style={{ marginRight: "0.5em" }}>
            Name
          </label>
          <Input placeholder="First Name" name="firstName" required />
          <Input placeholder="Last Name" name="lastName" />
          <div style={{ marginTop: "1em" }}>
            <label htmlFor="" style={{ marginRight: "0.5em" }}>
              Email
            </label>
            <Input placeholder="Email" name="email" required />
          </div>

          <div style={{ marginTop: "1em" }}>
            <label htmlFor="">Allocate Department</label>
            {teamsQuery.isLoading ? (
              <span style={{ marginLeft: "1em", opacity: 0.5 }}>
                Loading ...
              </span>
            ) : (
              <select
                name="team"
                id=""
                required
                style={{
                  marginLeft: "1.5em",
                  padding: "0.5em 1em",
                  border: "none",
                  outline: "none",
                  borderRadius: "1em",
                  backgroundColor: "#EEE",
                }}
              >
                {teamsQuery.data?.map((te) => {
                  return <option value={te.id}>{te.name}</option>;
                })}
              </select>
            )}
          </div>
          <div style={{ marginTop: "1em" }}>
            <div>Allocate Numbers</div>
            <div style={{ margin: "1.5em", display: "flex", gap: "1em" }}>
              {numberLoading ? (
                <span style={{ marginLeft: "1em", opacity: 0.5 }}>
                  Loading ...
                </span>
              ) : (
                numbers?.map((phone, index) => {
                  return (
                    <PhoneCard
                      data={phone}
                      index={index}
                      key={phone.id}
                      hasTeam={Boolean(phone.teamId)}
                      selected={selectedNumber.includes(phone.id)}
                      onClick={() => {
                        if (selectedNumber.includes(phone.id)) {
                          setSelectedNumber(
                            selectedNumber.filter((n) => n !== phone.id)
                          );
                        } else {
                          setSelectedNumber([...selectedNumber, phone.id]);
                        }
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
          <p style={{ fontStyle: "italic" }}>
            Default password is set to <code>password123@</code>. User will be
            prompted to reset password on first login
          </p>
        </div>
      </Card.Body>
      <div style={{ marginTop: "0.5em", marginRight: "2em", display: "flex" }}>
        <div style={{ flex: 1 }}></div>
        <Button
          type="reset"
          style={{ marginLeft: "auto", marginRight: "0.5em" }}
        >
          Reset
        </Button>
        <Button type="submit" style={{ marginLeft: "auto" }}>
          Submit
        </Button>
      </div>
    </form>
  );
}

import React, { useState } from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router-dom";
import Button from "./components/Button";
import { Card } from "./components/Card/Card";
import Input from "./components/Input";
import { PhoneCard } from "./User";
import { axios, getRegisteredPhone, getToken } from "./utils/api";
import { Phonenumber, Team } from "./utils/types";

export default function NewUser() {
  const [selectedNumber, setSelectedNumber] = useState<Phonenumber["_id"][]>(
    []
  );
  const history = useHistory();
  const query = useQuery("registeredPhone", () => {
    return getRegisteredPhone();
  });
  const teamsQuery = useQuery("teams", async () => {
    const data = await axios.post(
      "/api/teams",
      {},
      {
        headers: { authorization: "Bearer " + getToken() },
      }
    );
    return data.data as Team[];
  });
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
              phoneNumberId: selectedNumber,
            },
            {
              headers: { authorization: "Bearer " + getToken() },
            }
          )
          .then((data) => {
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
          </div>
          <div style={{ marginTop: "1em" }}>
            <div>Allocate Numbers</div>
            <div style={{ margin: "1.5em", display: "flex", gap: "1em" }}>
              {query.data?.map((phone, index) => {
                return (
                  <PhoneCard
                    data={phone}
                    index={index}
                    key={phone._id}
                    selected={selectedNumber.includes(phone._id)}
                    onClick={() => {
                      if (selectedNumber.includes(phone._id)) {
                        setSelectedNumber(
                          selectedNumber.filter((n) => n !== phone._id)
                        );
                      } else {
                        setSelectedNumber([...selectedNumber, phone._id]);
                      }
                    }}
                  />
                );
              })}
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

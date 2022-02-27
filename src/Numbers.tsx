import React from "react";
import { Spinner } from "react-activity";
import { useHistory } from "react-router";
import Button from "./components/Button";
import Input from "./components/Input";
import { usePhoneNumbers } from "./utils/hooks/usePhoneNumbers";

export default function Numbers() {
  const { data: numbers, isLoading } = usePhoneNumbers();
  const history = useHistory();

  if (!numbers || isLoading) {
    return <Spinner />;
  }

  return (
    <div style={{ padding: "1.5em" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 8,
          padding: "2em",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ fontWeight: "bold", fontSize: "1.2em", flex: 1.5 }}>
            Number
          </div>
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Input placeholder="Search For" />
            <Button onClick={() => history.push("/numbers/search")}>
              Buy Number
            </Button>
          </div>
        </div>
        <div style={{ marginTop: "2em" }}>
          <table style={{ width: "100%" }}>
            <tr>
              <th
                style={{
                  color: "white",
                  padding: "0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #6f374c 0%, #c94b7c 100%)",
                }}
              >
                Name
              </th>
              <th
                style={{
                  color: "white",
                  padding: "0.5em 0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #813866 0%, #ff9d82 100%)",
                }}
              >
                Phone Number
              </th>
              <th
                style={{
                  color: "white",
                  padding: "0.5em 0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #6f374c 0%, #c94b7c 100%)",
                }}
              >
                Recording
              </th>
              <th
                style={{
                  color: "white",
                  padding: "0.5em 0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #813866 0%, #ff9d82 100%)",
                }}
              >
                Voicemail
              </th>
              <th
                style={{
                  color: "white",
                  padding: "0.5em 0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #6f374c 0%, #c94b7c 100%)",
                }}
              >
                Availability
              </th>
              <th
                style={{
                  color: "white",
                  padding: "0.5em 0.3em",
                  borderRadius: "0.5em",
                  background:
                    "linear-gradient(90deg, #813866 0%, #ff9d82 100%)",
                }}
              >
                Alloted
              </th>
            </tr>
            <div style={{ marginTop: "1.5em" }}></div>

            {numbers?.map((number, index) => {
              return (
                <tr
                  style={{
                    marginTop: "2em",
                    backgroundColor: "#EFF3F4",
                    borderRadius: 8,
                    cursor: "pointer",
                  }}
                  key={number.id}
                  onClick={() => {
                    history.push(`/numbers/settings/${number.id}`);
                  }}
                >
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.name}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.number}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.settings.allowRecord ? "Enabled" : "Disabled"}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.settings.voicemailStatus !== "DISABLED"
                      ? "Enabled"
                      : "Disabled"}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.available ? "Available" : "Not Available"}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.teamId ? "Team" : number.users.length}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

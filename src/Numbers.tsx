import React from "react";
import { useQuery } from "react-query";
import { useHistory } from "react-router";
import Button from "./components/Button";
import Input from "./components/Input";
import { getRegisteredPhone } from "./utils/api";

export default function Numbers() {
  const { data: numbers } = useQuery("registeredPhone", () => {
    return getRegisteredPhone();
  });
  const history = useHistory();

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
                  }}
                  key={number._id}
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
                    {number.isRecording ? "Enabled" : "Disabled"}
                  </td>
                  <td
                    style={{
                      borderRadius: 0,
                      textAlign: "center",
                      padding: "0.5em",
                      backgroundColor: index % 2 !== 0 ? "white" : undefined,
                    }}
                  >
                    {number.voiceMail ? "Enabled" : "Disabled"}
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
                    {number.assignedTo.length}
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

import React from "react";
import { useHistory } from "react-router-dom";
import Setting from "./images/settings.png";
import Delete from "./images/delete.png";
import NewTeam from "./images/NewUser.png";
import DataTable from "react-data-table-component";
import { useCompanyUsers, useDeleteUser } from "./utils/hooks/useCompanyUsers";
import { Spinner } from "react-activity";

export default function Users() {
  const history = useHistory();

  const { isLoading, data: users } = useCompanyUsers();
  const { mutate } = useDeleteUser();

  if (isLoading || !users) {
    return <Spinner />;
  }

  return (
    <div style={{ padding: "2em 1em" }}>
      <div
        style={{ backgroundColor: "white", borderRadius: 10, padding: "2em" }}
      >
        <div>USERS</div>
        <div style={{ marginTop: "1em" }}>
          <DataTable
            customStyles={{
              headRow: {
                style: {
                  background:
                    "linear-gradient(90deg, #813866 0%, #ff9d82 100%)",
                  borderRadius: 8,
                  padding: "0 8px",
                },
              },
              headCells: {
                style: {
                  color: "white",
                },
              },
              rows: {
                style: {
                  background: "rgb(239, 243, 244)",
                  borderRadius: 8,
                  margin: "8px 0",
                  padding: "0 8px",
                  cursor: "pointer",
                },
              },
            }}
            columns={[
              {
                name: "Name",
                selector: "name",
              },
              {
                name: "Email",
                selector: "email",
              },
              {
                name: "Forward To Device",
                selector: "frwd",
              },
              {
                name: "Availability",
                selector: "available",
              },
              {
                name: "Numbers",
                selector: "phoneNumbers",
              },
              {
                name: "Status",
                selector: "status",
              },
              {
                name: "Actions",
                cell: (row) => {
                  return (
                    <div style={{ padding: "0.5em 0" }}>
                      <img
                        src={Setting}
                        alt="Setting"
                        onClick={() => history.push(`users/${row.id}`)}
                        style={{
                          objectFit: "contain",
                          maxHeight: 25,
                          borderRadius: "50%",
                        }}
                      />
                      <img
                        src={Delete}
                        alt="Delete"
                        onClick={() => {
                          const doDelete = window.confirm(
                            `Do you want to delete ${row.name} user?`
                          );
                          if (doDelete) {
                            mutate(row.id);
                          }
                        }}
                        style={{
                          objectFit: "contain",
                          maxHeight: 25,
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                  );
                },
              },
            ]}
            onRowClicked={(row) => {
              history.push(`users/${row.id}`);
            }}
            data={
              users.map((user) => {
                return {
                  name: user.firstName + (user.lastName ?? ""),
                  email: user.email,
                  frwd: "Enabled",
                  available: "Available",
                  phoneNumbers: user.phoneNumbers.length,
                  status: "Active",
                  id: user.id,
                };
              }) ?? []
            }
          />
        </div>
      </div>
      <div
        style={{ width: "100%", textAlign: "right" }}
        onClick={() => {
          history.push("/users/new");
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

import React from "react";
import { useHistory } from "react-router-dom";
import Setting from "./images/settings.png";
import Delete from "./images/delete.png";
import NewTeam from "./images/NewUser.png";
import { useMutation, useQuery } from "react-query";
import { axios, getToken } from "./utils/api";
import { BasicUser } from "./utils/types";
import DataTable from "react-data-table-component";

export default function Users() {
  const history = useHistory();
  const query = useQuery(
    "users",
    () => {
      return axios
        .post(
          "/api/admin/user/get-company",
          {},
          {
            headers: { authorization: "Bearer " + getToken() },
          }
        )
        .then((data) => data.data as BasicUser[]);
    },
    {
      staleTime: 5 * 60 * 60 * 1000,
    }
  );
  const mutation = useMutation(
    (userId: string) => {
      return axios.post(
        "/api/admin/user/delete",
        {
          userId,
        },
        {
          headers: { authorization: "Bearer " + getToken() },
        }
      );
    },
    {
      onSuccess() {
        query.refetch();
      },
    }
  );
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
                            mutation.mutate(row.id);
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
              query.data?.map((user) => {
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

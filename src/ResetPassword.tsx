import React, { useState } from "react";
import { useHistory } from "react-router";
import { addUser } from "./redux/slices/user";
import { resetPassword } from "./utils/api";
import { useAppDispatch, useAuth } from "./utils/hooks";
import BGImage from "./images/login_bg.png";
import Input from "./components/Input";
import Button from "./components/Button";

export default function ResetPassword() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { id } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        position: "relative",
        backgroundColor: "#5D4174",
      }}
    >
      <img
        src={BGImage}
        alt="BG"
        style={{
          top: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
        }}
      >
        <form
          action=""
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "25%",
            height: "100%",
            justifyContent: "center",
            marginLeft: "10%",
          }}
          onSubmit={(e) => {
            e.preventDefault();
            const target = e.target as typeof e.target & {
              oldPassword: { value: string };
              newPassword: { value: string };
            };
            setLoading(true);
            resetPassword(
              target.oldPassword.value,
              target.newPassword.value,
              id
            )
              .then((loginPayload) => {
                dispatch(addUser(loginPayload));
                if (loginPayload.roles.includes("PASSWORD_RESET")) {
                  history.push("/reset");
                } else {
                  history.push("/");
                }
                setLoading(true);
              })
              .catch((err) => {
                setError(
                  err?.response?.data?.message ?? "Something Went wrong"
                );
                setLoading(false);
              });
          }}
        >
          <div
            style={{
              fontWeight: "bold",
              fontSize: "2em",
              color: "#C86CDB",
              width: "100%",
              textAlign: "center",
              margin: "1em 0",
            }}
          >
            Reset Password
          </div>
          <div
            style={{
              margin: "1em 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Input
              name="oldPassword"
              type="password"
              placeholder="Old Password"
            />
          </div>
          <div
            style={{
              margin: "0 0",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Input
              name="newPassword"
              type="password"
              placeholder="New Password"
            />
          </div>
          {error && (
            <div
              style={{ textAlign: "center", color: "red", marginTop: "0.5em" }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginTop: "2em",
            }}
          >
            <Button
              type="submit"
              disabled={loading}
              style={{
                background: "linear-gradient(90deg, #f26e87 0%, #f79b84 100%)",
                padding: "0.5em 2.5em",
              }}
            >
              {loading ? "Loading..." : "Save"}
            </Button>
          </div>
          {/* <button type="submit">Login</button> */}
        </form>
      </div>
    </div>
  );
}

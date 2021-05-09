import React from "react";
import { useHistory } from "react-router";
import { addUser } from "./redux/slices/user";
import { login } from "./utils/api";
import { useAppDispatch, useAuth } from "./utils/hooks";

export default function Login() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    history.push("/");
  }
  return (
    <div style={{ backgroundColor: "#F2F6F7" }}>
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
          };
          login(target.email.value, target.password.value).then(
            (loginPayload) => {
              dispatch(addUser(loginPayload));
              history.push("/");
            }
          );
        }}
      >
        <input type="text" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

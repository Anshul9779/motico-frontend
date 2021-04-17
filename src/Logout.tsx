import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { removeUser } from "./redux/slices/user";
import { useAppDispatch } from "./utils/hooks";

export default function Logout() {
  const dispatch = useAppDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(removeUser());
    history.push("/");
  }, [dispatch, history]);
  return <div>Logging Out</div>;
}

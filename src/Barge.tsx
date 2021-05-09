import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AdminDialer from "./components/AdminDialer";
import { twillioToken } from "./utils/api";

export default function Barge({
  query,
  onDisconnect,
}: {
  query: string;
  onDisconnect: () => void;
}) {
  const [token, setToken] = useState("");
  const [calling, setCalling] = useState(true);
  const history = useHistory();

  useEffect(() => {
    twillioToken().then(setToken);
  }, []);
  console.log("Called");

  useEffect(() => {
    if (!calling) {
      history.goBack();
    }
  }, [calling, history]);
  if (query) {
    return (
      <div>
        {token && calling ? (
          <AdminDialer
            token={token}
            onDisconnect={() => {
              setCalling(false);
              onDisconnect();
            }}
            callRecordID={query}
          />
        ) : (
          "Loading"
        )}
      </div>
    );
  } else {
    return <div>Invalid Page</div>;
  }
}

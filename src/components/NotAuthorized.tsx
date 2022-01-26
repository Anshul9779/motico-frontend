import React from "react";
import { Card } from "./Card/Card";

function NotAuthorized({ label }: Props) {
  return (
    <Card>
      <Card.Body
        background="gradient"
        style={{
          borderRadius: "0.5em",
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "5em",
          flexDirection: "column",
          margin: "2em",
          marginTop: "4em",
          marginBottom: "4em",
        }}
      >
        {label ?? "You are not authorized to view the contents"}
      </Card.Body>
    </Card>
  );
}

interface Props {
  label?: string;
}

export default NotAuthorized;

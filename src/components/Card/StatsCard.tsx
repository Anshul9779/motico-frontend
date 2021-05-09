import React, { ReactNode } from "react";
import { BodyProps, Card, HeaderProps } from "./Card";

export interface StatsCardProps {
  title: string | ReactNode;
  body: number | string | ReactNode;
  theme?: HeaderProps["background"];
  bodyTheme?: BodyProps["background"];
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  perToday?: boolean;
}

export default function StatsCard({
  title,
  body,
  style,
  theme = "dark",
  bodyTheme = "none",
  bodyStyle = {},
  perToday,
}: StatsCardProps) {
  return (
    <Card style={{ cursor: "pointer", ...style }}>
      <Card.Header background={theme} style={{ padding: "0.75rem" }}>
        {title}
      </Card.Header>
      <Card.Body
        background={bodyTheme}
        style={{
          textAlign: "center",
          paddingTop: "0.5rem",
          minHeight: "5em",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          ...bodyStyle,
        }}
      >
        <div style={{ fontSize: "3rem" }}>{body}</div>
        {perToday && <div>Per Today</div>}
      </Card.Body>
      <Card.Footer background={bodyTheme} style={{ ...bodyStyle }} />
    </Card>
  );
}

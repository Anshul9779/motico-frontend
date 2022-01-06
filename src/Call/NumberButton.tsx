import React from "react";

const NumberButton = ({
  number,
  characters,
  onClick,
}: {
  number: number | string;
  characters?: string;
  onClick?: () => void;
}) => {
  return (
    <button
      style={{
        border: "none",
        outline: "none",
        padding: "0.75em 1.75em",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "0.3em",
        cursor: "pointer",
        alignSelf: "stretch",
      }}
      onClick={onClick}
    >
      <div style={{ fontSize: "3em", fontWeight: "bold" }}>{number}</div>
      <div>{characters?.toUpperCase() ?? " "}</div>
    </button>
  );
};

export default NumberButton;

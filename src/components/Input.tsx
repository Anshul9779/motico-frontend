import React from "react";

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

export default function Input({ ...rest }: InputProps) {
  return (
    <input
      style={{
        backgroundColor: "#EEE",
        border: "none",
        outline: "none",
        padding: "0.5em 1.2em",
        borderRadius: "1.2em",
      }}
      {...rest}
    />
  );
}

import React from "react";
import { Link } from "react-router-dom";

export interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
  children?: React.ReactNode;
  isLink?: boolean;
  href?: string;
  style?: any;
}

export default function Button({
  title,
  children,
  isLink,
  href,
  style,
  ...rest
}: ButtonProps) {
  return (
    <button
      style={{
        padding: "0.5em 1.2em",
        backgroundColor: "#6E376E",
        color: "white",
        borderRadius: 4,
        border: "none",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      {isLink && href ? (
        <Link to={href}>{title ? title : children}</Link>
      ) : title ? (
        title
      ) : (
        children
      )}
    </button>
  );
}

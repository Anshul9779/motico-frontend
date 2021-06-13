import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "react-activity";

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
  loading?: boolean;
}

export default function Button({
  title,
  children,
  isLink,
  href,
  loading,
  disabled,
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
        opacity: disabled ? 0.5 : 1,
        ...style,
      }}
      {...rest}
    >
      {loading ? (
        <Spinner color="white" animating={true} size={10} />
      ) : isLink && href ? (
        <Link to={href}>{title ? title : children}</Link>
      ) : title ? (
        title
      ) : (
        children
      )}
    </button>
  );
}

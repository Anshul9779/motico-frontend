import React, { CSSProperties } from "react";
import { MdAccountCircle } from "react-icons/md";

export interface AvatarProps {
  url?: string;
  size: CSSProperties["fontSize"];
  name?: string;
  color?: CSSProperties["color"];
  /**
   * Use `#05B714` for Online
   */
  dotColor?: CSSProperties["backgroundColor"];
  dotSize?: CSSProperties["height"] | CSSProperties["width"];
}

export default function Avatar({
  url,
  size,
  name,
  color = "#4F5F68",
  dotColor,
  dotSize = 10,
}: AvatarProps) {
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      {url ? (
        <img
          src={url}
          style={{
            borderRadius: "50%",
            objectFit: "contain",
            width: "87%",
            height: "87%",
            border: "1px solid black",
          }}
          alt={name}
        />
      ) : (
        <MdAccountCircle size={size} color={color} />
      )}
      {dotColor && (
        <span
          style={{
            width: dotSize,
            height: dotSize,
            backgroundColor: dotColor,
            borderRadius: "50%",
            position: "absolute",
            bottom: "10%",
            right: "10%",
          }}
        ></span>
      )}
    </div>
  );
}

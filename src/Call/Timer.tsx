import React, { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const minutes = () => {
    const rounded = Math.round(seconds / 60);
    if (rounded < 10) {
      return "0" + rounded;
    }
    return rounded;
  };
  const formattedSeconds = () => {
    const rounded = seconds % 60;
    if (rounded < 10) {
      return "0" + rounded;
    }
    return rounded;
  };
  return (
    <div
      style={{
        color: "white",
        fontSize: "4em",
        fontFamily: "monospace",
      }}
    >{`${minutes()}:${formattedSeconds()}`}</div>
  );
};

export default Timer;

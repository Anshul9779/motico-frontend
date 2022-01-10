import { useEffect, useRef, useState } from "react";
import { Device } from "twilio-client";
import { useTwillioToken } from "./useTwillioToken";

type DialerStatus = "creating" | "error" | "created" | "destroyed";

export const useTwillioDevice = () => {
  const [status, setStatus] = useState<DialerStatus>("creating");
  const { data: token } = useTwillioToken();
  const deviceRef = useRef(new Device());
  const device = deviceRef.current;

  const log = (logStr: any, type: "ERR" | "LOG" = "LOG") =>
    console.log(`${type} [useTwillioDevice] `, logStr);

  const setupDevice = () => {
    if (!token) {
      log("token not valid", "ERR");
      return;
    }

    device.setup(token, {
      fakeLocalDTMF: true,
      enableRingingState: true,
    });

    setStatus("created");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    setupDevice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    return () => device.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { status, device, setupDevice };
};

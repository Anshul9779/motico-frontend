import React, { ReactNode, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { useAuth } from "../utils/hooks";

const SOCKET_URL = "http://localhost:8080/";

const SocketContext = React.createContext<
  Socket<DefaultEventsMap, DefaultEventsMap> | undefined
>(undefined);

export const SOCKET = {
  START_CONNECTION: "START_CONNECTION",
  USER_ONLINE: "USER_ONLINE",
  USER_LOGOUT: "USER_LOGOUT",
  USER_CALL_START: "USER_CALL_START",
  USER_CALL_END: "USER_CALL_END",
  CALL_ADD: "CALL_ADD",
  CALL_END: "CALL_END",
  CALL_ADD_CSID: "CALL_ADD_CSID",
} as const;

export function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<
    Socket<DefaultEventsMap, DefaultEventsMap>
  >(null!);
  const { isAuthenticated, token } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      if (socket) {
        socket.disconnect();
      }
      return;
    }

    const _socket = io(SOCKET_URL);
    _socket.emit(SOCKET.START_CONNECTION, { jwt: token });
    setSocket(_socket);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, token]);

  // IDK Why this error is coming?
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export const useSocket = () => {
  const socket = useContext(SocketContext);
  return socket as Socket<DefaultEventsMap, DefaultEventsMap>;
};

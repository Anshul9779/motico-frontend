import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useQuery as useReactQuery } from "react-query";
import { axios, getToken } from "./api";
import { CallRecord, Phonenumber } from "./types";
import { SOCKET, useSocket } from "../context/SocketContext";
import { useEffect, useState } from "react";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => {
  return useAppSelector((state) => state.user);
};

export const useNotifications = () => {
  return useAppSelector((state) => state.notification);
};

export function useQuery() {
  return new URLSearchParams(useLocation().search);
}

interface User {
  firstName: string;
  lastName: string;
  id: string;
  email: string;
  roles: string[];
  phoneNumbers: Phonenumber[];
}

interface SocketCallRecord {
  id: string;
}

export const useUser = () => {
  const { id } = useAuth();
  return useReactQuery(
    "user",
    () => {
      return axios
        .post(
          "/api/admin/user",
          { userId: id },
          {
            headers: {
              authorization: "Bearer " + getToken(),
            },
          }
        )
        .then((res) => res.data as User);
    },
    {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 60 * 1000,
    }
  );
};

const getCallRecordData = (id: string) => {
  return axios
    .post(
      "/api/call/id",
      {
        id,
      },
      {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      }
    )
    .then((res) => res.data as CallRecord)
    .catch((err) => console.log({ err }));
};

export const useActiveCalls = () => {
  const [callIds, setCallIds] = useState<string[]>([]);
  const [callRecords, setCallRecord] = useState<Record<string, CallRecord>>({});
  const socket = useSocket();
  const history = useHistory();

  if (!socket) {
    history.push("/");
  }

  useEffect(() => {
    if (!socket) {
      return;
    }
    const addCallRecord = (id: string) => {
      getCallRecordData(id).then((data) => {
        if (!data) {
          return;
        }
        setCallRecord((prevCallRecord) => {
          return {
            ...prevCallRecord,
            [id]: data,
          };
        });
      });
    };

    const removeCallRecord = (id: string) => {
      setCallRecord((prevCallRecords) => {
        if (prevCallRecords[id]) {
          const copyCallRecords = { ...prevCallRecords };
          delete copyCallRecords[id];
          return copyCallRecords;
        } else {
          return prevCallRecords;
        }
      });
    };

    const addCallId = (callId: string) => {
      setCallIds((prevCallIds) => {
        if (prevCallIds.includes(callId)) {
          return prevCallIds;
        } else {
          addCallRecord(callId);
          return [...prevCallIds, callId];
        }
      });
    };

    const removeCallId = (callId: string) => {
      setCallIds((prevCallIds) =>
        prevCallIds.filter((prevCallId) => prevCallId !== callId)
      );
      removeCallRecord(callId);
    };
    socket?.on(SOCKET.CALL_ADD, (data: SocketCallRecord) => {
      addCallId(data.id);
    });
    socket?.on(SOCKET.CALL_END, (data: SocketCallRecord) => {
      removeCallId(data.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [callIds, callRecords] as const;
};

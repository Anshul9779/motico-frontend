import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  useMutation,
  useQuery as useReactQuery,
  useQueryClient,
} from "react-query";
import { axios, getToken } from "./api";
import { CallRecord, Phonenumber } from "./types";
import { SOCKET, useSocket } from "../context/SocketContext";
import { useCallback, useEffect, useRef, useState } from "react";

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
  phoneNumber: string;
  reciveUpdates: boolean;
  missedCallAlert: boolean;
  voicemailAlert: boolean;
  dashboard: boolean;
  dialler: boolean;
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

export interface UserMe {
  id: string;
  phoneNumber: string;
  firstName: string;
  lastName?: string;
  email: string;
  company: {
    _id: string;
    name: string;
    email: string;
  };
  reciveUpdates: boolean;
  missedCallAlert: boolean;
  voicemailAlert: boolean;
  dashboard: boolean;
  dialler: boolean;
}

export const useMe = () => {
  return useReactQuery(
    "me",
    () => {
      return axios
        .get("/api/user/me", {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        })
        .then((res) => res.data as UserMe);
    },
    {
      cacheTime: 5 * 60 * 60 * 1000,
      staleTime: 5 * 60 * 60 * 1000,
    }
  );
};

export const useForm = <TValue extends Record<string, unknown>>(
  intialValue: TValue
) => {
  const [state, setState] = useState(intialValue);
  const prevInitialValue = useRef(intialValue);

  const changeState = useCallback((key: keyof TValue, value: unknown) => {
    console.log("fired", { key, value });
    setState((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  useEffect(() => {
    // Shallow check if object has been changed
    // Assuming the keys dont change
    for (const key in intialValue) {
      if (Object.prototype.hasOwnProperty.call(intialValue, key)) {
        const element = intialValue[key];
        const prevElement = prevInitialValue.current[key];
        if (element !== prevElement) {
          console.log("appu setting", { element, prevElement });
          setState(intialValue);
          prevInitialValue.current = intialValue;
          break;
        }
      }
    }
  }, [intialValue]);

  return [state, changeState] as const;
};

export const useSetMe = () => {
  type MutationData = Partial<{
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    reciveUpdates: boolean;
    missedCallAlert: boolean;
    voicemailAlert: boolean;
    dashboard: boolean;
    dialler: boolean;
  }>;
  const client = useQueryClient();
  return useMutation(
    (data: MutationData) => {
      return axios
        .post("/api/user/me", data, {
          headers: {
            authorization: "Bearer " + getToken(),
          },
        })
        .then((res) => res.data as UserMe);
    },
    {
      onSuccess: (data) => {
        client.invalidateQueries("me");
      },
      onError: () => {
        client.invalidateQueries("me");
      },
    }
  );
};

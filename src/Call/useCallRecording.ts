import { useQuery } from "react-query";
import { axios, getToken } from "../utils/api";

export interface CallRecordData {
  id: string;
  from: string;
  to: string;
  duration: number;
  user: {
    id: string;
    name: string;
  };
  startTime: number;
  type: "MISSED" | "INCOMING" | "OUTGOING";
  recordingURL: string | null;
}

export const useCallRecordings = () => {
  return useQuery("call-recording", () => {
    return axios
      .get("/api/call/call-recording", {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => res.data as CallRecordData[]);
  });
};

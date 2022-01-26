import { useQuery } from "react-query";
import { axios, getToken } from "../utils/api";
import { CallRecordData } from "./useCallRecording";

export const useCallVoicemails = () => {
  return useQuery("call-voicemail", () => {
    return axios
      .get("/api/call/call-voicemail", {
        headers: {
          authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => res.data as CallRecordData[]);
  });
};

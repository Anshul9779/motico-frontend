import { useQuery } from "react-query";
import { CACHE_TIME } from ".";
import { getRegisteredPhone } from "../api";

export const usePhoneNumbers = () => {
  return useQuery("phonenumbers", getRegisteredPhone, {
    cacheTime: CACHE_TIME,
    staleTime: CACHE_TIME,
  });
};

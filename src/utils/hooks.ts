import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { useQuery as useReactQuery } from "react-query";
import { axios, getToken } from "./api";
import { Phonenumber } from "./types";

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

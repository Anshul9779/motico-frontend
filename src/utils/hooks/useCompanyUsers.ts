import { useMutation, useQuery, useQueryClient } from "react-query";
import { CACHE_TIME } from ".";
import { axios, getToken } from "../api";
import { BasicUser } from "../types";

export const useCompanyUsers = () => {
  return useQuery(
    "users",
    async () => {
      const data = await axios.get("/api/admin/user/get-company", {
        headers: { authorization: "Bearer " + getToken() },
      });
      return data.data as BasicUser[];
    },
    {
      staleTime: CACHE_TIME,
      cacheTime: CACHE_TIME,
    }
  );
};

export const useDeleteUser = () => {
  const client = useQueryClient();
  return useMutation(
    async (id: number) => {
      await axios.post(
        "/api/admin/user/delete",
        { id },
        {
          headers: { authorization: "Bearer " + getToken() },
        }
      );
    },
    {
      onMutate: (id) => {
        const oldUsers = client.getQueryData("users") as BasicUser[];
        const newUsers = oldUsers.filter((user) => user.id !== id);
        client.setQueryData("users", newUsers);
        return { oldUsers };
      },
      onError: (_, id, context: { oldUsers: BasicUser[] } | undefined) => {
        if (!context) {
          return;
        }
        const { oldUsers } = context;
        client.setQueryData("users", oldUsers);
      },
    }
  );
};

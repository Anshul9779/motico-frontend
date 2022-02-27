import { useMutation, useQuery, useQueryClient } from "react-query";
import { CACHE_TIME, UserMe } from ".";
import { axios, getToken } from "../api";
import { Team } from "../types";

type TeamAPIReturn = Array<Team & { users: UserMe[] }>;

export const useTeams = () => {
  return useQuery(
    "teams",
    async () => {
      const data = await axios.get("/api/teams", {
        headers: { authorization: "Bearer " + getToken() },
      });
      return data.data as TeamAPIReturn;
    },
    {
      staleTime: CACHE_TIME,
      cacheTime: CACHE_TIME,
    }
  );
};

export const useDeleteTeams = () => {
  const client = useQueryClient();

  return useMutation(
    async (id: number) => {
      await axios.post(
        "/api/teams/delete",
        { id },
        {
          headers: { authorization: "Bearer " + getToken() },
        }
      );
    },
    {
      onMutate: (id) => {
        const oldTeams = client.getQueryData("teams") as TeamAPIReturn;
        const newTeams = oldTeams.filter((team) => team.id !== id);
        client.setQueryData("teams", newTeams);
        return {
          oldTeams,
        };
      },
      onError: (_, id, context: { oldTeams: TeamAPIReturn } | undefined) => {
        if (!context) {
          return;
        }
        const { oldTeams } = context;
        client.setQueryData("teams", oldTeams);
      },
    }
  );
};

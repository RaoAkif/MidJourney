import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";

export const useGetUser = (stringId) => {
  const id = parseInt(stringId);

  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getUser = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await api.get(`/users/${id}`, headers);
      //   console.log(response.data);
      return response.data;
    },
  });

  return getUser;
};

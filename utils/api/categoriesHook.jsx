import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";

export const useGetCategories = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getCategories = useQuery({
    queryKey: ["promptCategories"],
    queryFn: async () => {
      const response = await api.get("/promptCategories", headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getCategories;
};

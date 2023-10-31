import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";

export const useGetStories = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getStories = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await api.get("/prompts", headers);
      console.log(response.data);
      return response.data;
    },
  });

  return getStories;
};
export const useCreateStory = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const queryClient = useQueryClient();

  const createStory = useMutation({
    mutationFn: async (story) => {
      return await api.post("/prompts", story, headers);
    },
    onSuccess: () => {
      console.log("story created");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
    },
  });

  return createStory;
};

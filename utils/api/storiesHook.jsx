import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useGetStories = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getStories = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const response = await api.get("/prompts", headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getStories;
};
export const useGetStory = (stringId) => {
  const id = parseInt(stringId);

  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getStory = useQuery({
    queryKey: ["story", id],
    queryFn: async () => {
      const response = await api.get(`/prompts/${id}`, headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getStory;
};
export const useGetStoriesByUserId = () => {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getStories = useQuery({
    queryKey: ["story", userId],
    queryFn: async () => {
      const response = await api.get(`/prompts/byuserid/${userId}`, headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getStories;
};

export const useGetStoriesByColabId = (stringId) => {
  const id = parseInt(stringId);

  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getStoriesByColabId = useQuery({
    queryKey: ["storyColaborator"],
    queryFn: async () => {
      const response = await api.get(`/prompts/byresponse/${id}`, headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getStoriesByColabId;
};
export const useCreateStory = () => {
  const { id: userId } = useSelector((state) => state.auth.userInfo);
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const queryClient = useQueryClient();
  const router = useRouter();

  const createStory = useMutation({
    mutationFn: async (story) => {
      // console.log(story);
      return await api.post("/prompts", story, headers);
    },
    onSuccess: () => {
      // console.log("story created");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["story", userId] });
      router.push("/home/storiesTab/myStories");
      Toast.show({
        type: "hatToast",
        text1: "Story Created",
        position: "top",
      });
    },
  });

  return createStory;
};

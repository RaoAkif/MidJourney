import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";

export const useGetCollaborations = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };

  const getCollaborations = useQuery({
    queryKey: ["colaboration"],
    queryFn: async () => {
      const response = await api.get(`/responses`, headers);
      // console.log(response.data);
      return response.data;
    },
  });

  return getCollaborations;
};

export const useCreateCollaboration = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const queryClient = useQueryClient();
  const router = useRouter();

  const createCollaboration = useMutation({
    mutationFn: async (collab) => {
      // console.log(story);
      return await api.post("/responses", collab, headers);
    },
    onSuccess: () => {
      // console.log("Collaboration Created");
      queryClient.invalidateQueries({ queryKey: ["storyColaborator"] });
      router.push("/home/storiesTab/myCollaborations");
      Toast.show({
        type: "hatToast",
        text1: "Collaboration Sucessfull",
        position: "top",
      });
    },
  });

  return createCollaboration;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";

export const useCreateCollaboration = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const queryClient = useQueryClient();

  const createCollaboration = useMutation({
    mutationFn: async (collab) => {
      // console.log(story);
      return await api.post("/responses", collab, headers);
    },
    onSuccess: () => {
      console.log("Collaboration Created");
      // queryClient.invalidateQueries({ queryKey: ["stories"] });
      // Toast.show({
      //   type: "hatToast",
      //   text1: "Story Added Sucessfully",
      //   position: "top",
      // });
    },
  });

  return createCollaboration;
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { api } from "./api";
import Toast from "react-native-toast-message";

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

export const useRegisterUser = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const headers = { headers: { Authorization: `Bearer ${token}` } };
  const queryClient = useQueryClient();

  const registerUser = useMutation({
    mutationFn: async (user) => {
      return await api.post("/users", user, headers);
    },
    onSuccess: () => {
      // console.log("user created");
      // queryClient.invalidateQueries({ queryKey: ["stories"] });
      Toast.show({
        type: "hatToast",
        text1: "Registration Sucessfully",
        position: "top",
      });
    },
  });

  return registerUser;
};

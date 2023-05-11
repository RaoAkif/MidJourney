import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
  userInfo: {}, // for user object
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.userInfo = {
        id: action.payload.id,
        pseudonym: action.payload.pseudonym,
      };
    },
    logout: (state) => {
      state.accessToken = "";
      AsyncStorage.removeItem("accessToken"); // remove accessToken from local storage TO BE REMOVED
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

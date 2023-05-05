import { createSlice } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  accessToken: '',
}

async function getAccessToken() {
  return await AsyncStorage.getItem('accessToken');
}

getAccessToken().then(token => {
  if (token) {
    initialState.accessToken = token;
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.accessToken = action.payload
      AsyncStorage.setItem('accessToken', action.payload); // save accessToken in local storage
    },
    logout: (state) => {
      state.accessToken = ''
      AsyncStorage.removeItem('accessToken'); // remove accessToken from local storage
    },
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer
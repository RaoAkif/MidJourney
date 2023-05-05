import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { usersApi } from '../api/usersApi';

export const registerUser = createAsyncThunk(
  'registerUser',
  async (userData) => {
    const response = await usersApi.registerUser(userData);
    return response.data;
  }
);

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState: {
    user: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export default registerUserSlice.reducer;
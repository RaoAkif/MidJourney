import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: {},
}

export const getUsersSlice = createSlice({
  name: 'getUsers',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
  },
})

export const { setUsers } = getUsersSlice.actions

export default getUsersSlice.reducer

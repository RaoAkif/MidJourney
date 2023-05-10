import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collaborations: [],
  isLoading: false,
  error: null,
}

export const getCollaborationsSlice = createSlice({
  name: 'getCollaborations',
  initialState,
  reducers: {
    setCollaborations: (state, action) => {
      state.collaborations = action.payload
    },
  },
  
})

export const { setCollaborations } = getCollaborationsSlice.actions

export default getCollaborationsSlice.reducer

import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  stories: [],
  isLoading: false,
  error: null,
}

export const getStoriesSlice = createSlice({
  name: 'getStories',
  initialState,
  reducers: {
    setStories: (state, action) => {
      state.stories = action.payload
    },
  },
  
})

export const { setStories } = getStoriesSlice.actions

export default getStoriesSlice.reducer

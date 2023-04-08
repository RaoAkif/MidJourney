import { configureStore } from '@reduxjs/toolkit'
import user from './user/user';
import promptCategory from './promptCategory/promptCategory';
import prompt from './prompt/prompt';
import response from './response/response';

export const store = configureStore({
  reducer: {
    user,
    promptCategory,
    prompt,
    response,
  },
})

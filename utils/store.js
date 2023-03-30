import { action, createStore } from "easy-peasy";

export const store = createStore({
  isLoggedIn: false,
  login: action((state, payload) => {
    state.isLoggedIn = false;
  }),
  logout: action((state, payload) => {
    state.isLoggedIn = false;
  }),
});

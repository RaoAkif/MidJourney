import React from "react";
import Landing from "./landing";
import { store } from '../api/store'
import { Provider } from 'react-redux'

export default function Page() {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
}

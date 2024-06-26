import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./tokenSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice,
  },
});

export default store;

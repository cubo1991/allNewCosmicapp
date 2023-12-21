import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./features/counterSlice";
import alienListSlice from "./features/alienListSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    alienList: alienListSlice,
    user: userSlice,
  }
});

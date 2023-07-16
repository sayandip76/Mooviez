import { configureStore } from "@reduxjs/toolkit";
import homeSlice from "./HomeSlice";

export const Store = configureStore({
  reducer: {
    home: homeSlice,
  },
});

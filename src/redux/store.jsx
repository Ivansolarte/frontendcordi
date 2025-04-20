// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import roleReducer from "./slices/roleSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer, 
  },
});
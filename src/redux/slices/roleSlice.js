// redux/slices/roleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  role: "", // puede ser: 'admin', 'superadmin', 'usuario'
};

const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    clearRole: (state) => {
      state.role = "";
    },
  },
});

export const { setRole, clearRole } = roleSlice.actions;
export default roleSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { login } from "../api/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    authChecked: false,
    address: null,
  },

  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
      state.authChecked = true;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
      console.log(state.address);
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.authChecked = true;
      localStorage.removeItem("token");
    },
    authChecked(state) {
      state.authChecked = true;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

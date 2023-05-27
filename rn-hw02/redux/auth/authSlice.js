import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authOperations";

const initialState = {
  login: null,
  userId: null,
  isUser: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.isUser = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.login;
        state.isUser = true;
      });
  },
});

export const authReducer = authSlice.reducer;

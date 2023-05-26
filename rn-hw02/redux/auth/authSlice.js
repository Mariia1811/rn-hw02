import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, registerThunk } from "./authOperations";

const initialState = {
  login: null,
  userId: null,
  isUser: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.displayName;
        state.isUser = true;
      })
      .addCase(registerThunk.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        state.userId = payload.uid;
        state.login = payload.login;
        state.isUser = true;
      });
  },
});

export const authReducer = authSlice.reducer;

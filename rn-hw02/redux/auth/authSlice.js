import { createSlice } from "@reduxjs/toolkit";
import {
  authStateCahngeUseThunk,
  logOutThunk,
  loginThunk,
  registerThunk,
} from "./authOperations";

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
      })
      .addCase(authStateCahngeUseThunk.fulfilled, (state, { payload }) => {
        if (payload) {
          state.userId = payload?.uid;
          state.login = payload?.login;
          state.isUser = payload?.isUser;
        }
      })
      .addCase(logOutThunk.fulfilled, (state, { payload }) => {
        state.login = null;
        state.userId = null;
        state.isUser = false;
      });
  },
});

export const authReducer = authSlice.reducer;

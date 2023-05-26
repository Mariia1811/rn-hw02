import { createSlice } from "@reduxjs/toolkit";
import { registerThunk } from "./authOperations";

const initialState = { isAuth: false, login: null, userId: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registerThunk.fulfilled, (state, { payload }) => {
      state.userId = payload.uid;
      state.login = payload.displayName;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.userId = payload.uid;
      state.login = payload.login;
    });
  },
});

export const authReducer = authSlice.reducer;
// тут
// import { createSlice } from "@reduxjs/toolkit";
// import { authSignUpUser }.uidrom "./authOperations";

// export const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     userId: null,
//     login: null,
//   },
//   reducers: {
//     updateUserProfile: (state, { payload }) => ({
//       ...state,
//       userId: payload.userId,
//       login: payload.login,
//     }),
//     authStateChange: (state, { payload }) => ({
//       ...state,
//       stateChange: payload.stateChange,
//     }),
//   },
// });

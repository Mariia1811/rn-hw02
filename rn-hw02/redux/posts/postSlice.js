import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";

const initialState = {

};

const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: (builder) => {
    builder
    //   .addCase(registerThunk.fulfilled, (state, { payload }) => {
    //     state.userId = payload.uid;
    //     state.login = payload.displayName;
    //     state.isUser = true;
    //   })
      
  },
});

export const postReducer = postSlice.reducer;

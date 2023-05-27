import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
//   signOut,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";

// export const loginThunk = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       const { user } = await signInWithEmailAndPassword(auth, email, password);
//       const loginUser = {
//         login: user.displayName,
//         uid: user.uid,
//       };
//       return loginUser;
//     } catch (error) {
//       console.log("error", error);
//       console.log("error.message", error.message);
//     }
//   }
// );

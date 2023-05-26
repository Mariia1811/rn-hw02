import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";

export const registerThunk = createAsyncThunk(
  "auth/register",
  async ({ email, password, login }, thunkAPI) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userCurrent = await auth.currentUser;

      if (userCurrent) {
        try {
          await updateProfile(userCurrent, {
            displayName: login,
          });
        } catch (error) {
          throw error;
        }
      }
      const { displayName, uid } = await auth.currentUser;
      console.log("j", { displayName, uid });
      return { displayName, uid };
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const loginUser = {
        login: user.displayName,
        uid: user.uid,
      };
      console.log("w", loginUser);
      return loginUser;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

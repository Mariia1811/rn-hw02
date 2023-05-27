import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
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
      return loginUser;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

export const logOutThunk = createAsyncThunk(
  "auth/logOut",
  async (__i, thunkAPI) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

export const authStateCahngeUseThunk = createAsyncThunk(
  "auth/cahnge",
  async (__i, thunkAPI) => {
    try {
      await onAuthStateChanged(auth, (user) => {
        if (user) {
          const loginUser = {
            login: user?.displayName || null,
            uid: user?.uid || null,
            isUser: true || false,
          };
          return loginUser;
        } else {
          return;
        }
      });
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }
);

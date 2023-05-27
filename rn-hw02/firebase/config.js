import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBOWHysCv3Ujr4L13IHi5JVoGolRsnQA5k",
  authDomain: "rn-hw02.firebaseapp.com",
  projectId: "rn-hw02",
  storageBucket: "rn-hw02.appspot.com",
  messagingSenderId: "719333434250",
  appId: "1:719333434250:web:7eef13c6738dbe7c7d1e73",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

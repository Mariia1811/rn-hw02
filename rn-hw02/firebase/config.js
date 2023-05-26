// import * as firebase from "firebase";
// import "firebase/auth";

// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// // Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// // Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// // Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBOWHysCv3Ujr4L13IHi5JVoGolRsnQA5k",
  authDomain: "rn-hw02.firebaseapp.com",
  projectId: "rn-hw02",
  storageBucket: "rn-hw02.appspot.com",
  messagingSenderId: "719333434250",
  appId: "1:719333434250:web:7eef13c6738dbe7c7d1e73",
};
// export default firebase.initializeApp(firebaseConfig);
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

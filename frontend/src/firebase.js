// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "morning-dispatch-c38e1.firebaseapp.com",
  projectId: "morning-dispatch-c38e1",
  storageBucket: "morning-dispatch-c38e1.firebasestorage.app",
  messagingSenderId: "528013570957",
  appId: "1:528013570957:web:53aa8c718e5262741843c4"
  //  storageBucket: "morning-dispatch-c38e1.firebasestorage.app",

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
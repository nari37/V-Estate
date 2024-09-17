



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-state-vizag.firebaseapp.com",
  projectId: "real-state-vizag",
  storageBucket: "real-state-vizag.appspot.com",
  messagingSenderId: "59803531197",
  appId: "1:59803531197:web:1101ceb35e51f5398344d4"
};

// Initialize Firebase
export   const app = initializeApp(firebaseConfig);

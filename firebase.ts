// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzv-OdC_HuiwJP27FpK7aCnAGURow3WKY",
  authDomain: "filmzone-187dc.firebaseapp.com",
  projectId: "filmzone-187dc",
  storageBucket: "filmzone-187dc.appspot.com",
  messagingSenderId: "858441752734",
  appId: "1:858441752734:web:b1e60b2d94d3851e525b8f",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };

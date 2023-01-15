// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAR3HwgthsBZXYMCR-pLtSu2wfe7Pw47JY",
  authDomain: "focus-a2ae7.firebaseapp.com",
  projectId: "focus-a2ae7",
  storageBucket: "focus-a2ae7.appspot.com",
  messagingSenderId: "901684923632",
  appId: "1:901684923632:web:f2065b0982146f3a494635",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//Exported Basics
const auth = getAuth();
const usersRef = collection(db, "Users");
const postsRef = collection(db, "Posts");
export { auth, usersRef, postsRef };

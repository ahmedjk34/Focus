import { onAuthStateChanged } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Main from "./Components/Main/Main";
import Signup from "./Components/Signup/Signup";
import { auth, usersRef } from "./firebaseBasics";
import { Route, Routes } from "react-router-dom";
import PostPage from "./Components/Post/PostPage";
import Profile from "./Components/Profile/Profile";
import "./App.css";
import ErrorPage from "./Components/ErrorPage";

export let currentUsers = [];
function App() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    //this is used for username validation
    onSnapshot(usersRef, (documents) => {
      currentUsers = [];
      documents.docs.forEach((doc) => {
        currentUsers.push(doc.data().username);
      });
    });
    onAuthStateChanged(auth, (u) => setUser(u));
  }, []);
  return (
    <Routes>
      <Route path="/" element={<>{user ? <Main /> : <Signup />}</>}></Route>
      <Route path="/post/:id" element={<PostPage />}></Route>
      <Route path="/profile/:username" element={<Profile />}></Route>
      <Route path="*" element={<ErrorPage />}></Route>
    </Routes>
  );
}

export default App;

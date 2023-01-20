import { onAuthStateChanged } from "firebase/auth";
import { getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Signup from "./Components/Signup/Signup";
import { auth, usersRef } from "./firebaseBasics";
import { Route, Routes } from "react-router-dom";
import PostPage from "./Components/Post/PostPage";
import Profile from "./Components/Profile/Profile";

export let currentUsers = [];
function App() {
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    onSnapshot(usersRef, (documents) => {
      currentUsers = [];
      documents.docs.forEach((doc) => {
        currentUsers.push(doc.data().username);
      });
    });
  }, []);
  onAuthStateChanged(auth, (u) => setUser(u));
  return (
    <Routes>
      <Route
        path="/focus/"
        element={
          <>{user ? <Main /> : <Signup currentUsers={currentUsers} />}</>
        }
      ></Route>
      <Route path="focus/post/:id" element={<PostPage />}></Route>
      <Route path="focus/profile/:username" element={<Profile />}></Route>
    </Routes>
  );
}

export default App;

import { onAuthStateChanged } from "firebase/auth";
import { getDocs, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Signup from "./Components/Signup/Signup";
import { auth, usersRef } from "./firebaseBasics";
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
    <>{user ? <Main></Main> : <Signup currentUsers={currentUsers}></Signup>}</>
  );
}

export default App;

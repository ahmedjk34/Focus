import { onAuthStateChanged } from "firebase/auth";
import { getDocs } from "firebase/firestore";
import React, { useEffect } from "react";
import "./App.css";
import Main from "./Components/Main/Main";
import Signup from "./Components/Signup/Signup";
import { auth, usersRef } from "./firebaseBasics";
function App() {
  let user = auth.currentUser;
  let currentUsers = [];
  useEffect(() => {
    getDocs(usersRef).then((documents) =>
      documents.docs.forEach((doc) => currentUsers.push(doc.data().userName))
    );
  }, []);
  onAuthStateChanged(auth, (u) => (user = u));
  return (
    <>{user ? <Main></Main> : <Signup currentUsers={currentUsers}></Signup>}</>
  );
}

export default App;

import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, usersRef } from "../../firebaseBasics";
import Nav from "./Nav";
import Feed from "./Feed";
import { onSnapshot } from "firebase/firestore";
export let usersInfo;
function Main() {
  useEffect(() => {
    usersInfo = [];
    onSnapshot(usersRef, (snapshot) => {
      snapshot.docs.forEach((doc) => usersInfo.push(doc.data()));
    });
  }, []);
  return (
    <div className="main">
      <Nav />
      <Feed />
    </div>
  );
}

export default Main;

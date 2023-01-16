import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, postsRef, usersRef } from "../../firebaseBasics";
import Nav from "./Nav";
import Feed from "./Feed";
import { onSnapshot, serverTimestamp } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
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
//Create post function
// async function createPost() {
//   await addDoc(postsRef, {
//     id: uuidv4(),
//     author: auth.currentUser.displayName,
//     authorPfp: auth.currentUser.photoURL,
//     img: "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     date: serverTimestamp(),
//     caption: "Paris is the best place to be 💜",
//     likesCounter: 7,
//     likedUsers: ["Josh"],
//     url: "",
//     comments: [
//       {
//         commentAuthor: "Josh",
//         profilePicture:
//           "https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//         comment: "My new profile picture !",
//       },
//     ],
//   });
// }

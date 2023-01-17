import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, postsRef, usersRef } from "../../firebaseBasics";
import Nav from "./Nav";
import Feed from "./Feed";
import { doc, onSnapshot, serverTimestamp } from "firebase/firestore";
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
// async function createPost(
//   username,
//   authorPfp,
//   img,
//   caption,
//   likesCounter,
//   comments
// ) {
//   await addDoc(postsRef, {
//     id: uuidv4(),
//     author: username,
//     authorPfp: authorPfp,
//     img: img,
//     date: serverTimestamp(),
//     caption: caption,
//     likesCounter: likesCounter,
//     likedUsers: [],
//     url: "",
//     comments: comments,
//   });
// }

// function commentMaker(author, pfp, comment) {
//   return {
//     commentAuthor: author,
//     authorpfp: pfp,
//     comment: comment,
//   };
// }
// let author = "Rama";
// let authorpfp =
//   "https://images.pexels.com/photos/2216350/pexels-photo-2216350.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
// let img =
//   "https://images.pexels.com/photos/10389895/pexels-photo-10389895.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1  ";
// let caption = "My little girl is sophisticated 📚";
// let comments = [
//   commentMaker(
//     "Sara",
//     "https://images.pexels.com/photos/354951/pexels-photo-354951.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     "She is so cute 😻 "
//   ),
//   commentMaker(
//     "Mohammad",
//     "https://images.pexels.com/photos/819530/pexels-photo-819530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
//     "What a smart girl she is 🤓"
//   ),
// ];
// createPost(author, authorpfp, img, caption, 4, comments);

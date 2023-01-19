import {
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  updateDoc,
} from "firebase/firestore";
import { auth } from "../../firebaseBasics";
import { postsRef, db } from "../../firebaseBasics";

export async function handleLike(likedUsers, id) {
  let didLike = false;
  const currentPost = doc(db, "Posts", id);
  for (let user of likedUsers) {
    if (user == auth.currentUser.displayName) {
      didLike = true;
      break;
    }
  }
  if (didLike) {
    await updateDoc(currentPost, {
      likedUsers: arrayRemove(auth.currentUser.displayName),
      likesCounter: increment(-1),
    });
  } else {
    await updateDoc(currentPost, {
      likedUsers: arrayUnion(auth.currentUser.displayName),
      likesCounter: increment(1),
    });
  }
}
export async function addComment(comment, id) {
  const currentPost = doc(db, "Posts", id);
  await updateDoc(currentPost, {
    comments: arrayUnion({
      authorpfp: auth.currentUser.photoURL,
      comment: comment,
      commentAuthor: auth.currentUser.displayName,
    }),
  });
}

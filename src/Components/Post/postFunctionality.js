import {
  addDoc,
  arrayRemove,
  arrayUnion,
  doc,
  increment,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { auth, storage } from "../../firebaseBasics";
import { postsRef, db } from "../../firebaseBasics";
import { uuidv4 } from "@firebase/util";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
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
export async function publishPost(imgToUpload, caption) {
  if (imgToUpload == null) {
    alert("You can't upload a post without an image!");
    return;
  }
  if (imgToUpload.size > 2097152) {
    alert(
      "Image size exceeded , please make sure that the image is less that 2 mb"
    );
    return;
  }
  const imgRef = ref(storage, `posts/${imgToUpload.name + uuidv4()}`);
  await uploadBytes(imgRef, imgToUpload);
  const img = await getDownloadURL(imgRef);
  await addDoc(postsRef, {
    id: uuidv4(),
    author: auth.currentUser.displayName,
    authorPfp: auth.currentUser.photoURL,
    img: img,
    date: serverTimestamp(),
    caption: caption,
    likesCounter: 0,
    likedUsers: [],
    url: "",
    comments: [],
  });
}

import { auth, db, postsRef } from "../../firebaseBasics";
import { doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseBasics";
import { uuidv4 } from "@firebase/util";
import { updateProfile } from "firebase/auth";
export default async function handelFollow(userInfo, userId) {
  const docRef = doc(db, "Users", userId);
  let doesFollow = false;

  userInfo.followers.forEach((follower) => {
    if (follower.username === auth.currentUser.displayName) doesFollow = true;
  });
  if (doesFollow) {
    await updateDoc(docRef, {
      followers: arrayRemove({
        username: auth.currentUser.displayName,
      }),
    });
  } else {
    await updateDoc(docRef, {
      followers: arrayUnion({
        username: auth.currentUser.displayName,
      }),
    });
  }
}

export async function updateProfilePicture(imgToUpload, userId) {
  const docRef = doc(db, "Users", userId);
  const postsQ = query(
    postsRef,
    where("author", "==", auth.currentUser.displayName)
  );
  if (imgToUpload == null) {
    alert("You can't upload a post without an image!");
    return false;
  }
  if (imgToUpload.size > 2097152) {
    alert(
      "Image size exceeded , please make sure that the image is less that 2 mb"
    );
    return false;
  }
  const imgRef = ref(
    storage,
    `profile-pictures/${imgToUpload.name + uuidv4()}`
  );
  await uploadBytes(imgRef, imgToUpload);
  const img = await getDownloadURL(imgRef);
  await updateProfile(auth.currentUser, {
    photoURL: img,
  });
  await updateDoc(docRef, {
    profilePicture: img,
  });
  const documents = await getDocs(postsQ);
  documents.docs.forEach((document) => {
    const ref = document.ref;
    console.log(ref);
    updateDoc(ref, { authorPfp: img });
  });
}

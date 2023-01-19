import { auth, db } from "../../firebaseBasics";
import { doc, FieldValue, updateDoc } from "firebase/firestore";
import { arrayRemove, arrayUnion } from "firebase/firestore";
export default async function handelFollow(userInfo, userId) {
  const docRef = doc(db, "Users", userId);
  if (userInfo.username == auth.currentUser.displayName) return;
  let doesFollow = false;
  userInfo.followers.forEach((follower) => {
    if (follower.username === auth.currentUser.displayName) doesFollow = true;
  });
  if (doesFollow) {
    await updateDoc(docRef, {
      followers: arrayRemove({
        username: auth.currentUser.displayName,
        pfp: auth.currentUser.photoURL,
      }),
    });
  } else {
    await updateDoc(docRef, {
      followers: arrayUnion({
        username: auth.currentUser.displayName,
        pfp: auth.currentUser.photoURL,
      }),
    });
  }
}

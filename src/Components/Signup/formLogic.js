import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { usersRef, auth } from "../../firebaseBasics";
import { currentUsers } from "../../App";
let anonUser =
  "https://images.nightcafe.studio//assets/profile.png?tr=w-1600,c-at_max";

export async function handleGoogle(e) {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  //To prevent document duplication
  let userNotShown = true;
  //used a for...of loop for performance optimization
  for (let user of currentUsers) {
    if (user === auth.currentUser.displayName) {
      userNotShown = false;
      break;
    }
  }
  if (userNotShown)
    await addDoc(usersRef, {
      username: auth.currentUser.displayName,
      profilePicture: auth.currentUser.photoURL,
      followers: [],
      following: [],
    });
}
export async function handleEmailSignup(e, username, email, password, isValid) {
  e.preventDefault();
  if (!isValid) return;
  await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(auth.currentUser, {
    displayName: username,
    photoURL: anonUser,
  });
  await addDoc(usersRef, {
    username: auth.currentUser.displayName,
    profilePicture: auth.currentUser.photoURL,
    followers: [],
    following: [],
    bio: "Hi , im using Focus!",
  });
}
export async function handleEmailLogin(e, email, password) {
  e.preventDefault();
  await signInWithEmailAndPassword(auth, email, password);
}

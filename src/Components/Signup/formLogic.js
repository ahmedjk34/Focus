import { addDoc } from "firebase/fiwrestore";
import { usersRef, auth } from "../../firebaseBasics";
function checkUserName(usersArray) {}
async function handleGoogle() {
  await addDoc(usersRef, {
    userName: auth.currentUser.displayName,
    profilePicture: auth.currentUser.photoURL,
  });
}
async function handleEmailSignup(username, email, password) {}
async function handleEmailLogin(email, password) {}

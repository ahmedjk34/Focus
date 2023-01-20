import { getDocs, query, where } from "firebase/firestore";
import { usersRef } from "../../firebaseBasics";

export default function searchFun(currentValue, setMatchingUsers) {
  debounce(async () => {
    let users = [];
    const documents = await getDocs(usersRef);
    documents.forEach((doc) => {
      if (doc.data().username.includes(currentValue)) {
        users.push(doc.data());
        setMatchingUsers(users);
      }
    });
  }, 500)();
}
function debounce(fn, delay) {
  let id;
  return (...args) => {
    if (id) clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

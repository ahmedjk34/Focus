import {
  getDocs,
  getDocsFromServer,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { postsRef } from "../../firebaseBasics";
import Post from "../Post/Post";
function Feed() {
  const main = document.querySelector(".feed");
  const [posts, setPosts] = useState([]);
  const [latestDoc, setLatestDoc] = useState(null);
  async function initialLoad() {
    const initialLoadQuery = query(postsRef, orderBy("date", "desc"), limit(6));
    const documents = await getDocs(initialLoadQuery);
    documents.docs.forEach((doc) => setPosts((prev) => [...prev, doc.data()]));
    setLatestDoc(documents.docs[documents.docs.length - 1]);
  }

  async function fetchData() {
    const postsQuery = query(
      postsRef,
      orderBy("date", "desc"),
      startAfter(latestDoc),
      limit(6)
    );
    const loading = document.querySelector(".loading");
    const caught = document.querySelector(".caught");

    let triggerHeight = main.scrollTop + main.clientHeight;
    if (triggerHeight > main.scrollHeight) {
      loading.classList.add("hidden");
      const documents = await getDocs(postsQuery);
      if (documents.empty) {
        caught.classList.remove("hidden");
        return;
      }
      loading.classList.remove("hidden");
      setLatestDoc(documents.docs[documents.docs.length - 1]);
      documents.docs.forEach((e) => setPosts((prev) => [...prev, e.data()]));
    }
  }

  useEffect(() => {
    initialLoad();
  }, []);
  return (
    <div className="feedHolder">
      <div className="feed" onScroll={fetchData}>
        {posts.map((e) => (
          <Post data={e}></Post>
        ))}
        <h3 className="loading hidden">Loading Posts...</h3>
        <h3 className="caught hidden">You caught up with your friends ✅</h3>
      </div>
    </div>
  );
}

export default Feed;

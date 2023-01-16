import { getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { postsRef } from "../../firebaseBasics";
import Post from "../Post/Post";
function Feed() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getDocs(postsRef).then((docs) =>
      docs.docs.forEach((doc) => setPosts([...posts, doc.data()]))
    );
  }, []);
  return (
    <div className="feedHolder">
      <div className="feed">
        {posts.map((e, key) => (
          <Post data={e} key={key}></Post>
        ))}
      </div>
    </div>
  );
}

export default Feed;

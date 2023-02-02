import { onSnapshot, query, where, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, postsRef, usersRef } from "../../firebaseBasics";
import ErrorPage from "../ErrorPage";
import loading from "../images/loading.gif";
import Nav from "../Main/Nav";
import likeIcon from "../images/likeIcon.svg";
import commentIcon from "../images/commentIcon.svg";
import FollowersPopUp from "./FollowersPopUp";
import FollowingPopUp from "./FollowingPopUp";
import handelFollow from "./profileLogic";
import { useNavigate } from "react-router-dom";
import pencilIcon from "../images/pencil.svg";
import UpdateImgPopup from "./UpdateImgPopup";

//to fetch the profile picture to the follow(er/ing) array
function createFollowArray(array, setArray) {
  array.forEach((current) => {
    //to reset the comment array
    setArray([]);
    //gets the current follow(er,ing) info
    const q = query(usersRef, where("username", "==", current.username));
    let pfp;
    getDocs(q).then((documents) => {
      /*this simply adds a pfp to the comment obj
      from the BaaS*/
      documents.docs.forEach((user) => (pfp = user.data().profilePicture));
      const withPfp = { ...current, pfp: pfp };
      setArray((prev) => [...prev, withPfp]);
    });
  });
}
function Profile() {
  const { username } = useParams();
  const [userInfo, setUserInfo] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [postsId, setPostsId] = useState([]);
  const [followingArray, setFollowingArray] = useState([]);
  const [followersArray, setFollowersArray] = useState([]);
  const [showPage, setShowPage] = useState(false);
  const [doesFollow, setDoesFollow] = useState(false);
  const [isOwner, setIsOwner] = useState(null);
  const [showFollowersPopUp, setShowFollowersPopUp] = useState(false);
  const [showFollowingPopUp, setShowFollowingPopUp] = useState(false);
  const [userId, setUserId] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const navigation = useNavigate();
  useEffect(() => {
    setIsOwner(auth.currentUser.displayName === username);
    const userQ = query(usersRef, where("username", "==", username));
    const postsQ = query(postsRef, where("author", "==", username));
    //gets the user
    onSnapshot(userQ, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setUserId(doc.id);
        setUserInfo(doc.data());
        createFollowArray(doc.data().followers, setFollowersArray);
        createFollowArray(doc.data().following, setFollowingArray);
        //incase the array is empty (forEach wont work)
        if (doc.data().followers.length === 0) setDoesFollow(false);
        setDoesFollow(false);
        for (const follower of doc.data().followers) {
          if (follower.username === auth.currentUser.displayName) {
            setDoesFollow(true);
            break;
          }
        }
      });
    });
    //gets the users posts
    onSnapshot(postsQ, (snapshot) => {
      if (snapshot.empty) {
        setShowPage(true);
        document.querySelector(".loadingPage").style.display = "none";
      }
      setUserPosts([]);
      setPostsId([]);
      snapshot.docChanges().forEach((doc) => {
        setUserPosts((prev) => [...prev, doc.doc.data()]);
        setPostsId((prev) => [...prev, doc.doc.id]);
        document.querySelector(".loadingPage").style.display = "none";
        setShowPage(true);
      });
    });
  }, [username]); //to reload upon changing the dynamic URL
  if (!auth.currentUser && showPage) return <ErrorPage />;
  return (
    <div className="profile">
      <img className="loadingPage" src={loading}></img>
      {showPage && (
        <>
          {showFollowersPopUp && (
            <FollowersPopUp
              followers={followersArray}
              close={() => setShowFollowersPopUp(false)}
            ></FollowersPopUp>
          )}
          {showFollowingPopUp && (
            <FollowingPopUp
              following={followingArray}
              close={() => setShowFollowingPopUp(false)}
            ></FollowingPopUp>
          )}
          <Nav></Nav>
          <div className="profileInfo">
            {!isOwner && //So the follow button won't appear
              (doesFollow ? (
                <button
                  onClick={(e) => handelFollow(userInfo, userId)}
                  className="following"
                >
                  Following -
                </button>
              ) : (
                <button
                  onClick={(e) => handelFollow(userInfo, userId)}
                  className="follow"
                >
                  Follow +
                </button>
              ))}
            <div className="pfpHolder">
              <img src={userInfo.profilePicture} className="pfp"></img>
              {isOwner && (
                <div className="postOverlay" onClick={(e) => setShowEdit(true)}>
                  <img src={pencilIcon} className="pencilIcon"></img>
                </div>
              )}
            </div>
            <h3>@{userInfo.username}</h3>
            <div className="mainInfo">
              <h4 onClick={(e) => setShowFollowersPopUp(true)}>
                Followers : {userInfo.followers.length}
              </h4>
              <h4 onClick={(e) => setShowFollowingPopUp(true)}>
                Following : {userInfo.following.length}
              </h4>
              <h4>Posts : {userPosts.length}</h4>
            </div>
          </div>
          <div className="postsSectionHolder">
            {showEdit && (
              <UpdateImgPopup setShowEdit={setShowEdit} userId={userId} />
            )}
            <div className="postsSection">
              {userPosts.map((post, index) => (
                <div className="post">
                  <img src={post.img}></img>
                  <div
                    className="postOverlay"
                    onClick={(e) => navigation(`/post/${postsId[index]}`)}
                  >
                    <span>
                      {post.likesCounter}{" "}
                      <img src={likeIcon} className="icon"></img>
                    </span>
                    <span>
                      <img src={commentIcon} className="icon"></img>
                      {post.comments.length}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;

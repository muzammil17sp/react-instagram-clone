import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import Post from "./Post/Post";
import "./posts.css";
import Fade from "react-reveal/Fade";
const Posts = ({ user }) => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    firestore
      .collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setPost(snap.docs.map((doc) => ({ id: doc.id, post: doc.data() })));
      });
  }, []);
  return (
    <div className="posts">
      {post.map(({ id, post }) => {
        return (
          <Fade left>
            <Post
              user={user}
              key={id}
              postId={id}
              image={post.imageurl}
              username={post.username}
              caption={post.caption}
            />
          </Fade>
        );
      })}
    </div>
  );
};

export default Posts;

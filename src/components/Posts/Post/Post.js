import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import { firestore } from "../../../firebase";
import firebase from "firebase";
import { Button, TextField } from "@material-ui/core";

import "./post.css";
import { useStyles } from "../../Style/style";

function Post({ image, username, caption, user, postId }) {
  const classes = useStyles();
  const [comments, setcomments] = useState([]);
  const [comment, setcomment] = useState("");

  useEffect(() => {
    let cleanup;
    if (postId) {
      cleanup = firestore
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .orderBy("timestamp", "desc")
        .onSnapshot((snap) => {
          setcomments(snap.docs.map((doc) => doc.data()));
        });
    }
    return () => {
      cleanup();
    };
  }, [postId]);
  const postComment = (e) => {
    e.preventDefault();
    firestore.collection("posts").doc(postId).collection("comments").add({
      text: comment,
      username: user?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setcomment("");

  };
  return (
    <div className="post">
      <div className="post_header">
        <Avatar
          className="post_avatar"
          alt={username}
          src="/static/images/avatar/1.jpg"
        />
        <h3 className="post_username">{username}</h3>
      </div>
      <h4 className="post_caption">{caption}</h4>
      <img className="post_image" src={image} alt="post image" />

      <div className="post_comment">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="comment">
                <>
                  <strong>{comment.username}</strong>
                    <p>{comment.text}</p>
                    </>
            
            </div>
          );
        })}
      </div>
      {user && (
        <form onSubmit={postComment} className="comment_form" action="">
          <TextField
            value={comment}
            onChange={(e) => setcomment(e.target.value)}
            className={classes.textField}
            label="comment"
            variant="standard"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </div>
  );
}

export default Post;

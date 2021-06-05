import React, { useState } from "react";
import { storage, firestore } from "../../firebase";
import { Button, TextField, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import firebase from "firebase";
import "./imageupload.css";
function ImageUpload({user}) {
  const [caption, setcaption] = useState("");
  const [image, setimage] = useState(null);
  const [progress, setprogress] = useState(0);

  const handleUpload = (e) => {
    e.preventDefault()
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      (snap) => {
        const progrees = Math.round(
          (snap.bytesTransferred / snap.totalBytes) * 100
        );
        setprogress(progrees);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            firestore.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageurl: url,
              username: user.displayName,
            });
          })
          .then(() => clear());
      }
    );
  };
  const clear = () => {
    setcaption("");
    setimage();
    setprogress(0);
  };
  if (!user) {
    return <h2>You need to login to upload Post</h2>
  }
  return (
    <div className="imageupload">
      <form onSubmit={handleUpload}>
        <Typography variant="h4" color="primary">
          Upload A Post
        </Typography>
        <TextField
          type="text"
          variant="outlined"
          label="Enter your Post caption"
          required
          fullWidth
          onChange={(e) => setcaption(e.target.value)}
          value={caption}
        />
 
        <TextField
          required
          onChange={(e) => setimage(e.target.files[0])}
          fullWidth
          type="file"
        />
        <LinearProgress
          color="primary"
          variant="determinate"
          value={progress}
        />
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>


    </div>
  );
}

export default ImageUpload;

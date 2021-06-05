import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import Nav from "../Header/Nav";
import Posts from "../Posts/Posts";
import ImageUpload from "../Uploads/ImageUpload";
import "./home.css";
const Home = () => {
  const history = useHistory()
  const [user, setuser] = useState(null);
  useEffect(() => {
    const userCheck = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setuser(authUser);
      } else {
        setuser(null);
      }
    });
    return () => {
      userCheck();
    };
  }, []);
  
  return (
    <>
      <Nav user={user} />
      <div className="home">
        <Posts user={user} />
        <div className="home_upload">
          <ImageUpload user={user} />
        </div>
      </div>
    </>
  );
};

export default Home;

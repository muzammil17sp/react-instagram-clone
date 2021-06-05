import { Button } from "@material-ui/core";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./nav.css";
const Nav = ({ user }) => {
  const history = useHistory();

  const signoutUser = () => {
    auth.signOut().then(() => {
      history.push("/");
    });
  };
  return (
    <div className="nav">
      <div>
        <img
          src="./images/5a4e432a2da5ad73df7efe7a.png"
          alt="Instagram"
          className="nav_logo"
        />
      </div>
      <div>
        {user ? (
          <Button
            onClick={signoutUser}
            size="large"
            variant="contained"
            color="primary"
          >
            Signout
          </Button>
        ) : (
          <Link to="/login">
            <Button size="large" variant="contained" color="primary">
              login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;

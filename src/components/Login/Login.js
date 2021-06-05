import React, { useState } from "react";
import { useHistory } from "react-router";
import { auth } from "../../firebase";
import "./login.css";
function Login() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [userName, setuserName] = useState("");
  const [Signup, setSignup] = useState(false);
  const history = useHistory();
  const loginControllerHandler = (e) => {
    e.preventDefault();
    if (Signup) {
      auth
        .createUserWithEmailAndPassword(Email, Password)
        .then((user) => {
          user.user.updateProfile({
            displayName: userName,
          });
          console.log(user);
          history.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    } else {
      auth
        .signInWithEmailAndPassword(Email, Password)
        .then((user) => {
          console.log(user);
          history.push("/");
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return (
    <div className="login">
      <div className="login_form">
        <img
          src="./images/5a4e432a2da5ad73df7efe7a.png"
          alt=""
          className="login_logo"
        />
        <form onSubmit={loginControllerHandler}>
          {Signup && (
            <input
              onChange={(e) => setuserName(e.target.value)}
              type="text"
              name="username"
              placeholder=" enter usernamel "
            />
          )}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="Email"
            placeholder="enter email "
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            name="Password"
            type="password"
            placeholder=" enter password"
          />
          <input type="submit" value={Signup ? "Signup" : "Signin"} />
        </form>

        <div className="signup_section">
          <h6 className="login_signup">
            Don't have an account?{" "}
            <a href="#" onClick={() => setSignup(!Signup)}>
              Signup
            </a>
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Login;

import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="outline">
      <div id="loginform">
        <h2 id="headerTitle">Login</h2>
        <div className="row">
          <label>Username</label>
          <input type="text" placeholder="Enter your username" />
        </div>
        <div className="row">
          <label>Password</label>
          <input placeholder="Enter your password" type="password" />
        </div>

        <div className="row">
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Log in
          </button>
        </div>

        <div id="alternativeLogin">
          <label>Or sign in with:</label>
          <div id="iconGroup">
            <div className="space">
              <FcGoogle style={{ fontSize: "2rem" }} />
              <FaFacebook style={{ fontSize: "2rem", color: "#3b5998" }} />
              <FaSquareTwitter style={{ fontSize: "2rem", color: "#1DA1F2" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

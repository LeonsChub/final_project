import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./../../config";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [signup, setSignup] = useState({});
  const handleSubmit = async () => {
    try {
      console.log(signup);
      const result = await axios.post(`${baseURL}/users`, signup);
      console.log(result);
      navigate("/main");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="welcomeSpace">
      <div className="LoginSpace">
        <div className="loginHeaderSpace">
          <h2 id="form1Header">Signup</h2>
        </div>
        <form action="signup" className="form1">
          <label className="f1Labels" htmlFor="email">
            email
          </label>
          <input
            type="email"
            name="email"
            className="f1Inputs"
            id="signupEmail"
            placeholder="Enter email"
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
          />
          <label className="f1Labels" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="f1Inputs"
            id="signupUsername"
            placeholder="Enter username"
            onChange={(e) => setSignup({ ...signup, username: e.target.value })}
          />
          <label className="f1Labels" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="f1Inputs"
            id="signupPassword"
            placeholder="Enter password"
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
          />
          <div className="btnSpecial">
            <a href="#">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span onClick={() => handleSubmit()} className="text">
                  Create user
                </span>
              </p>
            </a>
          </div>
          <div className="btnSpecial">
            <a href="#">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span onClick={() => navigate('/')} className="text">
                  Back to welcome page
                </span>
              </p>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

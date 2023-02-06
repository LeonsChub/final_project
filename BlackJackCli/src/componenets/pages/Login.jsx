import React, { useState,useContext } from "react";
// import { axios } from "axios";
import axios from "axios";
import { TokenContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const [token, setToken] = useContext(TokenContext);

  function validateAndSend() {
    if (!email || !password) {
      setError("Please fill out all fields properly");
    } else {
      axios
        .post("http://localhost:3000/users/login", { email, password })
        .then((res) => {
          setToken(res["data"]);
          navigate("/");
        })
        .catch((err) => {
          setError(err["response"]["data"]);
        });
    }
  }

  return (
    <div className="welcomeSpace">
      <div className="LoginSpace">
        <div className="loginHeaderSpace">
          <h2 id="form1Header">Register</h2>
        </div>
        <form action="login" className="form1" >
          <label className="f1Labels" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            name="username"
            className="f1Inputs"
            id="usernameLog"
            placeholder="Enter username"
            onChange={(e) => setEmail( e.target.value)}
            value = {email}
          />
          <label className="f1Labels" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="f1Inputs"
            id="passwordLog"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a id="forgotPassword" href="">
            Forgot password?
          </a>
          <div className="btnSpecial">
            <a href="#">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span onClick={() => validateAndSend()} className="text">
                  SUBMIT
                </span>
              </p>
            </a>
          </div>
          <div className="toSignUpSpace">
            <div className="btnSpecial">
              <a href="/signup">
                <p>
                  <span className="bg"></span>
                  <span className="base"></span>
                  <span className="text">Create new user</span>
                </p>
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

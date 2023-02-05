import React, { useState } from "react";
import axios from "axios";
import { baseURL } from "./../../config";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({});
  const handleSubmit = async () => {
    try {
      console.log(login);
      const result = await axios.post(`${baseURL}/users`, login);
      console.log(result);
      navigate('/main')
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="welcomeSpace">
      <div className="LoginSpace">
        <div className="loginHeaderSpace">
          <h2 id="form1Header">Register</h2>
        </div>
        <form action="login" className="form1">
          <label className="f1Labels" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="f1Inputs"
            id="usernameLog"
            placeholder="Enter username"
            onChange={(e) => setLogin({ ...login, username: e.target.value })}
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
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <a id="forgotPassword" href="">
            Forgot password?
          </a>
          <div className="btnSpecial">
            <a href="#">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span onClick={() => handleSubmit()} className="text">
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

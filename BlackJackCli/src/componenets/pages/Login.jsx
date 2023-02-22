import React, { useState, useContext } from "react";
import { UserContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";
import { apiService } from "./../../ApiService/ApiService";
import Alert from "@mui/material/Alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { myProfile } = useContext(UserContext);

  async function validateAndSend(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill out all fields properly");
    } else {
      await apiService
        .login(email, password)
        .then((res) => {
          localStorage.setItem("token", res.data);
          myProfile();
          navigate("/");
        })
        .catch((err) => {
          () => alert(err.response.data);
        });
    }
  }

  return (
    <div className="welcomeSpace">
      <div className="LoginSpace">
        <div className="loginHeaderSpace">
          <h2 id="form1Header">Register</h2>
        </div>
        <form action="login" className="form1">
          <label className="f1Labels" htmlFor="username">
            Email
          </label>
          <input
            type="text"
            name="username"
            className="f1Inputs"
            id="usernameLog"
            placeholder="Enter username"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
            <button
              onClick={(e) => validateAndSend(e)}
              className="custom-btn btn-15B"
            >
              Submit
            </button>
          </div>
          <div className="btnSpecial">
            <button
              onClick={() => navigate("/signup")}
              className="custom-btn btn-15B"
            >
              Create new user
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

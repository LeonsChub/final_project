import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { apiService } from "./../../ApiService/ApiService";
import { UserContext } from "./../../AppContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { myProfile } = useContext(UserContext);

  async function validateAndSend(e) {
    e.preventDefault();
    console.log({ email: email, username: username, password: password });
    if (!email || !password) {
      setError("Please fill out all fields properly");
    } else {
      await apiService
        .register(email, username, password)
        .then((res) => {
          localStorage.setItem("token", res.data);
          myProfile();
          navigate("/");
        })
        .catch((err) => {
          setError(err["response"]["data"]);
        });
    }
  }

  return (
    <div className="welcomeSpace">
      <div className="signupSpace">
        <div className="signupHeaderSpace">
          <h2 id="form1Header">Signup</h2>
        </div>
        <form action="signup" className="form1">
          <label className="f1Labels" htmlFor="email">
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
          <label className="f1Labels" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="f1Inputs"
            id="usernameLog"
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
              onClick={() => navigate("/")}
              className="custom-btn btn-15B"
            >
              Back to main menu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

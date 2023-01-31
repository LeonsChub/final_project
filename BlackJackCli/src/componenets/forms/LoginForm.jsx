import React, { useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "../../AppContext";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [token, setToken] = useContext(TokenContext);

  function validateAndSend(e) {
    e.preventDefault();
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
    <form
      className="d-flex flex-column"
      onSubmit={(e) => validateAndSend(e)}
      noValidate
    >
      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form2Example1">
          Email address
        </label>
        <input
          type="email"
          id="form2Example1"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-outline mb-3">
        <label className="form-label" htmlFor="form2Example2">
          Password
        </label>
        <input
          type="password"
          id="form2Example2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      {error ? <p style={{ color: "#ff2222" }}>{error}</p> : ""}

      <button type="submit" className="btn btn-primary btn-block mb-4">
        Sign in
      </button>

      <div className="text-center">
        <p>
          Not a Signed up? <a href="#!">Register</a>
        </p>
      </div>
    </form>
  );
}

export default LoginForm;

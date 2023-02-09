import React from "react";
import "../../styles/index.css";
import { Link, useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const logo = "<SL>CASINO</SL>";
  return (
    <div className="welcomeSpace">
      <div className="welcomeHeaderSpace">
        <div className="welcomeHeader">
          <h2 id="welcomeHeader">{logo}</h2>
        </div>
      </div>
      <div className="welcomeBtnSpace">
        <div className="welcomeBtns">
          <button onClick={() => navigate("/login")} class="custom-btn btn-15">
            LOG IN
          </button>
        </div>
      </div>
      <div className="welcomeBtnSpace">
        <div className="welcomeBtns">
          <button onClick={() => navigate("/signup")} class="custom-btn btn-15">
            SIGN UP
          </button>
        </div>
      </div>
      <div className="welcomeBtnSpace">
        <div className="welcomeBtns">
          <button onClick={() => navigate("/main")} class="custom-btn btn-15">
            PLAY AS GUEST
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

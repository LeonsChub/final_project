import React from "react";

const Welcome = () => {
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
          <div className="btnSpecial">
            <a href="/login">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Log in</span>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="welcomeBtnSpace">
        <div className="welcomeBtns">
          <div className="btnSpecial">
            <a href="/signup">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Sign up</span>
              </p>
            </a>
          </div>
        </div>
      </div>
      <div className="welcomeBtnSpace">
        <div className="welcomeBtns">
          <div className="btnSpecial">
            <a href="/main">
              <p>
                <span className="bg"></span>
                <span className="base"></span>
                <span className="text">Play as guest</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;

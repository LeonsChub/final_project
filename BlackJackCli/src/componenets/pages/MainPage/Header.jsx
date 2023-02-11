import React, { useContext, useState } from "react";
import chip from "../../../../images/chip2.png";
import { ScrollersContext, UserContext } from "../../../AppContext";
const Header = () => {
  const { gamesClick, profileClick, aboutClick } = useContext(ScrollersContext);
  const { user, myProfile, setChips, chips, getChips } =
    useContext(UserContext);
  const [userNav, setUserNav] = useState(false);
  const logo = "<SL>CASINO</SL>";

  const logOut = () => {
    localStorage.removeItem("token");
    location.reload();
  };
  return (
    <div className="headerSpace">
      <div className="headerItems">
        <a id="myLogo">{logo}</a>
      </div>
      <div className="headerItems">
        <a onClick={gamesClick} id="gamesHeader">
          Games
        </a>
      </div>
      <div className="headerItems">
        <a onClick={profileClick} id="statsHeader">
          My stats
        </a>
      </div>
      <div className="headerItems">
        <a onClick={aboutClick} id="aboutUsHeader">
          About us
        </a>
      </div>
      <div onClick={() => setUserNav(!userNav)} className="headerItems">
        <div className="gHeaderSpace">
          <img src={chip} alt="chip" id="chipImg1" />
          <img src={chip} alt="chip" id="chipImg2" />
          {userNav ? (
            <div className="logOutBtn">
              <button onClick={() => logOut()} className="custom-btn btn-8">
                <span>Log Out</span>
              </button>
            </div>
          ) : (
            <></>
          )}
          {user ? (
            <span id="gHeader">
              <span> {user.username}</span> <span>{chips} CHIPS</span>
            </span>
          ) : (
            <></>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Header;

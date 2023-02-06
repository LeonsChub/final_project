import React, { useContext } from "react";
import { ScrollersContext } from './../context/Scrollers';

const Header = () => {
  const {gamesClick, profileClick, aboutClick} = useContext(ScrollersContext)
  const logo = "<SL>CASINO</SL>";
  return (
    <div className="headerSpace">
      <div className="headerItems">
        <a id="myLogo">
          {logo}
        </a>
      </div>
      <div className="headerItems">
        <a onClick={gamesClick} id="gamesHeader">
          Games
        </a>
      </div>
      <div className="headerItems">
        <a onClick={profileClick} id="statsHeader">
          My profile
        </a>
      </div>
      <div className="headerItems">
        <a onClick={aboutClick} id="aboutUsHeader">
          About us
        </a>
      </div>
      <div className="headerItems"></div>
    </div>
  );
};

export default Header;

import React, { useContext } from "react";
import { ScrollersContext } from "./context/Scrollers";

const Profile = () => {
  const { profileRef } = useContext(ScrollersContext);
  return (
    <div ref={profileRef} className="profileSpace">
      <div className="profileHeaderSpace">
        <h2 id="profileHeader">My Stats</h2>
      </div>
      <div className="stats">
        <div className="stat">
          <p>All Games</p>
        </div>
        <div className="stat">
          <p>Poker</p>
        </div>
        <div className="stat">
          <p>Black Jack</p>
        </div>
        <div className="stat">
          <p>Roullete</p>
        </div>
        <div className="stat">
          <p>Machines</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

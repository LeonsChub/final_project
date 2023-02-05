import React, { useContext, useState } from "react";
import { ScrollersContext } from "./context/Scrollers";

const Profile = () => {
  const { profileRef } = useContext(ScrollersContext);
  const [stat, setStat] = useState(true);
  return (
    <div ref={profileRef} className="profileSpace">
      {stat ? (
        <>
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
          <div className="profileBtns">
            <button onClick={() => setStat(false)}>Profile</button>
            <button onClick={() => setStat(true)}>Stats</button>
          </div>
        </>
      ) : (
        <><div></div>
          <div className="profileHeaderSpace">
            <h2 id="profileHeader">Profile</h2>
          </div>
          <div className="myInfoSpace">
            <p>Username</p>
            <img src="" alt="profileImg" />
          </div>
          <div className="myChipsSpace">
            <img src="" alt="chipsImg" />
            <p>chips</p>
          </div>
          <div className="profileBtns">
            <button onClick={() => setStat(false)}>Profile</button>
            <button onClick={() => setStat(true)}>Stats</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;

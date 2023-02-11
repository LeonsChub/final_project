import React, { useContext } from "react";
import { ScrollersContext } from "../../../AppContext";
import { LineChart } from "../../LineChart";
import { PieChart } from "../../PieChart";
const Profile = () => {
  const { profileRef } = useContext(ScrollersContext);
  return (
    <div ref={profileRef} className="profileSpace">
      <div className="profileHeaderSpace">
        <h2 id="profileHeader">My Stats</h2>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="chart1">
            <LineChart />
          </div>
        </div>
        <div className="stat">
          <div className="chart1">
            <PieChart />
          </div>
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

import React, { useContext } from "react";
import { ScrollersContext } from "./context/Scrollers";
import { useNavigate } from "react-router-dom";

const Games = () => {
  const navigate = useNavigate();
  const { gamesRef } = useContext(ScrollersContext);
  return (
    <div ref={gamesRef} className="gamesMenuSpace">
      <div className="gHeaderSpace">
        <h2 id="gHeader">welcome</h2>
      </div>
      <div className="cards">
        <div className="card">
          <div onClick={()=>{navigate("/rooms")}} className="middleCard">
            <p>Poker</p>
          </div>
        </div>
        <div className="card">
          <div className="middleCard">
            <p>Black Jack</p>
          </div>
        </div>
        <div className="card">
          <div className="middleCard">
            <p>Roullete</p>
          </div>
        </div>
        <div className="card">
          <div className="middleCard">
            <p>Machines</p>
          </div>
        </div>
      </div>
      <div className="myMoney"></div>
    </div>
  );
};

export default Games;

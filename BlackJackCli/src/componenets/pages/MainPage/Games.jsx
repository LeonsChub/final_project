import React, { useContext } from "react";
import { ScrollersContext, TokenContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

const Games = () => {
  const navigate = useNavigate();
  const [token] = useContext(TokenContext)
  const { gamesRef } = useContext(ScrollersContext);
  return (
    <div ref={gamesRef} className="gamesMenuSpace">
      <div className="gHeaderSpace">
        <h2 id="gHeader">welcome: {jwt(token).username}</h2>
      </div>
      <div className="cards">
        <div className="card">
          <div onClick={()=>{navigate("/poker")}} className="middleCard">
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

import React, { useContext, useState, useEffect } from "react";
import { ScrollersContext, TokenContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

const Games = () => {
  const navigate = useNavigate();
  const [drop1, setDrop1] = useState("dropClosed");
  const [drop2, setDrop2] = useState("dropClosed");
  const [drop3, setDrop3] = useState("dropClosed");
  const [token] = useContext(TokenContext);
  const { gamesRef } = useContext(ScrollersContext);
  const handleDrop = (x) => {
    if (x == 1) {
      if (drop1 == "dropClosed") {
        setDrop1("dropOpen");
        setDrop2("dropClosed");
        setDrop3("dropClosed");
      } else {
        setDrop1("dropClosed");
      }
    }
    if (x == 2) {
      if (drop2 == "dropClosed") {
        setDrop2("dropOpen");
        setDrop1("dropClosed");
        setDrop3("dropClosed");
      } else {
        setDrop2("dropClosed");
      }
    }
    if (x == 3) {
      if (drop3 == "dropClosed") {
        setDrop3("dropOpen");
        setDrop2("dropClosed");
        setDrop1("dropClosed");
      } else {
        setDrop3("dropClosed");
      }
    }
  };
  useEffect(() => {
    console.log(drop1);
  }, [drop1, drop2, drop3]);
  return (
    <div ref={gamesRef} className="gamesMenuSpace">
      <div className="gHeaderSpace">
        <h2 id="gHeader">welcome: {jwt(token).username}</h2>
      </div>
      <div className="dropDowns">
        <div style={{ left: "6.5%" }} className={`gameDrop ${drop1}`}>
          <p onClick={() => navigate("/room browser")} className="play">
            Join room
          </p>
          <p className="rules">Game rules</p>
        </div>
        <div className={`gameDrop ${drop2}`}>
          <p className="play">Play game</p>
          <p className="rules">Game rules</p>
        </div>
        <div style={{ right: "6.5%" }} className={`gameDrop ${drop3}`}>
          <p className="play">Play game</p>
          <p className="rules">Game rules</p>
        </div>
      </div>
      <div className="cards">
        <div className="card">
          <div onClick={() => handleDrop(1)} className="middleCard">
            <p>Texas Holdem</p>
          </div>
        </div>
        <div className="card">
          <div onClick={() => handleDrop(2)} className="middleCard">
            <p>Roullete</p>
          </div>
        </div>
        <div className="card">
          <div onClick={() => handleDrop(3)} className="middleCard">
            <p>Machines</p>
          </div>
        </div>
      </div>
      <div className="myMoney"></div>
    </div>
  );
};

export default Games;

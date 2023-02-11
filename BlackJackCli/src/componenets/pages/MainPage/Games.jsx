import React, { useContext, useState, useEffect } from "react";
import { ScrollersContext, UserContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import { apiService } from "./../../../ApiService/ApiService";

const Games = () => {
  const navigate = useNavigate();
  const [drop1, setDrop1] = useState("dropClosed");
  const [drop2, setDrop2] = useState("dropClosed");
  const [drop3, setDrop3] = useState("dropClosed");
  const { user, myProfile, setChips, chips, getChips } =
    useContext(UserContext);
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
    myProfile();
    getChips();
  }, []);

  return (
    <div ref={gamesRef} className="gamesMenuSpace">
      <div className="cards">
        <div className="card">
          <div className="middleCard">
            <button onClick={() => handleDrop(1)} className="custom-btn btn-5B">
              Texas Holdem
            </button>
          </div>
        </div>
        <div className="card">
          <div className="middleCard">
            <button onClick={() => handleDrop(2)} className="custom-btn btn-5B">
              Roullete
            </button>
          </div>
        </div>
        <div className="card">
          <div className="middleCard">
            <button onClick={() => handleDrop(3)} className="custom-btn btn-5B">
              Machines
            </button>
          </div>
        </div>
      </div>
      <div className="dropDowns">
        <div
          style={{ left: "16%", top: "18%" }}
          className={`gameDrop ${drop1}`}
        >
          <button
            onClick={() => navigate("/room browser")}
            className="custom-btn btn-10"
          >
            Play Game
          </button>
          <button className="custom-btn btn-10">How To Play?</button>
        </div>
        <div
          style={{ left: "16%", top: "45%" }}
          className={`gameDrop ${drop2}`}
        >
          <button className="custom-btn btn-10">Play Game</button>
          <button className="custom-btn btn-10">How To Play?</button>
        </div>
        <div
          style={{ left: "16%", top: "71%" }}
          className={`gameDrop ${drop3}`}
        >
          <button
            className="custom-btn btn-10"
            onClick={() => navigate("/machines")}
          >
            Play Game
          </button>
          <button className="custom-btn btn-10">How To Play?</button>
        </div>
      </div>
    </div>
  );
};

export default Games;

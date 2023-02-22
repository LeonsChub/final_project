import React, { useContext, useState, useEffect } from "react";
import { ScrollersContext, UserContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import { apiService } from "./../../../ApiService/ApiService";
import CardComp from "../../CardComp";
import renderDailyGame from "./../../DailyGame";

const Games = () => {
  const navigate = useNavigate();
  const [drop1, setDrop1] = useState("dropClosed");
  const [drop2, setDrop2] = useState("dropClosed");
  const [drop3, setDrop3] = useState("dropClosed");
  const [picked, setPicked] = useState(false);
  const [dailyResult, setDailyResult] = useState(
    "You played your daily game, visit again tommorrow for another chance"
  );
  const {
    user,
    myProfile,
    setChips,
    chips,
    getChips,
    postChips,
    getDailyGame,
    postDailyGame,
    dailyGame,
  } = useContext(UserContext);
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

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  const handleDailyGame = async (num) => {
    let date = new Date();
    setPicked(true);
    if (num == 1) {
      setDailyResult("You won 1000 CHIPS!, Visit again tommorow...");
      postChips(chips + 1000);
      await sleep(1000);
      postDailyGame(date.getDay() + 1);
      getDailyGame();
    } else {
      setDailyResult(`Close but no cigar - Try again tommorow! `);
      await sleep(3000);
      postDailyGame(date.getDay() + 1);
      getDailyGame();
    }
    console.log(dailyGame + "Available");
  };
  useEffect(() => {
    myProfile();
    getChips();
    getDailyGame();

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
            <button onClick={() => handleDrop(3)} className="custom-btn btn-5B">
              Slots
            </button>
          </div>
        </div>
      </div>
      {dailyGame ? (
        <div className="dailyGameSpace">
          <div className="dailyTitle">
            <h2>Your Daily Game is Available!</h2>
          </div>
          <div className="dailySecTitle">
            <h5>Try guess were is the KING card...</h5>
          </div>
          <div className="dailyGameContent">
            {renderDailyGame().map((val, index) => {
              let toReturn;
              switch (val) {
                case 1:
                  toReturn = (
                    <div
                      key={index}
                      onClick={() => handleDailyGame(1)}
                      className="dailyCard"
                      style={{ backgroundColor: "black", height: "45%" }}
                    >
                      {picked ? <CardComp value={"K"} suit={"clubs"} /> : <></>}
                    </div>
                  );
                  break;

                case 2:
                  toReturn = (
                    <div
                      key={index}
                      onClick={() => handleDailyGame(2)}
                      className="dailyCard"
                      style={{ backgroundColor: "black", height: "45%" }}
                    >
                      {picked ? <CardComp value={"Q"} suit={"clubs"} /> : <></>}
                    </div>
                  );
                  break;
                case 3:
                  toReturn = (
                    <div
                      key={index}
                      onClick={() => handleDailyGame(2)}
                      className="dailyCard"
                      style={{ backgroundColor: "black", height: "45%" }}
                    >
                      {picked ? <CardComp value={"J"} suit={"clubs"} /> : <></>}
                    </div>
                  );
                  break;

                default:
                  break;
              }
              console.log(toReturn);
              return toReturn;
            })}

          </div>
        </div>
      ) : (
        <div className="dailyGameSpace">
          <h2 className="dailyResTitle">{dailyResult}</h2>
        </div>
      )}
      <div className="dropDowns">
        <div
          style={{ left: "16%", top: "24%" }}
          className={`gameDrop ${drop1}`}
        >
          <button
            onClick={() => navigate("/room browser")}
            className="custom-btn btn-10"
          >
            Play Game
          </button>
          <button
            onClick={() => navigate("/htppoker")}
            className="custom-btn btn-10"
          >
            How To Play?
          </button>
        </div>
        <div
          style={{ left: "16%", top: "65%" }}
          className={`gameDrop ${drop3}`}
        >
          <button
            className="custom-btn btn-10"
            onClick={() => navigate("/machines")}
          >
            Play Game
          </button>
          <button
            onClick={() => navigate("/htpslot")}
            className="custom-btn btn-10"
          >
            How To Play?
          </button>
        </div>
      </div>
    </div>
  );
};

export default Games;

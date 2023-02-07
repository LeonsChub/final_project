import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
import jwt from "jwt-decode";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too late...</div>;
  }

  return (
    <div className="timer">
      <div className="text">Remaining</div>
      <div className="value">{remainingTime}</div>
      <div className="text">seconds</div>
    </div>
  );
};

const Poker = () => {
  const [roomData, setRoomData, blankGameState] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  const { user_id } = jwt(token);

  const mountRef = useRef(false);

  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [raise, setRaise] = useState(false);
  const [value, setValue] = useState(0);
  const [timer, setTimer] = useState(false);
  const [bet, setBet] = useState(roomData.gameState.blind);
  const [currentBet, setCurrentBet] = useState(0);
  // const {
  //   path,
  //   pathLength,
  //   stroke,
  //   strokeDashoffset,
  //   remainingTime,
  //   elapsedTime,
  //   size,
  //   strokeWidth,
  // } = useCountdown({ isPlaying: timer, duration: 30, colors: "#abc" });

  useEffect(() => {
    initListeners();

    return () => {
      if (mountRef.current) {
        socket.emit("leave room", {
          roomId: roomData.sockData.roomId,
          auth: token,
        });

        setRoomData((prev) => {
          const oldState = { ...prev };

          oldState.gameState = blankGameState();
          return oldState;
        });
      }
      mountRef.current = true;
      socket.off("user joined");
      socket.off("leave room");
    };
  }, []);

  const handleBet = async () => {
    setCurrentBet(value);
    setBet(value);
    setRaise(!raise);
  };
  const startingGame = () => {
    socket.emit("start game", {
      auth: token,
      roomId: roomData.sockData.roomId,
    });
  };
  return (
    <div className="pokerSpace">
      {raise ? (
        <div>
          <div className="sliderSpace sliderWithValues1">
            <MySlider
              value={value}
              setValue={setValue}
              myChips={5000}
              currentBet={currentBet}
            />
          </div>
          <button
            className="sliderWithValues"
            id="allInBtn"
            onClick={() => setValue(22)}
          >
            ALL IN
          </button>
          <button
            className="sliderWithValues"
            onClick={() => handleBet()}
            id="confirmBtn"
          >
            Confirm
          </button>
          <p id="sliderValue">{value}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="timerSpace">
        {renderTimer()}

        <div className="timer-wrapper"></div>
      </div>
      <div className="leftSide">
        <button
          id="exitGame"
          onClick={() => {
            navigate("/");
            socket.emit("leave room");
            setRoomData((prev) => {
              const oldState = { ...prev };
              oldState.gameState = blankGameState();
              oldState.isConnected = false;
              return oldState;
            });
          }}
        >
          Leave game
        </button>
        <div>
          <h3 id="roomName">Room: {roomData.sockData.roomName}</h3>
        </div>
        {gameStarted || user_id !== roomData.sockData.hostId ? (
          <></>
        ) : (
          <div>
            <button
              onClick={(e) => startingGame(e)}
              disabled={roomData.sockData.players.length < 2}
            >
              Start game {roomData.sockData.players.length}/2
            </button>
          </div>
        )}
      </div>
      <div className="blindSpace">
        <p id="blind">Blind: {roomData.gameState.blind}</p>
      </div>
      <div className="pokerBtns">
        <button id="raise" onClick={() => setRaise(!raise)}>
          Raise
        </button>
        <button onClick={() => setTimer(!timer)} id="call">
          Call
        </button>
        <button id="fold">Fold</button>
      </div>
      <div>
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return bets(index + 1);
        })}
      </div>
      <div className="pokerTable">
        <span id="dealerSeat">Dealer</span>;
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return seats(index + 1);
        })}
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return moneys(index + 1);
        })}
        <div className="package"></div>
        <div className="tableCenter">
          <div id="flopPlace"></div>
          <div id="c1Place"></div>
          <div id="c2Place"></div>
          <div id="c3Place"></div>
          <div id="c4Place"></div>
          <div id="c5Place"></div>
        </div>
      </div>
    </div>
  );
  function bets(i) {
    return <p className="bets" id={`bet${i}`}></p>;
  }
  function seats(i) {
    const player = reorderCenter(roomData.sockData.players)[i - 1];

    return <span id={`seat${i}`}>{player ? player.name : ""}</span>;
  }
  function moneys(i) {
    return (
      <div id={`money${i}`} className="moneys">
        <p className="moneyNum"></p>
      </div>
    );
  }
  function initListeners() {
    socket.on("handing cards", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
    });

    socket.on("update gamestate", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
    });

    socket.on("user joined", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.sockData = data;
        return oldState;
      });
    });

    socket.on("user left", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.sockData = data;
        return oldState;
      });
    });

    socket.on("kick user", () => {
      socket.emit("leave room", {
        auth: token,
        roomId: getRoomById(),
      });
    });

    socket.on("ref ready", (data) => {
      console.log(data);
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
    });

    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });

    window.addEventListener("unload", function (e) {
      socket.emit("leave room", {
        roomId: roomData.sockData.roomId,
        auth: token,
      });
    });
  }

  function renderTimer() {
    return (
      <CountdownCircleTimer
        isPlaying={gameStarted}
        duration={20}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[20, 15, 8, 0]}
        onComplete={() => [true, 1000]}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    );
  }
  function reorderCenter(players) {
    const reordered = new Array(7);
    const pIndex = players.findIndex((p) => {
      return p.id === user_id;
    });

    players.forEach((p, index) => {
      const newIndex =
        index - pIndex >= 0 ? index - pIndex : 7 + (index - pIndex);
      reordered[newIndex] = p;
    });

    return reordered;
  }
};
export default Poker;

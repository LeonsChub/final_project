import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import { useNavigate } from "react-router-dom";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
import jwt from "jwt-decode";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Card from "./../../Card";
import packageImg from "../../../../images/deck.webp";
import gsap from "gsap";
import Chips from "../../Chips";
import './../../../styles/btns.css'

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

  useEffect(() => {
    // if (gameStarted) {
    gsap.to(".myPlayingCard1", { y: 290, x: 20, duration: 1.5 });
    setTimeout(() => {
      gsap.to(".player2Card1", { y: 255, x: 305, duration: 1.5 });
    }, 6500);
    setTimeout(() => {
      gsap.to(".player3Card1", { y: 95, x: 345, duration: 1.5 });
    }, 6000);
    setTimeout(() => {
      gsap.to(".player4Card1", { y: -70, x: 300, duration: 1.5 });
    }, 5500);
    setTimeout(() => {
      gsap.to(".player5Card1", { y: -70, x: -300, duration: 1.5 });
    }, 5000);
    setTimeout(() => {
      gsap.to(".player6Card1", { y: 95, x: -345, duration: 1.5 });
    }, 4500);
    setTimeout(() => {
      gsap.to(".player7Card1", { y: 235, x: -310, duration: 1.5 });
    }, 4000);
    setTimeout(() => {
      gsap.to(".myPlayingCard2", { y: 290, x: -20, duration: 1.5 });
    }, 3500);
    setTimeout(() => {
      gsap.to(".player2Card2", { y: 235, x: 310, duration: 1.5 });
    }, 3000);
    setTimeout(() => {
      gsap.to(".player3Card2", { y: 110, x: 350, duration: 1.5 });
    }, 2500);
    setTimeout(() => {
      gsap.to(".player4Card2", { y: -60, x: 300, duration: 1.5 });
    }, 2000);
    setTimeout(() => {
      gsap.to(".player5Card2", { y: -60, x: -300, duration: 1.5 });
    }, 1500);
    setTimeout(() => {
      gsap.to(".player6Card2", { y: 110, x: -350, duration: 1.5 });
    }, 1000);
    setTimeout(() => {
      gsap.to(".player7Card2", { y: 255, x: -305, duration: 1.5 });
    }, 500);
    // }
  }, [gameStarted]);
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
    setGameStarted(true);
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
      <div className="betNChips">
        <Chips value={2000}/>
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return bets(index + 1);
        })}
      </div>
      <div className="pokerTable">
        <div className="myPlayingCard1 myPack">
          <Card suit={"diamonds"} value={"1"} />
        </div>
        <div className="myPlayingCard2 myPack">
          <Card suit={"diamonds"} value={"1"} />
        </div>
        <div className="player2Card1 myPack c2-1">
          <Card suit={"back"} />
        </div>
        <div className="player2Card2 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player3Card1 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player3Card2 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player4Card1 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player4Card2 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player5Card1 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player5Card2 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player6Card1 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player6Card2 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player7Card1 myPack">
          <Card suit={"back"} />
        </div>
        <div className="player7Card2 myPack">
          <Card suit={"back"} />
        </div>
        <span id="dealerSeat">Dealer</span>;
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return seats(index + 1);
        })}
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return moneys(index + 1);
        })}
        <div className="package">
          <img id="packageImg" src={packageImg} alt="package IMG" />
        </div>
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

import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
import jwt from "jwt-decode";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const Poker = () => {
  const [roomData, setRoomData, blankGameState] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  const { user_id } = jwt(token);

  const mountRef = useRef(false);
  const gotCardsRef = useRef(false);

  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [raise, setRaise] = useState(false);
  const [raiseBet, setRaiseBet] = useState(undefined);
  const [bet, setBet] = useState(roomData.gameState.blind);
  const [currentBet, setCurrentBet] = useState(0);

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
      socket.off("ready check");
    };
  }, []);

  const confirmRaise = () => {
    setRaise(!raise);
    if (raiseBet) {
      socket.emit("bet placed", {
        auth: token,
        bet: { type: "raise", amount: raiseBet },
      });
    }
  };
  const startingGame = () => {
    setGameStarted(true);
    handCardsAnimation();
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
              value={raiseBet}
              setValue={setRaiseBet}
              myChips={getPlayerChips(user_id)}
              currentBet={roomData.gameState.roundInfo.minBet}
            />
          </div>
          <button
            className="sliderWithValues"
            id="allInBtn"
            onClick={() => setRaiseBet(getPlayerChips(user_id))}
          >
            ALL IN
          </button>
          <button
            className="sliderWithValues"
            onClick={() => confirmRaise()}
            id="confirmBtn"
          >
            Confirm
          </button>
          <p id="sliderValue">{raiseBet}</p>
        </div>
      ) : (
        <></>
      )}
      <div className="timerSpace">
        {roomData.gameState.roundInfo.activePlayer === user_id
          ? renderTimer()
          : undefined}
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
      {user_id === roomData.gameState.roundInfo.activePlayer ? (
        <div className="pokerBtns">
          <button id="raise" onClick={() => setRaise(!raise)}>
            Raise
          </button>
          <button
            id="call"
            onClick={() => {
              console.log("emit on clink");
              socket.emit("bet placed", { auth: token, bet: { type: "call" } });
            }}
          >
            Call
          </button>
          <button
            id="fold"
            onClick={() => {
              alert("placed");
              return socket.emit("bet placed", {
                auth: token,
                bet: { type: "fold" },
              });
            }}
          >
            Fold
          </button>
        </div>
      ) : undefined}
      <div>
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return bets(index + 1, p.id);
        })}
      </div>
      <div className="pokerTable">
        <span id="dealerSeat">Dealer</span>;
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return seats(index + 1);
        })}
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return moneys(index + 1, p.id);
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

      <h1 style={{ position: "absolute", top: "5%", right: "5%" }}>
        POT :{roomData.gameState.pot}
      </h1>
      <h1 style={{ position: "absolute", top: "15%", right: "5%" }}>
        MIN BET :{roomData.gameState.minimumBet}
      </h1>
    </div>
  );
  function bets(i, playerId) {
    let playerBet = roomData.gameState.players.filter((player) => {
      return player.id === playerId;
    })[0];
    playerBet = playerBet ? playerBet["stake"] : "";
    return (
      <p className="bets" id={`bet${i}`}>
        {playerBet}
      </p>
    );
  }
  function seats(i) {
    const player = reorderCenter(roomData.sockData.players)[i - 1];

    return (
      <span id={`seat${i}`} style={{ color: "white" }}>
        <p>{player ? player.name : ""}</p>
        {player.id === roomData.gameState.activePlayer ? (
          <div
            style={{
              width: "25%",
              border: "2px solid yellow",
              borderRadius: "12px",
            }}
          >
            1213123123
          </div>
        ) : (
          ""
        )}
      </span>
    );
  }
  function moneys(i, playerId) {
    return (
      <div id={`money${i}`} className="moneys">
        <p className="moneyNum">{getPlayerChips(playerId)}</p>
      </div>
    );
  }
  function initListeners() {
    socket.on("handing cards", (data) => {
      console.log("Getting cards from server");
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

    socket.on("ready check", () => {
      socket.emit("ready check ack", { roomId: roomData.sockData.roomId });
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

  function getPlayerChips(playerId) {
    let playerChips = roomData.gameState.players.filter((player) => {
      return player.id === playerId;
    })[0];
    playerChips = playerChips ? playerChips["chips"] : "";

    return playerChips;
  }

  function renderTimer() {
    return (
      <CountdownCircleTimer
        isPlaying={true}
        duration={20}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[20, 15, 8, 0]}
        onComplete={() => {
          socket.emit("player done", { playerId: user_id });
        }}
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

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  async function handCardsAnimation() {
    if (!gotCardsRef.current) {
      console.log("handing cards animation");
      await sleep(1500);
      console.log("finished handing cards getting data from server");
      socket.emit("init round");
    }
  }
};
export default Poker;

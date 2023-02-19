import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import { useNavigate } from "react-router-dom";
import {
  RoomContext,
  SocketContext,
  UserContext,
} from "../../../AppContext";
import jwt from "jwt-decode";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Card from "./../../Card";
import packageImg from "../../../../images/deck.webp";
import gsap from "gsap";
import Chips from "../../Chips";
import "./../../../styles/btns.css";

const Poker = () => {
  const [roomData, setRoomData, blankGameState] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const { token, myProfile } = useContext(UserContext);
  const { user_id } = jwt(token);

  const mountRef = useRef(false);
  const gotCardsRef = useRef(false);

  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    myProfile();
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
  const [raiseBet, setRaiseBet] = useState(undefined);
  const [clockKey, setClockKey] = useState(0);
  const [currentBet, setCurrentBet] = useState(0);

  useEffect(() => {
    initListeners();

    return () => {
      if (mountRef.current) {
        socket.emit("bet placed", {
          auth: token,
          bet: { type: "fold" },
        });
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

  useEffect(() => {
    if (roomData.gameState.gameStage === "showdown") {
      // alert("wow u all won cause we didnt calculate the winner function");
    }
  }, [roomData]);

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
              currentBet={roomData.gameState.blind}
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
          onClick={() => {
            console.log('leaving room clicked buttinb')
            socket.emit("bet placed", {
              auth: token,
              bet: { type: "fold" },
            });
            navigate("/");
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
          {roomData.gameState.minimumBet !== 0 ? (
            <button
              id="call"
              onClick={() => {
                console.log("emit on clink");
                socket.emit("bet placed", {
                  auth: token,
                  bet: { type: "call" },
                });
              }}
            >
              Call
            </button>
          ) : (
            <button
              id="call"
              onClick={() => {
                console.log("emit on clink");
                socket.emit("bet placed", {
                  auth: token,
                  bet: { type: "check" },
                });
              }}
            >
              Check
            </button>
          )}
          <button
            id="fold"
            onClick={() => {
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


          return moneys(index + 1, p.id);

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

      <h1 style={{ position: "absolute", top: "5%", right: "5%" }}>
        POT :{roomData.gameState.pot}
      </h1>
      <h1 style={{ position: "absolute", top: "15%", right: "5%" }}>
        MIN BET :{roomData.gameState.minimumBet}
      </h1>
      <h1 style={{ position: "absolute", top: "5%", right: "40%" }}>
        {roomData.gameState.gameStage}
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
        {player.id === roomData.gameState.roundInfo.activePlayer ? (
          <div
            style={{
              width: "25%",
              border: "2px solid yellow",
              borderRadius: "12px",
            }}
          >
            1
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
        setClockKey((prev) => prev + 1);
        return oldState;
      });
    });
    socket.on("handing cards", (data) => {
      console.log("Getting cards from server");
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
      socket.emit("bet placed", {
        auth: token,
        bet: { type: "fold" },
      });
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
      socket.emit("bet placed", {
        auth: token,
        bet: { type: "fold" },
      });
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
        key={clockKey}
        isPlaying={true}
        duration={20}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[20, 15, 8, 0]}
        onComplete={() => {
          socket.emit("bet placed", {
            auth: token,
            bet: { type: "fold" },
          });
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

import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import { useNavigate } from "react-router-dom";
import { RoomContext, SocketContext, UserContext } from "../../../AppContext";
import jwt from "jwt-decode";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Card from "./../../Card";
import packageImg from "../../../../images/deck.webp";
import "./../../../styles/btns.css";
import cardAnimation from "./Animation/cardAnimation";
import CardComp from "../../CardComp";
import Chips from "../../Chips";

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
  }, [gameStarted]);
  const [raise, setRaise] = useState(false);
  const [newGame, setNewGame] = useState(false);
  const [raiseBet, setRaiseBet] = useState(undefined);
  const [clockKey, setClockKey] = useState(0);
  // const [currentBet, setCurrentBet] = useState(0);

  useEffect(() => {
    initListeners();
    console.log(
      "WHAT DAY OIS IT TODAT",
      roomData.gameState.gameStage.length > 0
    );
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

  useEffect(() => {
    if (roomData.gameState.gameStage === "showdown") {
      alert("wow u all won cause we didnt calculate the winner function");
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
        className="custom-btn btn-15B"
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
            className="custom-btn btn-11"
              onClick={(e) => startingGame(e)}
              disabled={roomData.sockData.players.length < 2}
            >
              Start game {roomData.sockData.players.length}/7
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
      <div>
        {reorderCenter(roomData.sockData.players).map((p, index) => {
          return chips(index + 1, p.id);
        })}
      </div>
      <div className="pokerTable">
        {newGame ? (
          <>
            <div className="myPlayingCard1 myPack">
              <CardComp
                suit={getMyOwnCards()[0].suit}
                value={getMyOwnCards()[0].value}
              />
            </div>
            <div className="myPlayingCard2 myPack">
              <CardComp
                suit={getMyOwnCards()[1].suit}
                value={getMyOwnCards()[1].value}
              />
            </div>
          </>
        ) : (
          <></>
        )}
        {newGame ? (
          <>
            <div className="player2Card1 myPack">
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
          </>
        ) : (
          <></>
        )}
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
          <div id="c1Place">
            {roomData.gameState.community[0] ? (
              <CardComp
                value={roomData.gameState.community[0].value}
                suit={roomData.gameState.community[0].suit}
              />
            ) : (
              <></>
            )}
          </div>
          <div id="c2Place">
            {roomData.gameState.community[1] ? (
              <CardComp
                value={roomData.gameState.community[1].value}
                suit={roomData.gameState.community[1].suit}
              />
            ) : (
              <></>
            )}
          </div>
          <div id="c3Place">
            {roomData.gameState.community[2] ? (
              <CardComp
                value={roomData.gameState.community[2].value}
                suit={roomData.gameState.community[2].suit}
              />
            ) : (
              <></>
            )}
          </div>
          <div id="c4Place">
            {roomData.gameState.community[3] ? (
              <CardComp
                value={roomData.gameState.community[3].value}
                suit={roomData.gameState.community[3].suit}
              />
            ) : (
              <></>
            )}
          </div>
          <div id="c5Place">
            {roomData.gameState.community[4] ? (
              <CardComp
                value={roomData.gameState.community[4].value}
                suit={roomData.gameState.community[4].suit}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* <h1 style={{ position: "absolute", top: "5%", right: "5%" }}>
        POT :{roomData.gameState.pot}
      </h1>
      <h1 style={{ position: "absolute", top: "15%", right: "5%" }}>
        MIN BET :{roomData.gameState.minimumBet}
      </h1>
      <h1 style={{ position: "absolute", top: "5%", right: "40%" }}>
        {roomData.gameState.gameStage}
      </h1> */}
    </div>
  );
  function bets(i, playerId) {
    let playerBet = roomData.gameState.players.filter((player) => {
      return player.id === playerId;
    })[0];
    playerBet = playerBet ? playerBet["stake"] : "";
    return (
      <div>
        <p id={`bet${i}`} className="bets">
          {playerBet}
        </p>
      </div>
    );
  }
  function chips(i, playerId) {
    let playerData = roomData.gameState.players.filter((player) => {
      return player.id === playerId;
    })[0];
    const chips = playerData ? playerData.chips : <></>;
    return (
      <div className={`playerChips${i}`}>
        <Chips value={1000} />
      </div>
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
      console.log("RUN ANIMATION FOR EACH PLAYER");
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
      // setCard1(
      //   roomData.gameState.players.filter((player) => {
      //     return player.id === user_id;
      //   })[0].cards[0]
      // );
      // setCard2(
      //   roomData.gameState.players.filter((player) => {
      //     return player.id === user_id;
      //   })[0].cards[1]
      // );
      // console.log(card1)
      // console.log(card2)
      setNewGame(true);
      setTimeout(() => {
      cardAnimation(roomData.sockData.players, reorderCenter);
      }, 1000);
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

  function getMyOwnCards() {
    const decoded = jwt(token);
    const myIndex = roomData.gameState.players.findIndex((p) => {
      console.log(p.id);
      console.log(decoded.user_id);
      return p.id === decoded.user_id;
    });
    if (myIndex > -1) {
      console.log(roomData.gameState.players[myIndex]);
      return roomData.gameState.players[myIndex].cards;
    }

    return [
      { suit: "1000", value: "1000" },
      { suit: "1000", value: "1000" },
    ];
  }
};
export default Poker;

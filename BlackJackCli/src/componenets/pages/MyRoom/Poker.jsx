import React, { useState, useEffect, useContext, useRef } from "react";
import MySlider from "./TableComps/Slider";
import "./style/poker.css";
import Timer from "./TableComps/Timer";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
import jwt from "jwt-decode";

const Poker = () => {
  const [roomData, setRoomData] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  const { user_id } = jwt(token);

  const mountRef = useRef(false);

  const navigate = useNavigate();
  const [raise, setRaise] = useState(false);
  const [value, setValue] = useState(0);
  const [timer, setTimer] = useState(false);
  const [bet, setBet] = useState(roomData.gameState.blind);
  const [currentBet, setCurrentBet] = useState(0);
  const {
    path,
    pathLength,
    stroke,
    strokeDashoffset,
    remainingTime,
    elapsedTime,
    size,
    strokeWidth,
  } = useCountdown({ isPlaying: timer, duration: 30, colors: "#abc" });

  useEffect(() => {
    socket.on("handing cards", (data) => {
      console.log("get hand");
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

    return () => {
      if (mountRef.current) {
        socket.emit("leave room", {
          roomId: roomData.sockData.roomId,
          auth: token,
        });

        setRoomData((prev) => {
          const oldState = { ...prev };
          oldState.gameState = undefined;
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
  return (
    <div className="pokerSpace">
      {raise ? (
        <div>
          <div className="sliderSpace sliderWithValues1">
            <MySlider
              value={value}
              setValue={setValue}
              myChips={myChips}
              currentBet={currentBet}
            />
          </div>
          <button
            className="sliderWithValues"
            id="allInBtn"
            onClick={() => setValue(myChips)}
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
        <Timer timer={timer} />
      </div>
      <div className="leftSide">
        <button
          id="exitGame"
          onClick={() => {
            navigate("/");
            setRoomData((prev) => {
              const oldState = { ...prev };
              oldState.gameState = undefined;
              oldState.isConnected = false;
              return oldState;
            });
          }}
        >
          Casino menu
        </button>
        <div>
          <h3 id="roomName">room: {roomData.sockData.roomName}</h3>
        </div>
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
        {roomData.sockData.players.map((p, index) => {
          return bets(index + 1);
        })}
      </div>
      <div className="pokerTable">
        <span id="dealerSeat"></span>;
        {roomData.sockData.players.map((p, index) => {
          return seats(index + 1);
        })}
        {roomData.sockData.players.map((p, index) => {
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
    return <span id={`seat${i}`}>{roomData.sockData.players[i-1].name}</span>;
  }
  function moneys(i) {
    return (
      <div id={`money${i}`} className="moneys">
        <p className="moneyNum"></p>
      </div>
    );
  }
};
export default Poker;

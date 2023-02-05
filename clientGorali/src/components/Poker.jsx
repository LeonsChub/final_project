import React, { useState, useEffect } from "react";
import MySlider from "./context/Slider";
import "./css/poker.css";
import Timer from "./context/Timer";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";

const Poker = () => {
  const navigate = useNavigate();
  const num = 0;
  const [blind, setBlind] = useState(5);
  const [minBet, setMinBet] = useState(blind);
  const [raise, setRaise] = useState(false);
  const [myChips, setMyChips] = useState(5000);
  const [value, setValue] = useState(0);
  const [timer, setTimer] = useState(false);
  const [bet, setBet] = useState(0);
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
  useEffect(() => {}, [timer]);
  const handleBet = async () => {
    setCurrentBet(value);
    setBet(value);
    setRaise(!raise);
  };
  const handleFold = async (e) => {
    e.preventDefault();
    // socket.emit('player folded',{playerData:{id:}})
  };
  const handleCall = async (e) => {
    e.preventDefault();
    // socket.emit('player called',{playerData:{id:}})
  };
  const handleRaise = async (e) => {
    e.preventDefault();
    setRaise(!raise);
    setMinBet(minBet + value);
    // socket.emit('player raised',{playerData:{id:, minBet:}})
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
        <button id="exitGame" onClick={() => navigate("/main")}>
          Casino menu
        </button>
      </div>
      <div className="blindSpace">
        <p id="blind">Blind: {blind}</p>
      </div>
      <div className="pokerBtns">
        <button id="raise" onClick={(e) => handleRaise(e)}>
          Raise
        </button>
        <button onClick={(e) => handleCall(e)} id="call">
          Call
        </button>
        <button id="fold" onClick={(e) => handleFold(e)}>
          Fold
        </button>
      </div>
      <div>
        <p className="bets" id="bet1">
          {num + blind * 0.5}
        </p>
        <p className="bets" id="bet2">
          {num + blind}
        </p>
        <p className="bets" id="bet3">
          {num}
        </p>
        <p className="bets" id="bet4">
          {num}
        </p>
        <p className="bets" id="bet5">
          {num}
        </p>
        <p className="bets" id="bet6">
          {num}
        </p>
        <p className="bets" id="bet7">
          {num}
        </p>
      </div>
      <div className="pokerTable">
        <span className="seats" id="seat1"></span>
        <span className="seats" id="seat2"></span>
        <span className="seats" id="seat3"></span>
        <span className="seats" id="seat4"></span>
        <span className="seats" id="seat5"></span>
        <span className="seats" id="seat6"></span>
        <span className="seats" id="seat7"></span>
        <span className="seats" id="seat8"></span>
        <div id="money1" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money2" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money3" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money4" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money5" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money6" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money7" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
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
};

export default Poker;

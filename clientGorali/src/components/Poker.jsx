import React, { useState, useEffect } from "react";
import MySlider from "./context/Slider";
import "./css/poker.css";
import Timer from "./context/Timer";
import { useCountdown } from "react-countdown-circle-timer";
import { useNavigate } from "react-router-dom";
import { Slider } from "rc-slider";

const Poker = () => {
  const num = 0;
  const navigate = useNavigate();
  const [blind, setBlind] = useState(5);
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
        <button id="raise" onClick={() => setRaise(!raise)}>
          Raise
        </button>
        <button onClick={() => setTimer(!timer)} id="call">
          Call
        </button>
        <button id="fold">Fold</button>
      </div>
      <div>
        <p className="bets" id="bet1">
          {bet}
        </p>
        <p className="bets" id="bet2">
          {num}
        </p>
        <p className="bets" id="bet3">
          {num}
        </p>
        <p className="bets" id="bet4">
          {num}
        </p>
        <p className="bets" id="bet6">
          {num}
        </p>
        <p className="bets" id="bet7">
          {num}
        </p>
        <p className="bets" id="bet8">
          {num}
        </p>
      </div>
      <div className="pokerTable">
        <span id="seat1"></span>
        <span id="seat2"></span>
        <span id="seat3"></span>
        <span id="seat4"></span>
        <span id="seat5"></span>
        <span id="seat6"></span>
        <span id="seat7"></span>
        <span id="seat8"></span>
        <div id="money1" className="moneys">
          <p className="moneyNum">{myChips}</p>
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
        <div id="money6" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money7" className="moneys">
          <p className="moneyNum">{num}</p>
        </div>
        <div id="money8" className="moneys">
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

import React, { useState, useEffect, useContext } from "react";
import "./style/machines.css";
import chipIMG from "../../../../images/chip2.png";
import renderSlot from "./../../Slot";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../AppContext";
import Chips from "./../../Chips";

const Machines = () => {
  const navigate = useNavigate();
  const [roller1, setRoller1] = useState("black");
  const [roller2, setRoller2] = useState("red");
  const [roller3, setRoller3] = useState("blue");
  const [animated1, setAnimated1] = useState("");
  const [animated2, setAnimated2] = useState("");
  const [animated3, setAnimated3] = useState("");
  const [bid, setBid] = useState(0);
  const [result, setResult] = useState("LETS PLAY!");
  const { chips, setChips, getChips, postChips } = useContext(UserContext);

  const handleRestults = () => {
    if (bid === 0) {
      alert("Cannot play without bidding");
      return;
    }
    setChips(chips - bid);
    setAnimated1("slotAnimated1");
    setAnimated2("slotAnimated2");
    setAnimated3("slotAnimated3");
    setTimeout(() => {
      const newRoller1 = renderSlot();
      const newRoller2 = renderSlot();
      const newRoller3 = renderSlot();
      setAnimated1("slotAnimated1");
      setAnimated2("slotAnimated2");
      setAnimated3("slotAnimated3");
      setRoller1(newRoller1);
      setRoller2(newRoller2);
      setRoller3(newRoller3);
      if (newRoller1 === newRoller2 && newRoller1 === newRoller3) {
        setResult("BIG WIN - 3/3");
        const win = bid * 3;
        const result = chips + win - bid;
        postChips(result);
        setAnimated1("");
        setAnimated2("");
        setAnimated3("");
        getChips();
        setBid(win);
        return;
      } else if (
        (newRoller1 === newRoller2 && newRoller1 !== newRoller3) ||
        (newRoller1 === newRoller3 && newRoller1 !== newRoller2) ||
        (newRoller2 === newRoller3 && newRoller1 !== newRoller2)
      ) {
        setResult("TIE - 2/3");
        setAnimated1("");
        setAnimated2("");
        setAnimated3("");
        getChips();
        return;
      } else {
        setResult("LOSE");
        postChips(chips - bid);
        setAnimated1("");
        setAnimated2("");
        setAnimated3("");
        getChips();
        setBid(0);
        return;
      }
    }, 4000);
  };
  const handleChips = (num) => {
    if (num == 1 && bid >= 0 && bid <= chips - 100) {
      setBid(bid + 100);
    } else if (num == 2 && bid >= 100) {
      setBid(bid - 100);
    }
  };
  useEffect(() => {
    getChips();
  }, []);
  useEffect(() => {}, [roller1, roller2, roller3, result, bid]);
  return (
    <div className="machinesPage">
      <div className="machineNav">
        <button onClick={() => navigate("/")} className="custom-btn btn-15">
          Leave Game
        </button>
      </div>
      <div className="chipsWallet">
        My chips: {chips}
        <img id="walletImg" src={chipIMG} alt="chip" />
      </div>
      <div className="machineTitle">
        <span>$ Slot Machine $</span>
      </div>
      <div className="machinesSpace">
        <div className="machine">
          <div id="displayResult">
            <span id="machineResult">{result}</span>
            <span id="machineChips">{bid} CHIPS</span>
          </div>
          <div className="rollers">
            <div className="roller">
              <div
                className={`slot ${animated1}`}
                style={{ backgroundColor: roller1 }}
              ></div>
            </div>
            <div className="roller">
              <div
                className={`slot ${animated2}`}
                style={{ backgroundColor: roller2 }}
              ></div>
            </div>
            <div className="roller">
              <div
                className={`slot ${animated3}`}
                style={{ backgroundColor: roller3 }}
              ></div>
            </div>
          </div>
          <div className="machineBtnSpace">
            <button
              onClick={() => handleRestults()}
              className="custom-btn btn-5"
            >
              <span>START</span>
            </button>
            <div className="upDownBtns">
              <button
                className="chipBtn custom-btn btn-1"
                onClick={() => handleChips(1)}
              >
                More
              </button>
              <button
                className="chipBtn custom-btn btn-1"
                onClick={() => handleChips(2)}
              >
                Less
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Machines;

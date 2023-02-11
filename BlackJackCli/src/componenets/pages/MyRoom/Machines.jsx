import React, { useState, useEffect, useContext } from "react";
import "./style/machines.css";
import chipIMG from "../../../../images/chip2.png";
import renderSlot from "./../../Slot";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../AppContext";
import { apiService } from "./../../../ApiService/ApiService";

const Machines = () => {
  const navigate = useNavigate();
  const [roller1, setRoller1] = useState("black");
  const [roller2, setRoller2] = useState("red");
  const [roller3, setRoller3] = useState("blue");
  const [animated1, setAnimated1] = useState("");
  const [animated2, setAnimated2] = useState("");
  const [animated3, setAnimated3] = useState("");
  const [chipsValue, setChipsValue] = useState(0);
  const [result, setResult] = useState("LETS PLAY!");
  const { chips, setChips ,getChips} = useContext(UserContext);
  const handleRestults = () => {
    setChips(chips - chipsValue);
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
        setChipsValue(chipsValue * 3);
        setChipsValue(chips + chips);
      } else if (
        (newRoller1 === newRoller2 && newRoller1 !== newRoller3) ||
        (newRoller1 === newRoller3 && newRoller1 !== newRoller2) ||
        (newRoller2 === newRoller3 && newRoller1 !== newRoller2)
      ) {
        setResult("WIN - 2/3");
        setChipsValue(chipsValue * 2);
        setChipsValue(chips + chipsValue);
      } else {
        setResult("LOSE");
        setChipsValue(0);
      }
      setAnimated1("");
      setAnimated2("");
      setAnimated3("");
    }, 4000);
  };
  const handleChips = (num) => {
    if (num == 1 && chipsValue >= 0 && chipsValue <= chips - 100) {
      setChipsValue(chipsValue + 100);
    } else if (num == 2 && chipsValue >= 100) {
      setChipsValue(chipsValue - 100);
    }
  };
  useEffect(() => {
   getChips()
  }, []);
  useEffect(() => {}, [roller1, roller2, roller3, result, chipsValue]);
  return (
    <div className="machinesPage">
      <div className="machineNav">
        <button onClick={() => navigate("/")} className="custom-btn btn-13">
          Leave game
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
            <span id="machineChips">{chipsValue} CHIPS</span>
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

import React from "react";
import D1 from "../../images/cards/AD.svg";
import D2 from "../../images/cards/2D.svg";
import D3 from "../../images/cards/3D.svg";
import D4 from "../../images/cards/4D.svg";
import D5 from "../../images/cards/5D.svg";
import D6 from "../../images/cards/6D.svg";
import D7 from "../../images/cards/7D.svg";
import D8 from "../../images/cards/8D.svg";
import D9 from "../../images/cards/9D.svg";
import D10 from "../../images/cards/TD.svg";
import DJ from "../../images/cards/JD.svg";
import DQ from "../../images/cards/QD.svg";
import DK from "../../images/cards/KD.svg";
import S1 from "../../images/cards/AS.svg";
import S2 from "../../images/cards/2S.svg";
import S3 from "../../images/cards/3S.svg";
import S4 from "../../images/cards/4S.svg";
import S5 from "../../images/cards/5S.svg";
import S6 from "../../images/cards/6S.svg";
import S7 from "../../images/cards/7S.svg";
import S8 from "../../images/cards/8S.svg";
import S9 from "../../images/cards/9S.svg";
import S10 from "../../images/cards/TS.svg";
import SJ from "../../images/cards/JS.svg";
import SQ from "../../images/cards/QS.svg";
import SK from "../../images/cards/KS.svg";
import C1 from "../../images/cards/AC.svg";
import C2 from "../../images/cards/2C.svg";
import C3 from "../../images/cards/3C.svg";
import C4 from "../../images/cards/4C.svg";
import C5 from "../../images/cards/5C.svg";
import C6 from "../../images/cards/6C.svg";
import C7 from "../../images/cards/7C.svg";
import C8 from "../../images/cards/8C.svg";
import C9 from "../../images/cards/9C.svg";
import C10 from "../../images/cards/TC.svg";
import CJ from "../../images/cards/JC.svg";
import CQ from "../../images/cards/QC.svg";
import CK from "../../images/cards/KC.svg";
import H1 from "../../images/cards/AH.svg";
import H2 from "../../images/cards/2H.svg";
import H3 from "../../images/cards/3H.svg";
import H4 from "../../images/cards/4H.svg";
import H5 from "../../images/cards/5H.svg";
import H6 from "../../images/cards/6H.svg";
import H7 from "../../images/cards/7H.svg";
import H8 from "../../images/cards/8H.svg";
import H9 from "../../images/cards/9H.svg";
import H10 from "../../images/cards/TH.svg";
import HJ from "../../images/cards/JH.svg";
import HQ from "../../images/cards/QH.svg";
import HK from "../../images/cards/KH.svg";
import "./card.css";
const CardComp = ({ suit, value }) => {
  console.log(value);
  console.log(suit);
  let myCard = "";
  if (suit == "diamonds") {
    switch (value) {
      case 1:
        myCard = D1;
        break;
      case 2:
        myCard = D2;
        break;
      case 3:
        myCard = D3;
        break;
      case 4:
        myCard = D4;
        break;
      case 5:
        myCard = D5;
        break;
      case 6:
        myCard = D6;
        break;
      case 7:
        myCard = D7;
        break;
      case 8:
        myCard = D8;
        break;
      case 9:
        myCard = D9;
        break;
      case 10:
        myCard = D10;
        break;
      case "J":
        myCard = DJ;
        break;
      case "Q":
        myCard = DQ;
        break;
      case "K":
        myCard = DK;
        break;
      default:
        break;
    }
  }
  if (suit == "spades") {
    switch (value) {
      case 1:
        myCard = S1;
        break;
      case 2:
        myCard = S2;
        break;
      case 3:
        myCard = S3;
        break;
      case 4:
        myCard = S4;
        break;
      case 5:
        myCard = S5;
        break;
      case 6:
        myCard = S6;
        break;
      case 7:
        myCard = S7;
        break;
      case 8:
        myCard = S8;
        break;
      case 9:
        myCard = S9;
        break;
      case 10:
        myCard = S10;
        break;
      case "J":
        myCard = SJ;
        break;
      case "Q":
        myCard = SQ;
        break;
      case "K":
        myCard = SK;
        break;
      default:
        break;
    }
  }
  if (suit == "clubs") {
    switch (value) {
      case 1:
        myCard = C1;
        break;
      case 2:
        myCard = C2;
        break;
      case 3:
        myCard = C3;
        break;
      case 4:
        myCard = C4;
        break;
      case 5:
        myCard = C5;
        break;
      case 6:
        myCard = C6;
        break;
      case 7:
        myCard = C7;
        break;
      case 8:
        myCard = C8;
        break;
      case 9:
        myCard = C9;
        break;
      case 10:
        myCard = C10;
        break;
      case "J":
        myCard = CJ;
        break;
      case "Q":
        myCard = CQ;
        break;
      case "K":
        myCard = CK;
        break;
      default:
        break;
    }
  }
  if (suit == "hearts") {
    switch (value) {
      case 1:
        myCard = H1;
        break;
      case 2:
        myCard = H2;
        break;
      case 3:
        myCard = H3;
        break;
      case 4:
        myCard = H4;
        break;
      case 5:
        myCard = H5;
        break;
      case 6:
        myCard = H6;
        break;
      case 7:
        myCard = H7;
        break;
      case 8:
        myCard = H8;
        break;
      case 9:
        myCard = H9;
        break;
      case 10:
        myCard = H10;
        break;
      case "J":
        myCard = HJ;
        break;
      case "Q":
        myCard = HQ;
        break;
      case "K":
        myCard = HK;
        break;
      default:
        break;
    }
  }
  return (
    <div className="cardContainer">
      <img style={{width:'100%'}} src={myCard} alt="cardImg" />
    </div>
  );
};
export default CardComp;

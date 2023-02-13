import React from "react";
import spadeImg from "../../images/spade.png";
import heartImg from "../../images/heart.png";
import diamondImg from "../../images/diamond.png";
import clubImg from "../../images/club.png";
import packageImg from "../../images/deck.webp";
import renderCardCenter from "./CardCenter";

const Card = ({ suit, value }) => {
  function renderSuite() {
    switch (suit) {
      case "spades":
        return <img style={{ width: "25%" }} src={spadeImg} alt="" />;

      case "hearts":
        return <img style={{ width: "25%" }} src={heartImg} alt="" />;

      case "diamonds":
        return <img style={{ width: "25%" }} src={diamondImg} alt="" />;
      case "clubs":
        return <img style={{ width: "25%" }} src={clubImg} alt="" />;
      case "back":
        return (
          <img
            style={{ width: "30px", height: "40px" }}
            src={packageImg}
            alt=""
          />
        );

      default:
        break;
    }
  }
  return (
    <div
      className="cardContainer"
      style={{
        color: suit === "hearts" || suit === "diamonds" ? "red" : "black",
      }}
    >
      <div className="cardTop">
        <span className="cardValue1">{value}</span>
        <div className="cardSuit1">{renderSuite()}</div>
      </div>
      <div>{renderCardCenter(value, renderSuite)}</div>
      <div className="cardBottom">
        <div className="cardSuit2">{renderSuite()}</div>
      <span className="cardValue2">{value}</span>
      </div>
    </div>
  );
};

export default Card;

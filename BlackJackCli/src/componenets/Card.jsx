import React from "react";
import spadeImg from "../../images/spade.png";
import heartImg from "../../images/heart.png";
import diamondImg from "../../images/diamond.png";
import clubImg from "../../images/club.png";
import packageImg from "../../images/deck.webp";

const Card = ({ suit, value }) => {
  function renderSuite() {
    switch (suit) {
      case "spades":
        return <img style={{ width: "30px" }} src={spadeImg} alt="" />;

      case "hearts":
        return <img style={{ width: "30px" }} src={heartImg} alt="" />;

      case "diamonds":
        return <img style={{ width: "10px" }} src={diamondImg} alt="" />;
      case "clubs":
        return <img style={{ width: "30px" }} src={clubImg} alt="" />;
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
      style={{
        width: "100%",
        height: "100%",
        // backgroundColor: "white",
        // border: "1px solid black",
        textAlign: "center",
        display: "flex",
        flexDirection:'column',
        zIndex: "999",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: suit === "hearts" || suit === "diamonds" ? "red" : "black",
        }}
      >
        {value}
      </div>
      <div>{renderSuite()}</div>
    </div>
  );
};

export default Card;

import React from "react";
import spadeImg from "../../images/spade.png";
import heartImg from "../../images/heart.png";
import diamondImg from "../../images/diamond.png";
import clubImg from "../../images/club.png";

const Card = ({ suit, value }) => {
  function renderSuite() {
    switch (suit) {
      case "spades":
        return <img style={{ width: "30px" }} src={spadeImg} alt="" />;
        break;

      case "hearts":
        return <img style={{ width: "30px" }} src={heartImg} alt="" />;
        break;

      case "diamonds":
        return <img style={{ width: "30px" }} src={diamondImg} alt="" />;
        break;
      case "clubs":
        return <img style={{ width: "30px" }} src={clubImg} alt="" />;
        break;

      default:
        break;
    }
  }
  return (
    <div
      style={{
        width: "100px",
        height: "150px",
        backgroundColor: "white",
        border: "1px solid black",
        textAlign: "center",
        display: "inline-block",
        marginRight: "10px",
        paddingTop: "20px",
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

import React from "react";
import { useNavigate } from "react-router-dom";

const HTPSlot = () => {
  const navigate = useNavigate();
  return (
    <div className="htpSpace">
      <div className="htpNav">
        <button onClick={() => navigate("/")} className="custom-btn btn-15">
          Back to Games Menu
        </button>
      </div>
      <div className="htpTitle">
        <h2>How to play Slot Game?</h2>
      </div>
      <div className="htpInfo">
        <p>
          Welcome to the exciting world of online slot games! In this thrilling
          game of chance, players spin the reels in hopes of hitting the jackpot
          and winning big. With a wide variety of themes, graphics, and bonus
          features, there is a slot game for everyone. Simply select your
          desired game, adjust your bet size, and hit the spin button. Watch as
          the reels come to life and potentially land a winning combination!
          With the potential for massive payouts, it's no wonder why slots are
          one of the most popular casino games around. So sit back, relax, and
          get ready to experience the thrill of the spin!
        </p>
      </div>
    </div>
  );
};

export default HTPSlot;

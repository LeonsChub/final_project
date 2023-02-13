import React from 'react';
import { useNavigate } from 'react-router-dom';


const HTPPoker = () => {
    const navigate = useNavigate() 
    return (
        <div className="htpSpace">
        <div className="htpNav">
          <button onClick={()=>navigate('/')} className="custom-btn btn-15">Back to Games Menu</button>
        </div>
        <div className="htpTitle">
          <h2>How to play Poker?</h2>
        </div>
        <div className="htpInfo">
          <p>
            Welcome to the exciting world of Texas Hold'em poker! In this classic
            game of skill and luck, up to seven players can connect to the same
            virtual table on our website. The objective is to create the best
            possible five-card hand by combining the two cards dealt to you
            face-down (hole cards) with the five community cards dealt face-up in
            the center of the table. To ensure a fair and equal playing field, all
            players will start with 1000 chips at the beginning of the game. Only
            the host has the authority to announce the start of a hand, and the
            action then moves clockwise around the table. So, grab your virtual
            chips, hone your skills, and get ready for an unforgettable gaming
            experience!
          </p>
        </div>
      </div>
    );
}

export default HTPPoker;

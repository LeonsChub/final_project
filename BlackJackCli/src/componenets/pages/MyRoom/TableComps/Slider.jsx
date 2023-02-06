import React, { useState } from "react";
import "../style/slider.css";

const MySlider = (props) => {
  const { value, setValue, myChips, currentBet } = props;
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <div>
        <input
          type="range"
          min={currentBet}
          max={myChips}
          value={value}
          onChange={handleChange}
          className="slider"
        />
      </div>
    </div>
  );
};

export default MySlider;

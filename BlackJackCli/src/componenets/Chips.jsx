import React from "react";

const Chips = ({ value }) => {
  function renderChips(value) {
    switch (true) {
      case value <= 10:
        return "white";
      case value <= 100:
        return "whiteBlue";
      case value <= 1000:
        return "whiteBlueGreen";
      case value <= 10000:
        return "whiteBlueGreenRed";
      case value <= 100000:
        return "whiteBlueGreenRedBlack";
      default:
        break;
    }
  }
  
  console.log(renderChips(value))
  switch (renderChips(value)) {
    case "white":
      return (
        <div className="cont">
          <div className="chipsCollection">
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
            </div>
          </div>
        </div>
      );
    case "whiteBlue":
      return (
        <div className="cont">
          <div className="chipsCollection">
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
            </div>
          </div>
        </div>
      );
    case "whiteBlueGreen":
      return (
        <div className="cont">
          <div className="chipsCollection">
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
            </div>
          </div>
        </div>
      );
    case "whiteBlueGreenRed":
      return (
        <div className="cont">
          <div className="chipsCollection">
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "20%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "18%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "16%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
            </div>
          </div>
        </div>
      );
    case "whiteBlueGreenRedBlack":
      return (
        <div className="cont">
          <div className="chipsCollection">
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inWhite"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inBlue"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "20%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "18%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
              <span className="white" style={{ top: "16%", zIndex: 999 }}>
                <span className="inGreen"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
              <span className="white" style={{ top: "20%", zIndex: 999 }}>
                <span className="inRed"></span>
              </span>
            </div>
            <div className="whites">
              <span className="white" style={{ top: "42%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "40%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "38%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "36%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "34%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "32%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "30%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "28%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "26%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "24%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "22%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "20%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "18%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "16%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "14%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
              <span className="white" style={{ top: "12%", zIndex: 999 }}>
                <span className="inBlack"></span>
              </span>
            </div>
          </div>
        </div>
      );
    default:
      break;
  }
};
export default Chips;

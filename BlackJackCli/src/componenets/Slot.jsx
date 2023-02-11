// Slot.js
const renderSlot = () => {
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const value = getRandomIntInclusive(1, 6);
  switch (value) {
    case 1:
      return "black";
    case 2:
      return "blue";
    case 3:
      return "red";
    case 4:
      return "green";
    case 5:
      return "yellow";
    case 6:
      return "purple";

    default:
      break;
  }
};
export default renderSlot;

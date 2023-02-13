import './card.css'
const renderCardCenter = (value, cb) => {
  let x = "";
  switch (value) {
    case "a":
      x = "familya";
      break;
    case 2:
      x = "family2";

      break;
    case 3:
      x = "family3";

      break;
    case 4:
      x = "family4";

      break;
    case 5:
      x = "family5";

      break;
    case 6:
      x = "family6";

      break;
    case 7:
      x = "family7";

      break;
    case 8:
      x = "family8";

      break;
    case 9:
      x = "family9";

      break;
    case 10:
      x = "1family0";

      break;
    case "j":
      x = "familyj";

      break;
    case "q":
      x = "familyq";

      break;
    case "k":
      x = "familyk";

      break;

    default:
      break;
  }
  return (
    <div className={x}>{Array.from({ length: value }).map((_, i) => cb())}</div>
  );
};
export default renderCardCenter;

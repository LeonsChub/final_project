import gsap from "gsap";
import "../style/poker.css";

export default function cardAnimation(players, cb) {
  const newArr = cb(players).map((arr) => Boolean(arr));
  newArr.forEach((element, index) => {
    if (element) {
      switch (index) {
        case 0:
          gsap.to(".myPlayingCard1", { y: 290, x: -20, duration: 1.5 });
          gsap.to(".myPlayingCard2", { y: 290, x: -20, duration: 1.5 });
          break;
        case 1:
            gsap.to(".player2Card1", { y: 255, x: 305, duration: 1.5 });
            gsap.to(".player2Card2", { y: 235, x: 310, duration: 1.5 });
          break;
        case 2:
            gsap.to(".player3Card1", { y: 95, x: 345, duration: 1.5 });
            gsap.to(".player3Card2", { y: 110, x: 350, duration: 1.5 });
          break;
        case 3:
            gsap.to(".player4Card1", { y: -70, x: 300, duration: 1.5 });
            gsap.to(".player4Card2", { y: -60, x: 300, duration: 1.5 });
          break;
        case 4:
            gsap.to(".player5Card1", { y: -70, x: -300, duration: 1.5 });
            gsap.to(".player5Card2", { y: -60, x: -300, duration: 1.5 });
          break;
        case 5:
            gsap.to(".player6Card1", { y: 95, x: -345, duration: 1.5 });
            gsap.to(".player6Card2", { y: 110, x: -350, duration: 1.5 });
          break;
        case 6:
            gsap.to(".player7Card1", { y: 235, x: -310, duration: 1.5 });
            gsap.to(".player7Card2", { y: 255, x: -305, duration: 1.5 });
          break;
        default:
          break;
      }
    }
  });
}

import { CountdownCircleTimer } from "react-countdown-circle-timer";
const Timer = (timer) => (
  <CountdownCircleTimer
    isPlaying={timer}
    duration={30}
    colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
    colorsTime={[30, 15, 10, 0]}
  >
    {({ remainingTime }) => remainingTime}
  </CountdownCircleTimer>
);

export default Timer;

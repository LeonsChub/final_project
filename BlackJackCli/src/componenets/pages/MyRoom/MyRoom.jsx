import React, { useContext } from "react";
import { RoomContext } from "../../../AppContext";
import RoomCard from "../RoomBrowser/RoomCard";
import PlayRoom from "./PlayRoom";
import Poker from "./Poker";

function MyRoom() {
  const [roomData] = useContext(RoomContext);

  return (
    <div>
      {!roomData.isConnected ? (
        <p>Not Connected To Room</p>
      ) : !roomData.gameState ? (
        <RoomCard />
      ) : (
        <Poker />
      )}
    </div>
  );
}

export default MyRoom;

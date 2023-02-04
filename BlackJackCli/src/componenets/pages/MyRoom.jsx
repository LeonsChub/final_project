import React, { useContext } from "react";
import { RoomContext } from "../../AppContext";
import RoomCard from "../RoomCard";
import PlayRoom from "./PlayRoom";

function MyRoom() {
  const [roomData] = useContext(RoomContext);

  return (
    <div>
      {!roomData.isConnected ? (
        <p>Not Connected To Room</p>
      ) : !roomData.gameState ? (
        <RoomCard />
      ) : (
        <PlayRoom />
      )}
    </div>
  );
}

export default MyRoom;

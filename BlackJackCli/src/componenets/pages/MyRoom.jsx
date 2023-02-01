import React, { useContext } from "react";
import { RoomContext } from "../../AppContext";
import RoomCard from "../RoomCard";

function MyRoom() {
  const [room] = useContext(RoomContext);

  return (
    <div>{!room.isConnected ? <p>Not Connected To Room</p> : <RoomCard />}</div>
  );
}

export default MyRoom;

import React, { useEffect, useState, useContext } from "react";
import { SocketContext, TokenContext } from "../../AppContext";
import Button from "react-bootstrap/Button";

function JoinRoom() {
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  const [roomsToJoin, setRoomsToJoin] = useState([]);
  useEffect(() => {
    socket.emit("fetch rooms");

    socket.on("update rooms", (data) => {
      setRoomsToJoin(data.rooms);
    });

    return () => socket.off("update rooms");
  }, []);

  return (
    <div>
      <h3 className="text-light">All Rooms</h3>
      <div className="bg-light mt-2">{renderRooms()}</div>
    </div>
  );

  function renderRooms() {
    return roomsToJoin.map((room, index) => {
      return (
        <div
          key={index}
          className="d-flex justify-content-between align-items-center px-3"
        >
          <p className="m-0 my-1">Host: {room.hostName}</p>
          <p className="m-0 my-1  ">{room.roomName}</p>
          <p className="m-0 my-1">players:{room.players.length}</p>
          <Button
            className="my-1"
            onClick={() => {
              socket.emit("join room", { roomId: room.roomId, auth: token });
            }}
          >
            Join
          </Button>
        </div>
      );
    });
  }
}

export default JoinRoom;

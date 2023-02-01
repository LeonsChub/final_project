import React from "react";
import { TokenContext, SocketContext, RoomContext } from "../../AppContext";
import { useContext, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import CreateRoomForm from "../forms/CreateRoomForm";
import JoinRoom from "../forms/JoinRoom";
import { useNavigate } from "react-router-dom";

function UserPage() {
  const [token] = useContext(TokenContext);
  const socket = useContext(SocketContext);
  const [roomData, setRoomData] = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("join success", (data) => {
      setRoomData((prev) => {
        const prevState = prev;
        prevState.isConnected = true;
        prevState.roomData = data.roomData;
        return prevState;
      });

      // alert(JSON.stringify(roomData));

      navigate(`/myRoom/${data.roomData.roomId}`);
    });
    return () => {
      socket.off("join success");
    };
  }, [socket]);
  return (
    <div className="w-100 d-flex flex-column justify-content-center align-items-center">
      {token !== "EMPTY" ? renderLogged() : <h1>Please Login</h1>}
    </div>
  );

  function renderLogged() {
    return (
      <>
        <div
          style={{ minWidth: "600px" }}
          className="w-25 d-flex flex-column gap-1 mt-3 p-2 bg-dark rounded"
        >
          <CreateRoomForm />
        </div>
        <div className="w-75 d-flex flex-column gap-1 mt-3 p-2 bg-dark rounded">
          <JoinRoom />
        </div>
      </>
    );
  }
}

export default UserPage;

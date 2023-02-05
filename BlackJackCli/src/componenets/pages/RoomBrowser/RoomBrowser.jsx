import React from "react";
import { TokenContext, SocketContext, RoomContext } from "../../../AppContext";
import { useContext, useEffect, useRef } from "react";
// import { Button } from "react-bootstrap";
import CreateRoomForm from "./CreateRoom";
import { useNavigate } from "react-router-dom";
import JoinRoom from "./JoinRoom";

function RoomBrowser() {
  const [token] = useContext(TokenContext);
  const socket = useContext(SocketContext);
  const [roomData, setRoomData] = useContext(RoomContext);
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("join success", (data) => {
      // initRoomData(data.roomData);console.log("INNIINTING");
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.isConnected = true;
        oldState.sockData = data.roomData;

        return oldState;
      });
      navigate(`/myRoom/${data.roomData.roomId}`, { replace: true });
    });

    socket.on("join failed", (data) => {
      console.log(data.msg);
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

export default RoomBrowser;

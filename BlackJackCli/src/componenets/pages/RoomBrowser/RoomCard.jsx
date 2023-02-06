import React, { useContext, useEffect, useRef } from "react";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
// import { Card as BootCard } from "react-bootstrap";
// import Button from "react-bootstrap/Button";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function RoomCard() {
  const socket = useContext(SocketContext);
  const [roomData, setRoomData, updateRoomData] = useContext(RoomContext);
  const [token] = useContext(TokenContext);
  const isAdmin = jwt(token).user_id === roomData.sockData.hostId;
  const navigate = useNavigate();
  const mountRef = useRef(false);

  useEffect(() => {
    setUpListenets(socket);

    // return () => {
    //   if (mountRef.current) {
    //     socket.emit("leave room", {
    //       roomId: roomData.sockdData.roomId,
    //       auth: token,
    //     });
    //   }
    //   mountRef.current = true;
    //   socket.off("user joined");
    //   socket.off("leave room");
    // };
  }, []);

  function renderAdminButtons() {
    return (
      <div className="w-100 d-flex justify-content-between">
        <button
          variant="danger"
          onClick={() => {
            socket.emit("disband room", {
              auth: token,
              roomId: roomData.sockData.roomId,
            });
            navigate("/room browser", { replace: true });
          }}
        >
          Disband room
        </button>
        <button
          disabled={roomData.sockData.players.length < 2}
          variant="success"
          onClick={() => {
            socket.emit("start game", {
              auth: token,
              roomId: roomData.sockData.roomId,
            });
          }}
        >
          Start Game {roomData.sockData.players.length}/2
        </button>
      </div>
    );
  }
  function renderPlayerButton() {
    return (
      <button
        variant="danger"
        onClick={() => {
          socket.emit("leave room", {
            auth: token,
            roomId: roomData.sockData.roomId,
          });
        }}
      >
        Leave room
      </button>
    );
  }

  return (
    <div className="mx-auto w-50">
      <h1>{roomData.sockData.roomName}</h1>
      <p className="mb-2 text-muted">host: {roomData.sockData.hostName}</p>
      <p style={{ fontWeight: "bold" }}>Players:</p>
      <p className="px-2">
        {roomData.sockData.players.map((p, index) => (
          <p key={index}>{p.name}</p>
        ))}
      </p>
      {isAdmin ? renderAdminButtons() : renderPlayerButton()}
    </div>
  );

  function setUpListenets(socket) {
    socket.on("user joined", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.sockData = data;
        return oldState;
      });
    });

    socket.on("user left", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.sockData = data;
        return oldState;
      });
    });

    socket.on("kick user", () => {
      socket.emit("leave room", {
        auth: token,
        roomId: getRoomById(),
      });
    });

    socket.on("ref ready", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });

      navigate(`/myRoom/${roomData.sockData.roomId}`, { replace: true });
    });

    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = "";
    });

    window.addEventListener("unload", function (e) {
      socket.emit("leave room", {
        roomId: roomData.sockData.roomId,
        auth: token,
      });
    });
  }
}

export default RoomCard;

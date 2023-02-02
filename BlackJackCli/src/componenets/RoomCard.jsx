import React, { useContext, useEffect, useRef } from "react";
import { RoomContext, SocketContext, TokenContext } from "../AppContext";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import jwt from "jwt-decode";
import { useNavigate } from "react-router-dom";

function RoomCard() {
  const socket = useContext(SocketContext);
  const [roomData, setRoomData] = useContext(RoomContext);
  const [token] = useContext(TokenContext);
  const isAdmin = jwt(token).user_id === roomData.roomData.hostId;
  const navigate = useNavigate();
  const mountRef = useRef(false);

  useEffect(() => {
    socket.on("user joined", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.roomData = data;
        return oldState;
      });
    });

    socket.on("user left", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.roomData = data;
        return oldState;
      });
    });

    socket.on("kick user", () => {
      socket.emit("leave room", {
        auth: token,
        roomId: roomData.roomData.roomId,
      });
    });

    window.addEventListener("beforeunload", function (e) {
      e.preventDefault();
      e.returnValue = " ";
    });

    window.addEventListener("unload", function (e) {
      socket.emit("leave room", {
        roomId: roomData.roomData.roomId,
        auth: token,
      });
    });

    return () => {
      if (mountRef.current) {
        socket.emit("leave room", {
          roomId: roomData.roomData.roomId,
          auth: token,
        });
      }
      mountRef.current = true;
      socket.off("user joined");
    };
  }, []);

  return (
    <Card className="mx-auto w-50">
      <Card.Body>
        <Card.Title>{roomData.roomData.roomName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          host: {roomData.roomData.hostName}
        </Card.Subtitle>
        <Card.Text style={{ fontWeight: "bold" }}>Players:</Card.Text>
        <Card.Text className="px-2">
          {roomData.roomData.players.map((p) => (
            <p>{p.name}</p>
          ))}
        </Card.Text>

        {isAdmin ? (
          <Button
            variant="danger"
            onClick={() => {
              socket.emit("disband room", {
                auth: token,
                roomId: roomData.roomData.roomId,
              });
              navigate("/");
            }}
          >
            Disband room
          </Button>
        ) : (
          <Button
            variant="danger"
            onClick={() => {
              socket.emit("leave room", {
                auth: token,
                roomId: roomData.roomData.roomId,
              });
            }}
          >
            Leave room
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default RoomCard;

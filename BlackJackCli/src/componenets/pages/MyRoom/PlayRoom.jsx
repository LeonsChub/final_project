import React, { useContext, useEffect, useRef } from "react";
import { RoomContext, SocketContext, TokenContext } from "../../../AppContext";
import Card from "../../Card";
import jwt from "jwt-decode";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PlayRoom() {
  const [roomData, setRoomData] = useContext(RoomContext);
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  const navigate = useNavigate();
  const mountRef = useRef();
  const { user_id } = jwt(token);
  const ranOnce = useRef(false);

  const { gameState } = roomData;

  //   function renderDeck() {
  //     return gameState.deck.map((card, index) => {
  //       return <Card key={index} suit={card.suit} value={card.value} />;
  //     });
  //   }

  useEffect(() => {
    socket.on("handing cards", (data) => {
      console.log("new Data", data);
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
    });

    // socket.on("update deck", (data) => {
    //   setRoomData((prev) => {
    //     const oldState = { ...prev };
    //     oldState.gameState.deck = data.newDeck;

    //     return oldState;
    //   });
    // });

    socket.on("update gamestate", (data) => {
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.gameState = data;
        return oldState;
      });
    });

    return () => {
      if (mountRef.current) {
        socket.emit("leave room", {
          roomId: roomData.sockData.roomId,
          auth: token,
        });

        setRoomData((prev) => {
          const oldState = { ...prev };
          oldState.gameState = undefined;
          return oldState;
        });
      }
      mountRef.current = true;
      socket.off("user joined");
      socket.off("leave room");
    };
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-center">
        <p className="position-absolute">{gameState.deck.length}</p>
        <Card></Card>
      </div>

      <div className="d-flex justify-content-center mt-2">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>

      <div className="d-flex justify-content-center mt-2">
        {gameState.players.map((p) => {
          return (
            <div className="d-flex flex-column mx-4">
              <p>{p.name}</p>
              <p>{p.chips}</p>
              {/* <p>{p.hand}</p> */}
              <div>
                {p.cards.map((card, index) =>
                  p.id === user_id ? (
                    <Card key={index} suit={card.suit} value={card.value} />
                  ) : (
                    <Card key={index} value={"dk"} />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>

      <Button
        onClick={() => {
          setRoomData((prev) => {
            const oldState = { ...prev };
            oldState.gameState = undefined;
            return oldState;
          });
          socket.emit("leave room", { auth: token });
          navigate("/");
        }}
      >
        Leave Game
      </Button>
    </div>
  );
}

export default PlayRoom;

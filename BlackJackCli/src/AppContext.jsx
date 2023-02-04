import React, { useState } from "react";
import io from "socket.io-client";

export const SocketContext = React.createContext();
export const TokenContext = React.createContext();
export const RoomContext = React.createContext();

const socket = io.connect("http://localhost:3030", {
  closeOnBeforeunload: false,
});

// const socket = io.connect("http://localhost:3030");

function AppContext({ children }) {
  const [token, setToken] = useState("EMPTY");
  const [roomData, setRoomData] = useState({
    sockData: {
      hostName: "",
      hostId: "",
      roomName: "",
      roomId: "",
      players: [],
    },
    isConnected: false,
    gameState: undefined,
  });

  function updateGameState() {
    console.log("SADASDQWEQWEQWEQWEQWE");
    setRoomData((prev) => {
      const oldState = { ...prev };
      oldState.gameState = newState;
      return oldState;
    });
  }

  function getRoomId() {
    return roomData.sockData.roomId;
  }

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={[token, setToken]}>
        <RoomContext.Provider
          value={[roomData, setRoomData, getRoomId, updateGameState]}
        >
          {children}
        </RoomContext.Provider>
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
}

export default AppContext;

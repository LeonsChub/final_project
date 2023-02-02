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
    roomData: {
      hostName: "",
      hostId: "",
      roomName: "",
      roomId: "",
      players: [],
    },
    isConnected: false,
    gameState: undefined,
  });

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={[token, setToken]}>
        <RoomContext.Provider value={[roomData, setRoomData]}>
          {children}
        </RoomContext.Provider>
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
}

export default AppContext;

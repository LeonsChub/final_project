import React, { useState, useRef } from "react";
import io from "socket.io-client";

export const SocketContext = React.createContext();
export const TokenContext = React.createContext();
export const RoomContext = React.createContext();
export const ScrollersContext = React.createContext();

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
    gameState: {
      deck: [],
      players: [],
      community: [],
      burned: [],
      roundInfo: {},
      pot: 0,
      blind: 0,
      gameStage: "",
    },
  });

  function blankGameState() {
    return {
      deck: [],
      players: [],
      community: [],
      burned: [],
      roundInfo: {},
      pot: 0,
      blind: 0,
      gameStage: "",
    };
  }

  const gamesRef = useRef(null);
  const gamesClick = () => {
    gamesRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const profileRef = useRef(null);
  const profileClick = () => {
    profileRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const aboutRef = useRef(null);
  const aboutClick = () => {
    aboutRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function getRoomId() {
    return roomData.sockData.roomId;
  }

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={[token, setToken]}>
        <RoomContext.Provider value={[roomData, setRoomData, blankGameState]}>
          <ScrollersContext.Provider
            value={{
              gamesRef,
              gamesClick,
              profileRef,
              profileClick,
              aboutRef,
              aboutClick,
            }}
          >
            {children}
          </ScrollersContext.Provider>
        </RoomContext.Provider>
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
}

export default AppContext;

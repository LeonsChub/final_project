import React, { useState, useRef } from "react";
import io from "socket.io-client";
import jwtDecode from "jwt-decode";
import { apiService } from "./ApiService/ApiService";

export const SocketContext = React.createContext();
export const RoomContext = React.createContext();
export const ScrollersContext = React.createContext();
export const UserContext = React.createContext();

const socket = io.connect("http://localhost:3030", {
  closeOnBeforeunload: false,
});

// const socket = io.connect("http://localhost:3030");

function AppContext({ children }) {
  const [token, setToken] = useState();
  const [user, setUser] = useState();
  const [chips, setChips] = useState();

  const myProfile = () => {
    const myToken = localStorage.getItem("token");
    setToken(myToken);
    if (token) {
      const decoded = jwtDecode(token);
      setUser(decoded);
      return;
    } else {
      return;
    }
  };

  const getChips = () => {
    apiService.getChips().then((res) => setChips(res));
  };

  const postChips = (num) => {
    apiService.postChips(num).then((res) => setChips(res));
  };
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
      <UserContext.Provider
        value={{ user, token, myProfile, chips, setChips, getChips, postChips }}
      >
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
      </UserContext.Provider>
    </SocketContext.Provider>
  );
}

export default AppContext;

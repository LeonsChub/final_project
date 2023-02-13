import { useState, useEffect, useContext, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./componenets/pages/LoginPage";
import { RoomContext, SocketContext, UserContext } from "./AppContext";
import MyRoom from "./componenets/pages/MyRoom/MyRoom";
import Welcome from "../src/componenets/pages/Welcome";
import Login from "../src/componenets/pages/Login";
import Main from "./componenets/pages/MainPage/Main";
import "./styles/index.css";
import IndexPage from "./componenets/pages/IndexPage";
import RoomBrowser from "./componenets/pages/RoomBrowser/RoomBrowser";
import Rooms from "./componenets/pages/RoomBrowser/Rooms";
import Poker from "../src/componenets/pages/MyRoom/Poker";
import Signup from './componenets/pages/Signup';
import Machines from './componenets/pages/MyRoom/Machines';
import HTPPoker from './componenets/HTPPoker';
import HTPSlot from './componenets/HTPSlot';

function App() {
  const socket = useContext(SocketContext);
  const [roomData, setRoomData, blankGameState] = useContext(RoomContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("leave success", (data) => {
      console.log("leave", data);
      setRoomData({
        sockData: {
          hostName: "",
          hostId: "",
          roomName: "",
          roomId: "",
          players: [],
        },
        isConnected: false,
        gameState: blankGameState(),
      });
      navigate("/", { replace: true });
    });

    return () => {
      socket.off("connect");
      socket.off("leave success");
      socket.off("disconnect");
    };
  }, []);

  useEffect(() => {
    console.log(roomData);

  }, [roomData]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/room browser" element={<Rooms />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/machines" element={<Machines />} />
        <Route path="/poker" element={<Poker />} />
        <Route path="myRoom/:id" element={<MyRoom />} />
        <Route path="htppoker" element={<HTPPoker />} />
        <Route path="htpslot" element={<HTPSlot />} />
      </Routes>
    </div>
  );
}

export default App;

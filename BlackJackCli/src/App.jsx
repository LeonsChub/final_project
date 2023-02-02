import { useState, useEffect, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "./componenets/Navbar";
import LoginPage from "./componenets/pages/LoginPage";
import UserPage from "./componenets/pages/UserPage";
import { RoomContext, SocketContext, TokenContext } from "./AppContext";
import MyRoom from "./componenets/pages/MyRoom";
function App() {
  const socket = useContext(SocketContext);
  const [roomData, setRoomData] = useContext(RoomContext);
  const [token] = useContext(TokenContext);
  const navigate = useNavigate();
  useEffect(() => {
    socket.on("leave success", (data) => {
      setRoomData({
        roomData: {
          hostName: "",
          hostId: "",
          roomName: "",
          roomId: "",
          players: [],
        },
        isConnected: false,
      });
      navigate("/");
    });

    return () => {
      socket.off("connect");
      socket.off("leave success");
      socket.off("disconnect");
    };
  });
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="myRoom/:id" element={<MyRoom />} />
      </Routes>
    </div>
  );
}

export default App;

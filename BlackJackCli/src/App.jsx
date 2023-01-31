import { useState, useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Navbar from "./componenets/Navbar";
import LoginPage from "./componenets/pages/LoginPage";
import UserPage from "./componenets/pages/UserPage";
import { SocketContext } from "./AppContext";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

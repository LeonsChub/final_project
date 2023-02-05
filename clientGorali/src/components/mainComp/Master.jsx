import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";
import Signup from "./Signup";
import Welcome from "./Welcome";
import Login from "./Login";
import Poker from '../Poker';

const Master = () => {
  const logo = "<SL>CASINO</SL>";
  return (
    <div className="masterSpace">
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/main" element={<Main />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/poker" element={<Poker />} />
      </Routes>
    </div>
  );
};

export default Master;

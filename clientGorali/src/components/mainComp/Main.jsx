import React from "react";
import Games from "../Games";
import Profile from "../Profile";
import About from "./About";
import Header from "./Header";

const Main = () => {
  return (
    <div className="mainSpace">
      <Header />
      <Games />
      <Profile />
      <About />
    </div>
  );
};

export default Main;

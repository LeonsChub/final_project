import React, { useContext } from "react";
import { ScrollersContext } from "../../../AppContext";
const About = () => {
  const { aboutRef } = useContext(ScrollersContext);
  return <div ref={aboutRef} className="aboutSpace"></div>;
};

export default About;

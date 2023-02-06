import React, { useContext } from "react";
import { ScrollersContext } from './../context/Scrollers';

const About = () => {
  const { aboutRef } = useContext(ScrollersContext);
  return <div ref={aboutRef} className="aboutSpace"></div>;
};

export default About;

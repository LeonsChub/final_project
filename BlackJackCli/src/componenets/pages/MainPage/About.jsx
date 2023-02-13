import React, { useContext } from "react";
import { ScrollersContext } from "../../../AppContext";
const About = () => {
  const { aboutRef } = useContext(ScrollersContext);
  const handleContact = (e) => {
    e.preventDefault();
    alert(
      "Thank you for contacting we will get back to you soon as possible..."
    )
  };
  return (
    <div ref={aboutRef} className="aboutSpace">
      <div className="aboutTitle">
        <h2>About our Casino</h2>
      </div>
      <div className="aboutDesc">
        <p>
          Welcome to our online casino, where the excitement never stops! We are
          dedicated to providing our players with an unparalleled gaming
          experience, filled with the latest and greatest games in the industry.
          With a wide range of games, including slots, table games, and live
          dealer options, we have something for every type of player. Our team
          of experts is dedicated to ensuring that every aspect of your time
          with us is top-notch, from the security of your personal information
          to the fairness of our games. We are committed to responsible gaming,
          and provide resources and support for those who may need it. Join us
          now for a thrilling adventure in the world of online gambling!
        </p>
      </div>
      <form className="contactForm" action="contact">
        <label htmlFor="contact">
          We are here for you to contact about eveything!
        </label>
        <input type="text" name="contact" id="contactInp" />
        <button
          className="custom-btn btn-5"
          style={{
            backgroundColor: "black",
            height: "20%",
            width: "50%",
            fontSize: "100%",
          }}
          onClick={(e) => handleContact(e)}
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default About;

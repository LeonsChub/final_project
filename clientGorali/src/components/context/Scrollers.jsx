import { createContext, useRef } from "react";

export const ScrollersContext = createContext();
function ScrollersProvider(props) {
  const { children } = props;

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
  return (
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
  );
}

export default ScrollersProvider;

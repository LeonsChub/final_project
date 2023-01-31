import React, { useState } from "react";
import io from "socket.io-client";

export const SocketContext = React.createContext();
export const TokenContext = React.createContext();

// const socket = io.connect("http://localhost:3030", {
//   closeOnBeforeunload: false,
// });

const socket = io.connect("http://localhost:3030");

function AppContext({ children }) {
  const [token, setToken] = useState("EMPTY");

  return (
    <SocketContext.Provider value={socket}>
      <TokenContext.Provider value={[token, setToken]}>
        {children}
      </TokenContext.Provider>
    </SocketContext.Provider>
  );
}

export default AppContext;

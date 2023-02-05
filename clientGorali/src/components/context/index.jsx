import React from "react";
import ScrollersProvider from "./Scrollers";
import UserProvider from "./user";

function Store({ children }) {
  return (
    <ScrollersProvider>
      <UserProvider>{children}</UserProvider>
    </ScrollersProvider>
  );
}
export default Store;

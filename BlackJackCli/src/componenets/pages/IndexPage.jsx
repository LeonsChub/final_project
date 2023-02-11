import React from "react";
import Welcome from "./Welcome";
import { useContext, useEffect } from "react";
import { UserContext } from "../../AppContext";
import Main from "./MainPage/Main";
function IndexPage() {
  const { token, myProfile } = useContext(UserContext);
  useEffect(() => {
    myProfile();
  }, []);
  return <div className="">{!token ? <Welcome /> : <Main />}</div>;
}

export default IndexPage;

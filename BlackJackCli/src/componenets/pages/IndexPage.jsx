import React from 'react'
import Welcome from './Welcome';
import { useContext } from 'react';
import { TokenContext } from '../../AppContext';
import Main from './MainPage/Main';
function IndexPage() {
    const [token] = useContext(TokenContext);
  return (
    <div className="">
      {token === "EMPTY" ? <Welcome /> :<Main/>}
    </div>
  );

}

export default IndexPage
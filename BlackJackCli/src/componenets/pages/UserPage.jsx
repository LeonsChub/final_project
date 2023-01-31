import React from "react";
import { TokenContext } from "../../AppContext";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import CreateRoomForm from "../forms/CreateRoomForm";
import JoinRoom from "../forms/JoinRoom";
function UserPage() {
  const [token] = useContext(TokenContext);
  return (
    <div className="d-flex justify-content-center">
      {token !== "EMPTY" ? renderLogged() : <h1>Please Login</h1>}
    </div>
  );

  function renderLogged() {
    return (
      <div className="d-flex flex-column gap-1 mt-3 p-2 bg-dark rounded">
        <CreateRoomForm />
        <JoinRoom />
      </div>
    );
  }
}

export default UserPage;

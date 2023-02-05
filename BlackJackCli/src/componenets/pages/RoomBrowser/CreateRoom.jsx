import React, { useState, useContext, useEffect } from "react";
import { SocketContext, TokenContext } from "../../../AppContext";

function CreateRoomForm() {
  const [name, setName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [nameError, setNameError] = useState("");
  const socket = useContext(SocketContext);
  const [token] = useContext(TokenContext);
  useEffect(() => {
    socket.on("create failed", (data) => {
      setNameError(data.msg);
    });

    socket.on("create successful", (data) => {
      socket.emit("join room", { roomId: data.roomData.roomId, auth: token });
    });

    return () => {
      socket.off("create failed");
      socket.off("create successful");
    };
  }, []);
  return (
    <form
      className="text-light"
      onSubmit={(e) => {
        e.preventDefault();
        if (!name) {
          setNameError("Please Provide a room name");
        } else {
          socket.emit("create room", {
            auth: token,
            name: name,
          });
        }
      }}
      noValidate
    >
      <div className="form-outline mb-2">
        <label className="form-label" htmlFor="form2Example1">
          Room name
        </label>
        <input
          type="email"
          id="form2Example1"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <p className="text-danger mx-2 ">{nameError ? nameError : ""} &nbsp;</p>

      <div className="row mb-2">
        <div className="col d-flex justify-content-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value={isPrivate}
              onChange={() => setIsPrivate((prev) => !prev)}
              id="form2Example31"
              checked={isPrivate}
            />
            <label className="form-check-label" htmlFor="form2Example31">
              Private
            </label>
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary btn-block mx-auto">
          Create Room
        </button>
      </div>
    </form>
  );
}

export default CreateRoomForm;

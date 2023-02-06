import React, { useState } from "react";
import "./css/rooms.css";
import  axios  from "axios";

const Rooms = () => {
  const [creating, setCreating] = useState(false);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({});
  const handleNewRoom = async (e) => {
    setNewRoom({ ...newRoom, private: privateRoom });
    try {
      e.preventDefault();
      //   const result = axios.post("/rooms", newRoom);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div className="roomsPage">
      <div className="roomsSpace">
        {creating ? (
          <>
            <div className="roomsHeader">
              <h3>Create new room</h3>
            </div>
            <form className="roomsFormSpace" action="createRoom">
              <div className="roomNameTitle">
                <label className="roomTitle" htmlFor="roomName">
                  Room name
                </label>
                <input
                  onChange={(e) =>
                    setNewRoom({ ...newRoom, roomName: e.target.value })
                  }
                  className="roomInp"
                  type="text"
                  name="roomName"
                  id="roomNameInp"
                />
              </div>
              <div className="privateRoom">
                <label htmlFor="private">Private Room</label>
                <input
                  onClick={() => {
                    setPrivateRoom(!privateRoom);
                  }}
                  type="checkbox"
                  name="private"
                  id="privateRoom"
                />
              </div>
              {privateRoom ? (
                <div className="roomPassword">
                  <label className="roomTitle" htmlFor="roomPassword">
                    Room Password
                  </label>
                  <input
                    onChange={(e) =>
                      setNewRoom({ ...newRoom, roomPassword: e.target.value })
                    }
                    className="roomInp"
                    type="password"
                    name="roomPassword"
                    id="roomPassword"
                  />
                </div>
              ) : (
                <></>
              )}

              <div className="roomsBtns">
                <button onClick={(e) => handleNewRoom(e)}>
                  Create room and continue
                </button>
                <button onClick={() => setCreating(false)}>
                  Back to rooms menu
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="roomsHeader">
              <h3>Rooms</h3>
            </div>
            <div className="allRooms">
              <div className="room">
                <div className="roomName">
                  <p>Name</p>
                </div>
                <div className="roomHost">
                  <p className="roomTitle">Host:</p>
                  <p className="hosts">eligogo12</p>
                </div>
                <div className="roomPlayers">
                  <p className="roomTitle">Players:</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                </div>
                <div className="roomBtns">
                  <button className="joinRoomBtn">Join</button>
                </div>
              </div>
              <div className="room">
                <div className="roomName">
                  <p>Name</p>
                </div>
                <div className="roomHost">
                  <p className="roomTitle">Host:</p>
                  <p className="hosts">eligogo12</p>
                </div>
                <div className="roomPlayers">
                  <p className="roomTitle">Players:</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                  <p className="players">yossi</p>
                </div>
                <div className="roomBtns">
                  <button className="joinRoomBtn">Join</button>
                </div>
              </div>
            </div>
            <div className="roomsBtns">
              <button onClick={() => setCreating(true)}>Create room</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Rooms;

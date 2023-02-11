import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import axios from "axios";
import { RoomContext, SocketContext, UserContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";

const Rooms = () => {
  const socket = useContext(SocketContext);
  const { token, myProfile } = useContext(UserContext);
  const [roomData, setRoomData] = useContext(RoomContext);

  const navigate = useNavigate();

  const [creating, setCreating] = useState(false);
  const [privateRoom, setPrivateRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({});
  const [roomsToJoin, setRoomsToJoin] = useState([]);
  const [nameErr, setNameErr] = useState("");

  function handleNewRoom(e) {
    e.preventDefault();
    if (!newRoom.roomName) {
      setNameErr("Please Provide a room name");
    } else {
      socket.emit("create room", {
        auth: token,
        name: newRoom.roomName,
      });
    }
  }

  useEffect(() => {
    myProfile();
    initSocketListeners();

    return () => {
      socket.off("join success");
      socket.off("create failed");
      socket.off("create successful");
      socket.off("update rooms");
    };
  }, []);
  return (
    <div className="roomsPage">
      <div className="roomsSpace">
        {creating ? renderCreatingForm() : renderJoinRoom()}
      </div>
    </div>
  );

  function renderJoinRoom() {
    return (
      <>
        <div className="roomsHeader">
          <h3>Rooms</h3>
        </div>
        <div className="allRooms">
          {roomsToJoin.map((room) => {
            return renderRoomCard(room);
          })}
        </div>
        <div className="roomsBtns">
          <button onClick={() => setCreating(true)}>Create room</button>
          <button onClick={() => navigate("/")}>Back to menu</button>
        </div>
      </>
    );
  }

  function renderCreatingForm() {
    return (
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
            <p>{nameErr ? nameErr : ""}</p>
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
    );
  }
  function initSocketListeners() {
    socket.emit("fetch rooms");

    socket.on("update rooms", (data) => {
      setRoomsToJoin(data.rooms);
    });
    socket.on("create failed", (data) => {
      setNameErr(data.msg);
    });

    socket.on("create successful", (data) => {
      setPrivateRoom(false);
      setCreating(false);
      socket.emit("join room", { roomId: data.roomData.roomId, auth: token });
    });
    socket.on("join success", (data) => {
      // initRoomData(data.roomData);console.log("INNIINTING");
      setRoomData((prev) => {
        const oldState = { ...prev };
        oldState.isConnected = true;
        oldState.sockData = data.roomData;

        return oldState;
      });
      navigate(`/myRoom/${data.roomData.roomId}`, { replace: true });
    });

    socket.on("join failed", (data) => {
      console.log(data.msg);
    });
  }

  function renderRoomCard(roomData) {
    console.log(roomData);
    return (
      <div key={roomData.roomId} className="room">
        <div className="roomName">
          <p>{roomData.roomName}</p>
        </div>
        <div className="roomHost">
          <p className="roomTitle">Host:</p>
          <p className="hosts">{roomData.hostName}</p>
        </div>
        <div className="roomPlayers">
          <p className="roomTitle">Players: {roomData.players.length}</p>
        </div>
        <div className="roomBtns">
          <button
            className="joinRoomBtn"
            onClick={() =>
              socket.emit("join room", {
                roomId: roomData.roomId,
                auth: token,
              })
            }
          >
            Join
          </button>
        </div>
      </div>
    );
  }
};

export default Rooms;

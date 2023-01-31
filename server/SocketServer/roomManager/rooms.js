const uniqid = require("uniqid");
const rooms = [];

const createRoom = (hostData, roomName, private = false) => {
  if (!hostData.id || !hostData.name || !roomName) {
    return;
  } else {
    const roomToAdd = {
      hostName: hostData.name,
      hostId: hostData.id,
      roomName: roomName,
      roomId: uniqid(),
      players: [],
    };

    return roomToAdd;
  }
};

const addRoom = (room) => {
  rooms.push(room);
};

const getAllRooms = () => {
  return rooms;
};

const isNameTaken = (name) => {
  return (
    rooms.filter((room) => {
      return room.roomName === name;
    }).length !== 0
  );
};

module.exports = { createRoom, addRoom, getAllRooms, isNameTaken };

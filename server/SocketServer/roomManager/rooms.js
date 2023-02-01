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

const addUserToRoom = (roomId, hostData) => {
  if (rooms.length > 0) {
    const index = rooms.findIndex((room) => {
      return room.roomId === roomId;
    });

    const hasPlayer = rooms[index].players.filter(
      (player) => player.id === hostData.id
    )[0];

    if (!hasPlayer) {
      rooms[index].players.push(hostData);
    }
  }
};

const getAllRooms = () => {
  return rooms;
};
const rmUserFromRoom = (roomId, userid) => {
  if (rooms.length > 0) {
    const roomIndex = rooms.findIndex((room) => {
      return room.roomId === roomId;
    });

    const playerIndex = rooms[roomIndex].players.findIndex((player) => {
      return player.id === userid;
    });

    if (playerIndex !== -1) {
      rooms[roomIndex].players.splice(playerIndex, 1);
    }
  }
};

const getRoomById = (id) => {
  return rooms.filter((room) => {
    return room.roomId === id;
  })[0];
};

const isNameTaken = (name) => {
  return (
    rooms.filter((room) => {
      return room.roomName === name;
    }).length !== 0
  );
};

module.exports = {
  createRoom,
  addRoom,
  getAllRooms,
  isNameTaken,
  addUserToRoom,
  getRoomById,
  rmUserFromRoom,
};

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
  console.log('after', rooms)

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
    if (rooms[roomIndex]) {
      const playerIndex = rooms[roomIndex].players.findIndex((player) => {
        return player.id === userid;
      });
      if (playerIndex !== -1) {
        rooms[roomIndex].players.splice(playerIndex, 1);
      }
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

const deleteRoom = (roomId) => {
  const indexToRm = rooms.findIndex((room) => room.roomId == roomId);
  if (indexToRm !== -1) {
    rooms.splice(indexToRm, 1);
  }
};

const isRoomEmpty = (roomId) => {
  const roomIndex = rooms.findIndex((room) => room.roomId == roomId);
  if (roomIndex !== -1) {

    return isEmpty = rooms[roomIndex].players.length === 0;
  }
  return false

}

const getRoomHost = (roomId) => {
  if (rooms.length > 0) {
    const index = rooms.findIndex((room) => {
      return room.roomId === roomId;
    });

    return rooms[index].hostId;
  }
};

module.exports = {
  createRoom,
  addRoom,
  getAllRooms,
  isNameTaken,
  addUserToRoom,
  getRoomById,
  rmUserFromRoom,
  deleteRoom,
  getRoomHost,
  isRoomEmpty
};

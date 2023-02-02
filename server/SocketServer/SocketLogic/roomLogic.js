const config = process.env;
const {
  createRoom,
  addRoom,
  getAllRooms,
  isNameTaken,
  addUserToRoom,
  getRoomById,
  rmUserFromRoom,
  deleteRoom,
  getRoomHost,
} = require("../roomManager/rooms");

const jwt = require("jsonwebtoken");
const pokerRef = require("./referee/pokerRef");

function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("user logged");

    socketListenCreateRoom(socket, io);
    socketListenJoinRoom(socket, io);
    socketListenLeaveRoom(socket, io);
    socketListenDisbandRoom(socket, io);
    socketListenStartGame(socket, io);

    socket.on("fetch rooms", () => {
      socket.emit("update rooms", { rooms: getAllRooms() });
    });

    socket.on("disconnect", () => {
      console.log("USER DCED");
    });
  });
}

function authToken(token) {
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    return decoded;
  } catch (err) {
    console.log("Invalid Token");
  }
  return undefined;
}

function socketListenCreateRoom(socket, io) {
  socket.on("create room", (data) => {
    if (data) {
      const decoded = authToken(data.auth);
      if (decoded && data.name) {
        const hostData = { id: decoded.user_id, name: decoded.username };

        // console.log("data from create room", socket.id, data.name, hostData);
        if (!isNameTaken(data.name)) {
          const newRoom = createRoom(hostData, data.name);
          addRoom(newRoom);

          socket.emit("create successful", {
            roomData: newRoom,
            msg: `success joined room ${newRoom.roomName}`,
          });
          io.emit("update rooms", { rooms: getAllRooms() });
        } else {
          io.to(socket.id).emit("create failed", { msg: "room name taken" });
        }
      } else {
        console.log("INVALID DATA PROVIDED");
      }
    } else {
      console.log("NO DATA PROVIDED");
    }
  });
}

function socketListenJoinRoom(socket, io) {
  socket.on("join room", (data) => {
    if (data) {
      const decoded = authToken(data.auth);
      if (decoded && data.roomId && getRoomById(data.roomId)) {
        if (getRoomById(data.roomId).players.length < 4) {
          const playerData = { id: decoded.user_id, name: decoded.username };
          socket.join(data.roomId);
          addUserToRoom(data.roomId, playerData);

          socket.to(data.roomId).emit("user joined", getRoomById(data.roomId));
          io.emit("update rooms", { rooms: getAllRooms() });

          io.to(socket.id).emit("join success", {
            msg: "success joining room...",
            roomData: getRoomById(data.roomId),
          });
        } else {
          io.to(socket.id).emit("join failed", {
            msg: "Too many players Cant Join",
          });
        }
      }
    } else {
      console.log("NO DATA PROVIDED");
    }
  });
}

function socketListenLeaveRoom(socket, io) {
  socket.on("leave room", (data) => {
    if (data) {
      const decoded = authToken(data.auth);
      if (decoded && data.roomId) {
        socket.leave(data.roomId);
        rmUserFromRoom(data.roomId, decoded.user_id);

        socket.to(data.roomId).emit("user left", getRoomById(data.roomId));
        io.emit("update rooms", { rooms: getAllRooms() });

        io.to(socket.id).emit("leave success", {
          msg: "leaving room...",
        });
      }
    } else {
      console.log("NO DATA PROVIDED");
    }
  });
}

function socketListenDisbandRoom(socket, io) {
  socket.on("disband room", (data) => {
    if (data) {
      const decoded = authToken(data.auth);
      if (decoded && data.roomId) {
        deleteRoom(data.roomId);
        socket.to(data.roomId).emit("kick user");
        socket.leave(data.roomId);
      }
    } else {
      console.log("NO DATA PROVIDED");
    }
  });
}

function socketListenStartGame(socket, io) {
  socket.on("start game", (data) => {
    if (data) {
      const decoded = authToken(data.auth);
      if (
        decoded &&
        data.roomId &&
        decoded.user_id === getRoomHost(data.roomId)
      ) {
        pokerRef(socket, io, data.roomId);
      }
    } else {
      console.log("NO DATA PROVIDED");
    }
  });
}

module.exports = { initSocket };

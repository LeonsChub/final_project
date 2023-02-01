const config = process.env;
const {
  createRoom,
  addRoom,
  getAllRooms,
  isNameTaken,
  addUserToRoom,
  getRoomById,
  rmUserFromRoom,
} = require("../roomManager/rooms");

const jwt = require("jsonwebtoken");
function initSocket(io) {
  io.on("connection", (socket) => {
    console.log("user logged");

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

    socket.on("join room", (data) => {
      if (data) {
        const decoded = authToken(data.auth);
        if (decoded && data.roomId) {
          const playerData = { id: decoded.user_id, name: decoded.username };
          // console.log("data from join room", socket.id, playerData);
          socket.join(data.roomId);
          addUserToRoom(data.roomId, playerData);

          socket.to(data.roomId).emit("user joined", getRoomById(data.roomId));
          io.emit("update rooms", { rooms: getAllRooms() });

          io.to(socket.id).emit("join success", {
            msg: "success joining room...",
            roomData: getRoomById(data.roomId),
          });
        }
      } else {
        console.log("NO DATA PROVIDED");
      }
    });

    socket.on("leave room", (data) => {
      if (data) {
        const decoded = authToken(data.auth);
        if (decoded && data.roomId) {
          console.log(decoded, "leaving room");
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
module.exports = { initSocket };

const config = process.env;
const {
  createRoom,
  addRoom,
  getAllRooms,
  isNameTaken,
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

          if (!isNameTaken(data.name)) {
            const newRoom = createRoom(hostData, data.name);
            addRoom(newRoom);
            socket.join(newRoom.roomId);
          } else {
            console.log("NAME TAKEN");
          }
        } else {
          console.log("INVALID DATA PROVIDED");
        }
      } else {
        console.log("NO DATA PROVIDED");
      }
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

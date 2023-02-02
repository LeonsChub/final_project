const pokerRef = (socket, io, roomId) => {
  const referee = {
    gameState: {
      Deck: [1, 2, 3, 4, 5],
    },
  };
  console.log("emitting", referee);
  io.to(roomId).emit("ref ready", referee);
};

module.exports = pokerRef;

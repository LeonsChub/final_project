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
} = require("../../roomManager/rooms");

const Player = require("./player/player");

const pokerRef = (socket, io, roomId) => {
  const gameState = {
    deck: shuffleDeck(initDeck()),
    players: generatePlayerData(roomId),
    community: [],
    roundInfo: {},
    gameStage: "",
  };

  io.to(roomId).emit("ref ready", gameState);

  gameState.players.forEach((player) => {
    const hand = [];
    hand.push(gameState.deck.pop());
    hand.push(gameState.deck.pop());

    updatePlayerHand(player.id, hand);

    // setTimeout(() => {
    //   io.to(roomId).emit("handing cards", { to: player.id, hand });
    // }, 750);
  });
  // console.log(`Emitting new state ${JSON.stringify(gameState)}`);
  io.to(roomId).emit("handing cards", gameState);

  // --------------------------------

  function updatePlayerHand(to, hand) {
    const index = gameState.players.findIndex((player) => {
      return player.id === to;
    });

    if (gameState.players[index].cards.length < 2) {
      gameState.players[index].cards.push(hand[0]);
      gameState.players[index].cards.push(hand[1]);
    }
  }
};

function initDeck() {
  const suits = ["clubs", "diamonds", "hearts", "spades"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"];

  const deck = [];
  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function generatePlayerData(roomId) {
  roomData = getRoomById(roomId);
  const players = roomData.players.map((player) => {
    return Player(player.name, player.id);
  });
  return players;
}

module.exports = pokerRef;

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
  function updatePlayerHand(to, hand) {
    const index = gameState.players.findIndex((player) => {
      return player.id === to;
    });

    gameState.players[index].setCards(hand);
  }

  function addToPot(amount) {
    gameState.pot += amount;
  }
  const gameState = {
    deck: shuffleDeck(initDeck()),
    players: generatePlayerData(roomId),
    community: [],
    burned: [],
    roundInfo: {
      sbIndex: 0, //small blind index
      bbIndex: 1, //bbindex
    },
    pot: 0,
    blind: 20,
    gameStage: "preflop",
  };

  io.to(roomId).emit("ref ready", gameState);

  //determine blinds
  const { sbIndex, bbIndex } = gameState.roundInfo;
  addToPot(gameState.players[sbIndex].setSmallBlind(gameState.blind)); // get small blind entry and add it to pot in game state
  addToPot(gameState.players[bbIndex].setBigBlind(gameState.blind)); // get small blind entry and add it to pot in game state
  //hand cards to each player
  gameState.players.forEach((player) => {
    const hand = [];
    hand.push(gameState.deck.pop()); // pop first to players and append them to an array
    hand.push(gameState.deck.pop());

    updatePlayerHand(player.id, hand); // update players array append hand card to player with id given
  });
  console.log(`Emitting ${JSON.stringify(gameState)}`);
  io.to(roomId).emit("handing cards", gameState); // update
};

// --------------------------------Helper functions

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
  // fisher yates shuffling algorithm
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function generatePlayerData(roomId) {
  roomData = getRoomById(roomId);
  const players = roomData.players.map((player) => {
    return new Player(player.name, player.id);
  });
  return players;
}

module.exports = pokerRef;

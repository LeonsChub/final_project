const jwt = require("jsonwebtoken");
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
    console.log("added", amount);
    gameState.pot += amount;
  }

  function determineFirst() {
    const { sbIndex, bbIndex } = gameState.roundInfo;
    if (gameState.players.length === 2) {
      return gameState.players[sbIndex]["id"];
    } else {
      return gameState.players[bbIndex + 1]["id"];
    }
  }

  function determineNext() {
    let activeId = gameState.roundInfo.activePlayer;
    const activeIndex = gameState.players.findIndex((p) => {
      return p.id === activeId;
    });

    if (activeIndex + 1 < gameState.players.length) {
      return gameState.players[activeIndex + 1]["id"];
    } else {
      return gameState.players[0]["id"];
    }
  }

  function initListeners(socket) {
    socket.on("init round", () => {
      if (!gaveCards) {
        gameState.players.forEach((player) => {
          const hand = [];
          hand.push(gameState.deck.pop()); // pop cards first to players and append them to an array
          hand.push(gameState.deck.pop());

          updatePlayerHand(player.id, hand); // update players array append hand card to player with id given
        });

        const { sbIndex, bbIndex } = gameState.roundInfo;

        addToPot(gameState.players[sbIndex].setSmallBlind(gameState.blind)); // get small blind entry and add it to pot in game state
        addToPot(gameState.players[bbIndex].setBigBlind(gameState.blind)); // get small blind entry and add it to pot in game state

        gameState.players.forEach((player) => {
          player.updateGap(gameState.minimumBet);
        });

        gameState.players.forEach((p) => (gameState.playerBets[p.id] = ""));
        console.log("init bets", gameState.playerBets);

        gameState.roundInfo.activePlayer = determineFirst();

        console.log(gameState);

        console.log("first to go", gameState.roundInfo.activePlayer);
        console.log("next to go", determineNext());
        gameState.roundInfo.nextPlayer = determineNext();

        io.to(roomId).emit("handing cards", gameState); // update
      }
    });
    socket.on("bet placed", (data) => {
      const decoded = authToken(data.auth);
      if (decoded) {
        console.log("a bet has been placed");
        const playerIndex = gameState.players.findIndex(
          (p) => p.id === decoded.user_id
        );

        switch (data.bet.type) {
          case "fold":
            gameState.players[playerIndex].setFold();
            gameState.playerBets[decoded.user_id] = "fold";
            break;

          case "call":
            addToPot(gameState.players[playerIndex].callBet());
            gameState.playerBets[decoded.user_id] = "call";

          case "raise":
            const { amount } = data.bet;
            if (amount) {
              gameState.minimumBet = amount;
              addToPot(gameState.players[playerIndex].raise(amount));
              gameState.playerBets[decoded.user_id] = "raise";
            }
          default:
            break;
        }

        gameState.players.forEach((player) => {
          player.updateGap(gameState.minimumBet);
        });
        console.log("after bet", gameState.playerBets);

        gameState.roundInfo.activePlayer = determineNext();
        gameState.roundInfo.nextPlayer = determineNext();

        let activeId = gameState.roundInfo.activePlayer;

        while (gameState.playerBets[activeId] === "fold") {
          gameState.roundInfo.activePlayer = determineNext();
          gameState.roundInfo.nextPlayer = determineNext();
          activeId = gameState.roundInfo.activePlayer;
        }

        io.to(roomId).emit("update gamestate", gameState);
      }
    });
    socket.on("leave room", () => {
      socket.off("bet placed", () => {});
      socket.off("init round", () => {});
    });
  }

  const gameState = {
    deck: shuffleDeck(initDeck()),
    players: generatePlayerData(roomId),
    community: [],
    burned: [],
    playerBets: {},
    roundInfo: {
      sbIndex: 0, //small blind index
      bbIndex: 1, //big blind index
      minBet: 20,
      activePlayer: "",
      nextPlayer: "",
    },
    pot: 0,
    blind: 20,
    minimumBet: 20,
    gameStage: "preflop",
  };

  let gaveCards = false;

  initListeners(socket);

  return initListeners;
};

// ------------------------Helper functions------------------------------

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

function authToken(token) {
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    return decoded;
  } catch (err) {
    console.log("invalid token");
  }
  return undefined;
}

module.exports = pokerRef;

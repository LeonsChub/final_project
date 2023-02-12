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

  function smallBlindStart() {
    let index = gameState.roundInfo.sbIndex;
    let playerFolded = gameState.players[index].fold;
    while (playerFolded) {
      index = index + 1;
      playerFolded = gameState.players[index].fold;
    }

    return gameState.players[index]["id"];
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

  function advanceRound() {
    switch (gameState.gameStage) {
      case "preflop":
        gameState.gameStage = "flop";
        gameState.roundInfo.activePlayer = smallBlindStart();
        gameState.burned.push(gameState.deck.pop());
        gameState.community.push(gameState.deck.pop());
        gameState.community.push(gameState.deck.pop());
        gameState.community.push(gameState.deck.pop());

        break;

      case "flop":
        gameState.gameStage = "turn";
        gameState.roundInfo.activePlayer = smallBlindStart();
        gameState.burned.push(gameState.deck.pop());
        gameState.community.push(gameState.deck.pop());
        break;

      case "turn":
        gameState.gameStage = "river";
        gameState.roundInfo.activePlayer = smallBlindStart();
        gameState.burned.push(gameState.deck.pop());
        gameState.community.push(gameState.deck.pop());
        break;

      case "river":
        gameState.gameStage = "showdown";
        gameState.roundInfo.activePlayer = "";
        break;

      default:
        break;
    }

    gameState.players.forEach((p) => {
      p.resetStake();
    });
    gameState.minimumBet = 0;
    gameState.playerBets = {};
    gameState.players.forEach((p) =>
      p.fold
        ? (gameState.playerBets[p.id] = "fold")
        : (gameState.playerBets[p.id] = "")
    );
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
        gameState.roundInfo.activePlayer = determineFirst();
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
          case "check":
            gameState.playerBets[decoded.user_id] = "check";

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

        if (checkNextRound(gameState.playerBets)) {
          advanceRound();
        } else {
          gameState.roundInfo.activePlayer = determineNext();
          gameState.roundInfo.nextPlayer = determineNext();

          let activeId = gameState.roundInfo.activePlayer;

          while (gameState.playerBets[activeId] === "fold") {
            gameState.roundInfo.activePlayer = determineNext();
            gameState.roundInfo.nextPlayer = determineNext();
            activeId = gameState.roundInfo.activePlayer;
          }
        }
        io.to(roomId).emit("update gamestate", gameState);
      }
    });

    socket.on("get winner", () => {
      console.log("NEED TO CALCULATE WINNER");
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

function checkNextRound(playerBets) {
  for (const id in playerBets) {
    if (playerBets[id] === "raise" || !playerBets[id]) {
      return false;
    }
  }
  return true;
}
module.exports = pokerRef;

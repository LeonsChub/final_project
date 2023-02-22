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
const { compareHands, getBestHand } = require('./HandRank')

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

      if (gameState.players[bbIndex + 1]) {
        return gameState.players[bbIndex + 1]["id"];
      }
      return gameState.players[0]["id"];

    }
  }

  function smallBlindStart() {
    let index = gameState.roundInfo.sbIndex;
    let playerFolded = gameState.players[index].fold;
    while (playerFolded) {
      index = index + 1;
      if (gameState.players[index]) {

        playerFolded = gameState.players[index].fold;
      } else {
        index = -1
      }
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
        const bestHands = []
        gameState.players.forEach(player => {
          if (!player.fold) {
            bestHands.push({ id: player.id, hand: getBestHand(player.cards, gameState.community) })
          }
        })

        let winningHand = bestHands[0].hand

        bestHands.forEach((playerHand, index) => {
          if (index !== 0) {
            console.log('player hand', playerHand.hand)
            winningHand = compareHands(playerHand.hand, winningHand)
          }
        })
        bestHands.forEach((playerHand) => {
          let same = true
          playerHand.hand.cards.forEach((card, index) => {
            if (card.suit !== winningHand.cards[index].suit || card.value !== winningHand.cards[index].value) {
              same = false;
            }
          })
          if (same) {
            newGame(playerHand.id)
          }
        })
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

  function checkDefaultWinner() {
    let folded = 0;
    Object.entries(gameState.playerBets).forEach(bet => {
      if (bet[1] === "fold") {
        folded = folded + 1;
      }
    })

    if (folded + 1 === Object.entries(gameState.playerBets).length) {
      const winningBet = Object.entries(gameState.playerBets).filter(bet => {
        return bet[1] !== "fold"
      })

      return winningBet[0]
    }
  }

  function newGame(winnerId) {
    const winnerIndex = gameState.players.findIndex(player => {
      return player.id === winnerId
    })

    gameState.players[winnerIndex].addChips(gameState.pot)

    reloadTable()
  }

  function reloadTable() {
    gameState.pot = 0
    gameState.players.forEach(player => {
      player.resetStake()
    })
    const { bbIndex, sbIndex } = gameState.roundInfo
    const nextBb = bbIndex + 1 >= gameState.players.length ? 0 : bbIndex + 1
    const nextSb = sbIndex + 1 >= gameState.players.length ? 0 : sbIndex + 1

    const prevBlind = gameState.blind
    gameState.burned = []
    gameState.community = []
    gameState.deck = shuffleDeck(initDeck())
    gameState.blind = prevBlind * 2;
    gameState.gameStage = "";
    gameState.minimumBet = gameState.blind
    gameState.playerBets = {}
    gameState.roundInfo = {
      activePlayer: "",
      bbIndex: nextBb,
      nextPlayer: "",
      sbIndex: nextSb
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
        gameState.minimumBet = gameState.blind;
        const { sbIndex, bbIndex } = gameState.roundInfo;

        addToPot(gameState.players[sbIndex].setSmallBlind(gameState.blind)); // get small blind entry and add it to pot in game state
        addToPot(gameState.players[bbIndex].setBigBlind(gameState.blind)); // get small blind entry and add it to pot in game state

        gameState.players.forEach((player) => {
          player.updateGap(gameState.minimumBet);
        });

        gameState.players.forEach((p) => (gameState.playerBets[p.id] = ""));
        gameState.roundInfo.activePlayer = determineFirst();
        gameState.roundInfo.nextPlayer = determineNext();
        gameState.gameStage = "preflop";


        io.to(roomId).emit("handing cards", gameState); // update
      }
    });
    socket.on("bet placed", (data) => {
      const decoded = authToken(data.auth);
      if (decoded) {
        const playerIndex = gameState.players.findIndex(
          (p) => p.id === decoded.user_id
        );

        switch (data.bet.type) {
          case "fold":
            gameState.players[playerIndex].setFold();
            gameState.playerBets[decoded.user_id] = "fold";
            if (checkDefaultWinner()) {
              const winnerId = checkDefaultWinner()[0]
              newGame(winnerId)
            }
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
              Object.entries(gameState.playerBets).forEach((bet) => {
                if (bet[1] === 'raise') {
                  gameState.playerBets[bet[0]] = "check"
                }
                if (bet[1] === 'fold') {
                  gameState.playerBets[bet[0]] = "fold"
                }
                if (bet[1] === 'check') {
                  gameState.playerBets[bet[0]] = ""
                }
              }
              );

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
      sockets = sockets.filter(sock => sock.id !== socket.id)
      socket.off("bet placed", () => { });
      socket.off("init round", () => { });
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

  let sockets = [socket];
  initListeners(socket);

  function joinSocket(socket) {
    const alreadyListening = sockets.filter(sock => {
      return sock.id === socket.id
    }).length > 0

    if (!alreadyListening) {
      sockets.push(socket)
      initListeners(socket)
    }
  }


  return joinSocket;
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

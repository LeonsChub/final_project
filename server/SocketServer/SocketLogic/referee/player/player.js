const Player = (name, id, chips = 1000) => {
  const player = {
    name: name,
    id: id,
    chips: chips,
    stake: 0,
    stakeGap: 0,
    cards: [],
    score: [],
    fold: false,
    ready: false,
    allIn: false,
    specialAttrs: [],
    win: false,
  };

  return player;
};

module.exports = Player;

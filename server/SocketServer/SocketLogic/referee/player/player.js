class Player {
  constructor(name, id, chips = 1000) {
    this.name = name;
    this.id = id;
    this.chips = chips;
    this.stake = 0;
    this.stakeGap = 0;
    this.cards = [];
    this.score = [];
    this.fold = false;
    this.ready = false;
    this.allIn = false;
    this.specialAttrs = [];
    this.win = false;
  }

  setCards(cards) {
    if (this.cards.length < 2) {
      this.cards = [...cards];
    }
  }
  setSmallBlind(blind) {
    // set player as being the small blind
    this.specialAttrs.push("small blind");
    this.stake = blind / 2;
    this.chips = this.chips - blind / 2;

    return blind / 2;
  }
  setBigBlind(blind) {
    // set player as being the small blind
    this.specialAttrs.push("big blind");
    this.stake = blind;
    this.chips = this.chips - blind;

    return blind;
  }
}

module.exports = Player;

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
    this.minEntry = 20;
  }

  setCards(cards) {
    if (this.cards.length < 2) {
      this.cards = [...cards];
    }
  }
  setSmallBlind() {
    // set player as being the small blind
    this.specialAttrs.push("small blind");
    this.stake = this.minEntry / 2;
    this.chips = this.chips - this.minEntry / 2;

    return this.minEntry / 2;
  }
  setBigBlind() {
    // set player as being the small blind
    this.specialAttrs.push("big blind");
    this.stake = this.minEntry;
    this.chips = this.chips - this.minEntry;

    return this.minEntry / 2;
  }
}

module.exports = Player;

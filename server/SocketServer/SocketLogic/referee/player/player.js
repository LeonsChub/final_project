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
  setFold() {
    this.fold = true;
  }
  callBet() {
    if (this.stakeGap) {
      console.log("calling");
      this.stake = this.stake + this.stakeGap;
      this.chips = this.chips - this.stakeGap;
      const toReturn = this.stakeGap;
      this.stakeGap = 0;

      return toReturn;
    } else {
      return 0;
    }
  }
  raise(raise) {
    if (raise > this.stakeGap) {
      console.log("raising");
      this.chips = parseInt(this.chips) - (parseInt(raise) - this.stake);
      this.stake = parseInt(raise);
      this.stakeGap = 0;

      return parseInt(raise);
    } else {
      return 0;
    }
  }
  updateGap(minimumBet) {
    this.stakeGap = minimumBet - this.stake;
  }
  resetStake() {
    this.stake = 0;
    this.stakeGap = 0;
  }
  addChips(chips) {
    this.chips += chips;
  }
}

module.exports = Player;

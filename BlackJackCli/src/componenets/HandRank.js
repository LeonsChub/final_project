function getBestHand(playerCards, communityCards) {
  // Create an array of all 7 cards
  const allCards = playerCards.concat(communityCards);

  // Create an array to store the different hand combinations
  const combinations = [];

  // Generate all combinations of 5 cards
  for (let i = 0; i < allCards.length - 4; i++) {
    for (let j = i + 1; j < allCards.length - 3; j++) {
      for (let k = j + 1; k < allCards.length - 2; k++) {
        for (let l = k + 1; l < allCards.length - 1; l++) {
          for (let m = l + 1; m < allCards.length; m++) {
            combinations.push([
              allCards[i],
              allCards[j],
              allCards[k],
              allCards[l],
              allCards[m],
            ]);
          }
        }
      }
    }
  }

  // Create an array to store the ranks of each hand combination
  const ranks = [];

  // Loop through each hand combination
  for (let i = 0; i < combinations.length; i++) {
    const combination = combinations[i];

    // Create an object to store the count of each card value
    const count = {};
    for (let j = 0; j < combination.length; j++) {
      if (count[combination[j].value]) {
        count[combination[j].value]++;
      } else {
        count[combination[j].value] = 1;
      }
    }

    // Create an array to store the count of each card value
    const values = [];
    for (let key in count) {
      values.push(count[key]);
    }

    // Sort the values array in descending order
    values.sort((a, b) => b - a);

    // Check for a royal flush
    let royalFlush = true;
    for (let j = 0; j < combination.length; j++) {
      if (
        combination[j].value !== 10 + j ||
        combination[j].suit !== combination[0].suit
      ) {
        royalFlush = false;
        break;
      }
    }
    if (royalFlush) {
      ranks.push({ rank: 10, cards: combination });
      continue;
    }

    // Check for a straight flush
    let straightFlush = true;
    for (let j = 0; j < combination.length - 1; j++) {
      if (
        combination[j].value - 1 !== combination[j + 1].value ||
        combination[j].suit !== combination[j + 1].suit
      ) {
        straightFlush = false;
        break;
      }
    }
    if (straightFlush) {
      ranks.push({ rank: 9, cards: combination });
      continue;
    }

    // Check for four of a kind
    let fourOfAKind = false;
    if (values[0] === 4) {
      fourOfAKind = true;
      for (let key in count) {
        if (count[key] === 4) {
          ranks.push({
            rank: 8,
            cards: combination,
            fourOfAKindValue: parseInt(key),
          });
          break;
        }
      }
    }

    // Check for a full house
    if (!fourOfAKind && values[0] === 3 && values[1] === 2) {
      let threeOfAKindValue, twoOfAKindValue;
      for (let key in count) {
        if (count[key] === 3) {
          threeOfAKindValue = parseInt(key);
        } else if (count[key] === 2) {
          twoOfAKindValue = parseInt(key);
        }
      }
      ranks.push({
        rank: 7,
        cards: combination,
        threeOfAKindValue,
        twoOfAKindValue,
      });
      continue;
    }

    // Check for a flush
    let flush = true;
    for (let j = 0; j < combination.length - 1; j++) {
      if (combination[j].suit !== combination[j + 1].suit) {
        flush = false;
        break;
      }
    }
    if (flush) {
      ranks.push({ rank: 6, cards: combination });
      continue;
    }

    // Check for a straight
    let straight = true;
    for (let j = 0; j < combination.length - 1; j++) {
      if (combination[j].value - 1 !== combination[j + 1].value) {
        straight = false;
        break;
      }
    }
    if (straight) {
      ranks.push({ rank: 5, cards: combination });
      continue;
    }

    // Check for three of a kind
    if (values[0] === 3) {
      let threeOfAKindValue;
      for (let key in count) {
        if (count[key] === 3) {
          threeOfAKindValue = parseInt(key);
          break;
        }
      }
      ranks.push({ rank: 4, cards: combination, threeOfAKindValue });
      continue;
    }

    // Check for two pairs
    if (values[0] === 2 && values[1] === 2) {
      let firstPairValue, secondPairValue;
      let first = true;
      for (let key in count) {
        if (count[key] === 2) {
          if (first) {
            firstPairValue = parseInt(key);
            first = false;
          } else {
            secondPairValue = parseInt(key);
            break;
          }
        }
      }
      ranks.push({
        rank: 3,
        cards: combination,
        firstPairValue,
        secondPairValue,
      });
      continue;
    }

    // Check for one pair
    if (values[0] === 2) {
      let pairValue;
      for (let key in count) {
        if (count[key] === 2) {
          pairValue = parseInt(key);
          break;
        }
      }
      ranks.push({ rank: 2, cards: combination, pairValue });
      continue;
    }

    // High card
    let highCard = combination[combination.length - 1].value;
    ranks.push({ rank: 1, cards: combination, highCard });
  }

  ranks.sort((a, b) => b.rank - a.rank);

  return ranks[0];
}

function compareHands(hand1, hand2) {
  if (hand1.rank > hand2.rank) {
    return hand1;
  } else if (hand1.rank < hand2.rank) {
    return hand2;
  } else {
    switch (hand1.rank) {
      case 10:
      case 9:
      case 6:
      case 5:
        return hand1.cards[4].value > hand2.cards[4].value ? hand1 : hand2;
      case 8:
        return hand1.fourOfAKindValue > hand2.fourOfAKindValue ? hand1 : hand2;
      case 7:
        if (hand1.threeOfAKindValue > hand2.threeOfAKindValue) {
          return hand1;
        } else if (hand1.threeOfAKindValue < hand2.threeOfAKindValue) {
          return hand2;
        } else {
          return hand1.twoOfAKindValue > hand2.twoOfAKindValue ? hand1 : hand2;
        }
      case 4:
      case 3:
        return hand1.pairValue > hand2.pairValue ? hand1 : hand2;
      case 2:
        if (hand1.firstPairValue > hand2.firstPairValue) {
          return hand1;
        } else if (hand1.firstPairValue < hand2.firstPairValue) {
          return hand2;
        } else {
          if (hand1.secondPairValue > hand2.secondPairValue) {
            return hand1;
          } else if (hand1.secondPairValue < hand2.secondPairValue) {
            return hand2;
          } else {
            return hand1.highCardValue > hand2.highCardValue ? hand1 : hand2;
          }
        }
      case 1:
        for (let i = 4; i >= 0; i--) {
          if (hand1.cards[i].value > hand2.cards[i].value) {
            return hand1;
          } else if (hand1.cards[i].value < hand2.cards[i].value) {
            return hand2;
          }
        }
        return hand1;
    }
  }
}

const renderDailyGame = () => {
    function getRandomIntInclusive(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const firstCard = getRandomIntInclusive(1,3)
    let grill = getRandomIntInclusive(1,3);
    while(grill === firstCard){
        grill = getRandomIntInclusive(1,3)
    }
    const secondCard = grill

    grill = getRandomIntInclusive(1,3);
    while(grill === firstCard || grill === secondCard){
        grill = getRandomIntInclusive(1,3)
    }
    const thirdCard = grill

    return [firstCard, secondCard,thirdCard]
  };
  export default renderDailyGame;
  
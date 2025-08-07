const SYMBOLS = ["C", "L", "O", "W"]; // Cherry, Lemon, Orange, Watermelon
const REWARDS = {
  C: 10,
  L: 20,
  O: 30,
  W: 40,
};

const randomRoll = () => {
  return [
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
    SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)],
  ];
};

function isWin(result) {
  return result[0] === result[1] && result[1] === result[2];
}

const shouldCheat = (credits) => {
  if (credits >= 40 && credits <= 60) return Math.random() < 0.3;
  if (credits > 60) return Math.random() < 0.6;
  return false;
};

const generateRollResult = (currentCredits) => {
  let result = randomRoll();

  if (isWin(result) && shouldCheat(currentCredits)) {
    console.log("rerolling win");
    result = randomRoll();
  }

  const won = isWin(result);
  const reward = won ? REWARDS[result[0]] : 0;

  console.log(result, won, reward);

  return { result, won, reward };
};

export const gameService = {
  generateRollResult,
};

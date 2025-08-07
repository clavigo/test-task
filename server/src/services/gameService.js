const sessions = new Map();

const SYMBOLS = ["C", "L", "O", "W"]; // Cherry, Lemon, Orange, Watermelon
const REWARDS = {
  C: 10,
  L: 20,
  O: 30,
  W: 40,
};

const createSession = (sessionId) => {
  const session = { credits: 10 };
  sessions.set(sessionId, session);
  return session;
};

const getSession = (sessionId) => {
  return sessions.get(sessionId);
};

const updateSession = (sessionId, data) => {
  if (!sessions.has(sessionId)) return null;

  const session = sessions.get(sessionId);
  Object.assign(session, data);

  return session;
};

const deleteSession = (sessionId) => {
  sessions.delete(sessionId);
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

function spin(currentCredits) {
  let result = randomRoll();

  console.log("random roll", result);

  const shouldCheat = () => {
    if (currentCredits >= 40 && currentCredits <= 60) {
      return Math.random() < 0.3;
    } else if (currentCredits > 60) {
      return Math.random() < 0.6;
    }
    return false;
  };

  if (isWin(result) && shouldCheat()) {
    console.log("reroll");
    result = randomRoll();
  }

  const won = isWin(result);
  const reward = won ? REWARDS[result[0]] : 0;

  console.log(result, won, reward);

  return { result, won, reward };
}

export const gameService = {
  createSession,
  getSession,
  updateSession,
  deleteSession,
  spin,
};

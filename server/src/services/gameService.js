const sessions = new Map();

const createSession = (sessionId) => {
  const session = { credits: 10 };
  sessions.set(sessionId, session);
  return session;
};

export const gameService = {
  createSession,
};

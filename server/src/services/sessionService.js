const sessions = new Map();

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

export const sessionService = {
  createSession,
  getSession,
  updateSession,
  deleteSession,
};

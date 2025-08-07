import { gameService } from "../services/gameService.js";
import { tokenUtils } from "../utils/tokenUtils.js";

const startSession = (req, res) => {
  const sessionId = tokenUtils.generateToken();
  const session = gameService.createSession(sessionId);

  console.log(sessionId);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ credits: session.credits });
};

const spin = (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = gameService.getSession(sessionId);

  if (!session) {
    return res.status(401).json({ error: "Session not found" });
  }

  if (session.credits < 1) {
    return res.status(400).json({ error: "Not enough credits" });
  }

  session.credits--;

  gameService.updateSession(sessionId, session.credits);

  const { result, won, reward } = gameService.spin(session.credits);

  console.log("spin:", result, won, reward);

  if (won) {
    session.credits += reward;
    gameService.updateSession(sessionId, session.credits);
  }

  res.json({
    result, // наприклад: ['C', 'C', 'C']
    won,
    reward,
    credits: session.credits,
  });
};

export const gameController = {
  startSession,
  spin,
};

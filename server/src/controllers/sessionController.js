import { sessionService } from "../services/sessionService.js";
import { tokenUtils } from "../utils/tokenUtils.js";

const startSession = (req, res) => {
  const sessionId = tokenUtils.generateToken();
  const session = sessionService.createSession(sessionId);

  console.log(sessionId);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ credits: session.credits });
};

const handleSpin = (req, res) => {
  const sessionId = req.cookies.sessionId;

  const session = sessionService.getSession(sessionId);

  if (!session) {
    return res.status(401).json({ error: "Session not found" });
  }

  if (session.credits < 1) {
    return res.status(400).json({ error: "Not enough credits" });
  }

  session.credits--;

  const { result, won, reward } = sessionService.generateRollResult(
    session.credits
  );

  if (won) {
    session.credits += reward;
  }

  sessionService.updateSession(sessionId, session.credits);

  return res.json({
    result,
    won,
    reward,
    credits: session.credits,
  });
};

export const sessionController = {
  startSession,
  handleSpin,
};

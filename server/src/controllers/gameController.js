import { gameService } from "../services/gameService.js";
import { sessionService } from "../services/sessionService.js";

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

  const { result, won, reward } = gameService.generateRollResult(
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

export const gameController = {
  handleSpin,
};

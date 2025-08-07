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

const handleTopUpAccount = (req, res) => {
  const sessionId = req.cookies.sessionId;
  const { topUpAmount } = req.body;

  const session = sessionService.getSession(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  session.credits += topUpAmount;

  sessionService.updateSession(sessionId, session.credits);

  res.json({ credits: session.credits });
};

export const sessionController = {
  startSession,
  handleTopUpAccount,
};

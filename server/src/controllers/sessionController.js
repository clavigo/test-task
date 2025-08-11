import { sessionService } from "../services/sessionService.js";
import { tokenUtils } from "../utils/tokenUtils.js";

const startSession = (req, res) => {
  let sessionId = req.cookies.sessionId;

  if (sessionId && sessionService.getSession(sessionId)) {
    // The session already exists
    const session = sessionService.getSession(sessionId);
    return res.json({
      credits: session.credits,
      balance: session.balance,
    });
  }

  // If there is no session, create a new one
  sessionId = tokenUtils.generateToken();
  const session = sessionService.createSession(sessionId);

  res.cookie("sessionId", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({
    credits: session.credits,
    balance: session.balance,
  });
};

const handleTopUpCredits = (req, res) => {
  const sessionId = req.cookies.sessionId;
  const { creditsAmount } = req.body;
  const session = sessionService.getSession(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  session.credits += creditsAmount;

  sessionService.updateSession(sessionId, session.credits);

  res.json({ credits: session.credits });
};

const handleCashOut = (req, res) => {
  const sessionId = req.cookies.sessionId;
  const session = sessionService.getSession(sessionId);

  if (!session) {
    return res.status(404).json({ error: "Session not found" });
  }

  session.balance += session.credits;
  session.credits = 0;

  sessionService.deleteSession(sessionId);

  res.clearCookie("sessionId", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.json("deleted");
};

export const sessionController = {
  startSession,
  handleTopUpCredits,
  handleCashOut,
};

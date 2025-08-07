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

export const sessionController = {
  startSession,
};

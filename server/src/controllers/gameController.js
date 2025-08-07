import { gameService } from "../services/gameService.js";

const createSession = (req, res) => {
  const token = gameService.generateToken();

  console.log(token);

  res.cookie("sessionId", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.json({ message: token });
};

export const gameController = {
  createSession,
};

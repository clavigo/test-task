import crypto from "crypto";

function generateToken() {
  const token = crypto.randomBytes(32).toString("hex");

  return token;
}

export const gameService = { generateToken };

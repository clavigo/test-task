import bcrypt from "bcrypt";

const users = new Map();

const registerUser = async (username, password) => {
  if (users.has(username)) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.set(username, { username, passwordHash });
};

const validateUser = async (username, password) => {
  const user = users.get(username);

  if (!user) return false;

  return await bcrypt.compare(password, user.passwordHash);
};

export const userService = {
  registerUser,
  validateUser,
};

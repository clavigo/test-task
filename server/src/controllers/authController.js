import { userService } from "../services/userService.js";
import { generateToken } from "../utils/jwtUtils.js";

const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  try {
    await userService.registerUser(username, password);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  const isValid = await userService.validateUser(username, password);

  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken({ username });

  res.json({ token });
};

export const authController = {
  register,
  login,
};

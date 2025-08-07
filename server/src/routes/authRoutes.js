import express from "express";
import { authController } from "../controllers/authController.js";

export const authRouter = new express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);

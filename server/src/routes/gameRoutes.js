import express from "express";
import { gameController } from "../controllers/gameController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const gameRouter = new express.Router();

gameRouter.post("/spin", authMiddleware, gameController.handleSpin);

import express from "express";
import { gameController } from "../controllers/gameController.js";

export const gameRouter = new express.Router();

gameRouter.post("/spin", gameController.handleSpin);

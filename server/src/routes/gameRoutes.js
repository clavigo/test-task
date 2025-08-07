import express from "express";
import { gameController } from "../controllers/gameController.js";

export const gameRouter = new express.Router();

gameRouter.get("/", gameController.startSession);

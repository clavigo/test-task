import express from "express";
import { sessionController } from "../controllers/sessionController.js";

export const sessionRouter = new express.Router();

sessionRouter.get("/game", sessionController.startSession);
sessionRouter.get("/game/spin", sessionController.handleSpin);

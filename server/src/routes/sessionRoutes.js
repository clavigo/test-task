import express from "express";
import { sessionController } from "../controllers/sessionController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export const sessionRouter = new express.Router();

sessionRouter.get("/", authMiddleware, sessionController.startSession);
sessionRouter.post("/topUp", sessionController.handleTopUpAccount);

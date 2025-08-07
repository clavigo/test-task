import express from "express";
import { sessionController } from "../controllers/sessionController.js";

export const sessionRouter = new express.Router();

sessionRouter.get("/", sessionController.startSession);

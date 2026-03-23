import { Router } from "express";
import { migrationController } from "../controllers/migrationController";

export const migrationRoutes = Router();
migrationRoutes.post("/start", migrationController.start);
migrationRoutes.get("/stream/:sessionId", migrationController.stream);
migrationRoutes.get("/result/:sessionId", migrationController.result);
migrationRoutes.get("/download/:sessionId", migrationController.download);

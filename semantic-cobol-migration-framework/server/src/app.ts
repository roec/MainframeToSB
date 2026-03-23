import express from "express";
import cors from "cors";
import { migrationRoutes } from "./routes/migrationRoutes";

export const createApp = () => {
  const app = express();
  app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:5173" }));
  app.use(express.json({ limit: "2mb" }));
  app.get("/health", (_req, res) => res.json({ status: "ok" }));
  app.use("/api/migration", migrationRoutes);
  return app;
};

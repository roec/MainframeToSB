import type { Request, Response } from "express";
import { migrationService } from "../services/migrationService";
import { eventBus } from "../services/eventBus";
import { streamProjectZip } from "../services/zipService";

export const migrationController = {
  start: async (req: Request, res: Response) => {
    const sourceCode = String(req.body?.sourceCode ?? "").trim();
    if (!sourceCode) return res.status(400).json({ error: "sourceCode is required" });
    const session = migrationService.createSession(sourceCode);
    void migrationService.run(session.id);
    return res.json({ sessionId: session.id, status: "started" });
  },
  stream: (req: Request, res: Response) => {
    const { sessionId } = req.params;
    const session = migrationService.getSession(sessionId);
    if (!session) return res.status(404).end();
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    const unsub = eventBus.subscribe(sessionId, (event) => {
      res.write(`data: ${JSON.stringify(event)}\n\n`);
    });
    req.on("close", () => unsub());
  },
  result: (req: Request, res: Response) => {
    const session = migrationService.getSession(req.params.sessionId);
    if (!session) return res.status(404).json({ error: "session not found" });
    res.json(session);
  },
  download: async (req: Request, res: Response) => {
    const session = migrationService.getSession(req.params.sessionId);
    if (!session) return res.status(404).json({ error: "session not found" });
    if (session.status !== "completed" || !session.generatedProject) return res.status(409).json({ error: "session not completed" });
    await streamProjectZip(res, session.generatedProject, `spring-boot-migration-${session.id}.zip`);
  }
};

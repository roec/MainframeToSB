import { v4 as uuidv4 } from "uuid";
import type { MigrationSession } from "../models/migration";
import { sessionStore } from "./sessionStore";
import { eventBus } from "./eventBus";
import { logger } from "../utils/logger";
import { InventoryAgent } from "../agents/InventoryAgent";
import { CobolParserAgent } from "../agents/CobolParserAgent";
import { UseCaseMapperAgent } from "../agents/UseCaseMapperAgent";
import { DomainModelerAgent } from "../agents/DomainModelerAgent";
import { JpaPersistenceAgent } from "../agents/JpaPersistenceAgent";
import { CodeGeneratorAgent } from "../agents/CodeGeneratorAgent";
import { ValidationAgent } from "../agents/ValidationAgent";
import { generatedProjectService } from "./generatedProjectService";

const milestones = [
  { name: "InventoryAgent", progress: 15, stage: "Inventory complete" },
  { name: "CobolParserAgent", progress: 30, stage: "COBOL parsing complete" },
  { name: "UseCaseMapperAgent", progress: 45, stage: "Use case mapping complete" },
  { name: "DomainModelerAgent", progress: 60, stage: "Domain modeling complete" },
  { name: "JpaPersistenceAgent", progress: 75, stage: "JPA persistence design complete" },
  { name: "CodeGeneratorAgent", progress: 90, stage: "Code generation complete" },
  { name: "ValidationAgent", progress: 100, stage: "Completed" }
];

const agents = [new InventoryAgent(), new CobolParserAgent(), new UseCaseMapperAgent(), new DomainModelerAgent(), new JpaPersistenceAgent(), new CodeGeneratorAgent(), new ValidationAgent()];

const now = () => new Date().toISOString();

export const migrationService = {
  createSession(sourceCode: string) {
    const id = uuidv4();
    const session: MigrationSession = { id, sourceCode, status: "running", progress: 5, currentStage: "Session initialized", ir: {}, agentSteps: agents.map((a) => ({ id: a.name, name: a.name, status: "pending", input: {}, output: {}, logs: [] })), auditLogs: [{ timestamp: now(), level: "info", message: "Session started", stage: "init" }], createdAt: now(), updatedAt: now() };
    sessionStore.set(session);
    return session;
  },
  getSession: (id: string) => sessionStore.get(id),
  async run(sessionId: string) {
    const session = sessionStore.require(sessionId);
    const ctx: Record<string, any> = {};
    eventBus.publish(sessionId, { type: "session-started", sessionId, timestamp: now() });
    for (const [i, agent] of agents.entries()) {
      const startedAt = now();
      eventBus.publish(sessionId, { type: "agent-status", sessionId, agentName: agent.name, status: "running", startedAt });
      try {
        const output = await agent.run(session, ctx);
        ctx[agent.name.replace("Agent", "").replace(/^./, (c) => c.toLowerCase())] = output;
        if (agent.name === "CobolParserAgent") {
          session.ir = (output as any) ?? {};
          ctx.programIR = (output as any).programIR;
          ctx.dataIR = (output as any).dataIR;
          ctx.logicIR = (output as any).logicIR;
          eventBus.publish(sessionId, { type: "ir-update", sessionId, ir: session.ir });
        }
        if (agent.name === "CodeGeneratorAgent") {
          session.generatedProject = generatedProjectService.fromArtifacts(ctx);
        }
        const m = milestones[i];
        session.progress = m.progress;
        session.currentStage = m.stage;
        session.updatedAt = now();
        session.auditLogs.push({ timestamp: now(), level: "info", message: `${agent.name} completed`, stage: agent.name });
        eventBus.publish(sessionId, { type: "agent-output", sessionId, agentName: agent.name, output });
        eventBus.publish(sessionId, { type: "agent-status", sessionId, agentName: agent.name, status: "completed", startedAt, finishedAt: now() });
        eventBus.publish(sessionId, { type: "progress", sessionId, progress: session.progress, currentStage: session.currentStage, timestamp: now() });
        eventBus.publish(sessionId, { type: "log", sessionId, log: session.auditLogs.at(-1) });
      } catch (error: any) {
        session.status = "failed";
        session.currentStage = `Failed at ${agent.name}`;
        const message = error?.message ?? "Unknown error";
        session.auditLogs.push({ timestamp: now(), level: "error", message, stage: agent.name });
        eventBus.publish(sessionId, { type: "failed", sessionId, currentStage: session.currentStage, error: message });
        logger.error("Migration failed", error);
        return;
      }
    }
    session.status = "completed";
    session.progress = 100;
    session.currentStage = "Completed";
    session.updatedAt = now();
    eventBus.publish(sessionId, { type: "completed", sessionId, progress: 100, currentStage: "Completed", files: session.generatedProject?.files ?? [] });
  }
};

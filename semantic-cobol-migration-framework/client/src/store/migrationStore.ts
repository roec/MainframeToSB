import { create } from "zustand";
import type { AgentStep, AuditLog, GeneratedFile, MigrationStatus, ProgramIR, DataIR, LogicIR } from "../types/migration";

type MigrationStore = {
  sourceCode: string;
  sessionId?: string;
  status: MigrationStatus;
  progress: number;
  currentStage: string;
  agentSteps: AgentStep[];
  ir: { programIR?: ProgramIR; dataIR?: DataIR; logicIR?: LogicIR };
  generatedFiles: GeneratedFile[];
  selectedFilePath?: string;
  auditLogs: AuditLog[];
  error?: string;
  setSourceCode: (value: string) => void;
  startSession: (sessionId: string) => void;
  updateFromEvent: (event: any) => void;
  selectFile: (path: string) => void;
  reset: () => void;
};

const initial = {
  sourceCode: "",
  status: "idle" as MigrationStatus,
  progress: 0,
  currentStage: "Idle",
  agentSteps: [],
  ir: {},
  generatedFiles: [],
  auditLogs: []
};

export const useMigrationStore = create<MigrationStore>((set, get) => ({
  ...initial,
  setSourceCode: (value) => set({ sourceCode: value }),
  startSession: (sessionId) => set({ ...initial, sessionId, status: "running", currentStage: "Session Initialized", progress: 5 }),
  updateFromEvent: (event) => {
    if (!event || typeof event !== "object") return;
    const e: any = event;
    if (e.type === "progress") set({ progress: e.progress, currentStage: e.currentStage });
    if (e.type === "agent-status") {
      const steps = [...get().agentSteps];
      const idx = steps.findIndex((s) => s.name === e.agentName);
      const step = idx >= 0 ? steps[idx] : { id: e.agentName, name: e.agentName, status: "pending", input: {}, output: {}, logs: [] };
      step.status = e.status;
      step.startedAt = e.startedAt ?? step.startedAt;
      step.finishedAt = e.finishedAt ?? step.finishedAt;
      if (idx >= 0) steps[idx] = step; else steps.push(step);
      set({ agentSteps: steps });
    }
    if (e.type === "agent-output") {
      const steps = get().agentSteps.map((s) => s.name === e.agentName ? { ...s, output: e.output } : s);
      set({ agentSteps: steps });
    }
    if (e.type === "ir-update") set({ ir: e.ir });
    if (e.type === "log") set({ auditLogs: [...get().auditLogs, e.log] });
    if (e.type === "completed") set({ status: "completed", progress: 100, currentStage: "Completed", generatedFiles: e.files ?? get().generatedFiles });
    if (e.type === "failed") set({ status: "failed", error: e.error, currentStage: "Failed" });
  },
  selectFile: (path) => set({ selectedFilePath: path }),
  reset: () => set({ ...initial })
}));

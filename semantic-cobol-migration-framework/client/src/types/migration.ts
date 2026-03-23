export type MigrationStatus = "idle" | "running" | "completed" | "failed";
export type AgentStatus = "pending" | "running" | "completed" | "failed";

export type AgentStep = {
  id: string;
  name: string;
  status: AgentStatus;
  input: unknown;
  output: unknown;
  logs: string[];
  startedAt?: string;
  finishedAt?: string;
  error?: string;
};

export type ProgramIR = {
  programName?: string;
  divisions: string[];
  sections: string[];
  dependencies: string[];
  entryPoints: string[];
  fileReferences: string[];
};

export type DataIR = {
  workingStorage: Array<{ name: string; type: string; pic?: string; usage?: string }>;
  records: Array<{ name: string; fields: Array<{ name: string; type: string; length?: number }> }>;
};

export type LogicIR = {
  paragraphs: Array<{ name: string; purpose: string; operations: string[] }>;
  businessRules: string[];
  inferredUseCases: string[];
};

export type AuditLog = { timestamp: string; level: "info" | "warn" | "error"; message: string; stage?: string };
export type GeneratedFile = { path: string; content: string; language: string };
export type MigrationSession = {
  id: string;
  sourceCode: string;
  status: MigrationStatus;
  progress: number;
  currentStage: string;
  ir: { programIR?: ProgramIR; dataIR?: DataIR; logicIR?: LogicIR };
  agentSteps: AgentStep[];
  generatedProject?: { files: GeneratedFile[] };
  auditLogs: AuditLog[];
  createdAt: string;
  updatedAt: string;
};

import type { AgentStep } from "../../types/migration";
import { formatJson } from "../../lib/utils";
export const AgentCard = ({ step }: { step: AgentStep }) => <div className="border border-slate-700 rounded p-3"><div className="font-semibold">{step.name} - {step.status}</div><pre className="text-xs overflow-auto max-h-40">{formatJson(step.output)}</pre></div>;

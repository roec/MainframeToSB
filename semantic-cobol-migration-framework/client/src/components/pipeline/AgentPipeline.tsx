import type { AgentStep } from "../../types/migration";
import { AgentCard } from "./AgentCard";
export const AgentPipeline = ({ steps }: { steps: AgentStep[] }) => <div className="grid gap-2">{steps.map((s) => <AgentCard key={s.id} step={s} />)}</div>;

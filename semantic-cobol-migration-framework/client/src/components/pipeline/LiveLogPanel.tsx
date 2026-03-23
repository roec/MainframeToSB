import type { AuditLog } from "../../types/migration";
export const LiveLogPanel = ({ logs }: { logs: AuditLog[] }) => <div className="max-h-64 overflow-auto text-xs font-mono bg-slate-950 border border-slate-700 rounded p-2">{logs.map((l, i) => <div key={i}>[{l.timestamp}] {l.level.toUpperCase()} {l.stage ? `[${l.stage}]` : ""} {l.message}</div>)}</div>;

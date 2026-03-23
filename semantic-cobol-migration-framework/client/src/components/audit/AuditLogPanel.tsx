import type { AuditLog } from "../../types/migration";
export const AuditLogPanel = ({ logs }: { logs: AuditLog[] }) => <div className="max-h-96 overflow-auto text-xs font-mono">{logs.map((l, i) => <div key={i}>{l.timestamp} | {l.level} | {l.stage ?? "-"} | {l.message}</div>)}</div>;

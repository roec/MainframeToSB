import { StatusBadge } from "../common/StatusBadge";
export const AppHeader = ({ status }: { status: string }) => (
  <header className="border-b border-slate-800 p-4 flex justify-between items-center">
    <div>
      <h1 className="text-xl font-bold">Semantic COBOL to Spring Boot Migration Framework</h1>
      <p className="text-sm text-slate-400">DeepSeek-powered Agentic Migration Studio</p>
    </div>
    <StatusBadge status={status} />
  </header>
);

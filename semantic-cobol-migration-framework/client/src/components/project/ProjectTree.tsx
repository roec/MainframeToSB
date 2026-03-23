import type { GeneratedFile } from "../../types/migration";
export const ProjectTree = ({ files, onSelect }: { files: GeneratedFile[]; onSelect: (path: string) => void }) => <div className="text-sm border border-slate-700 rounded p-2 max-h-80 overflow-auto">{files.map((f) => <div className="cursor-pointer hover:text-cyan-300" key={f.path} onClick={() => onSelect(f.path)}>{f.path}</div>)}</div>;

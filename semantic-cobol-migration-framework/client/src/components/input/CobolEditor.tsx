export const CobolEditor = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <textarea className="w-full h-96 bg-slate-950 border border-slate-700 rounded p-3 font-mono text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
);

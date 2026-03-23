export const ProgressSummary = ({ progress, stage }: { progress: number; stage: string }) => (
  <div>
    <div className="flex justify-between text-sm"><span>{stage}</span><span>{progress}%</span></div>
    <div className="w-full bg-slate-800 rounded h-2"><div className="bg-cyan-500 h-2 rounded" style={{ width: `${progress}%` }} /></div>
  </div>
);

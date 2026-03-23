const stages = ["Inventory", "COBOL Parser", "Use Case Mapper", "Domain Modeler", "JPA Persistence", "Code Generator", "Validation"];
export const StageTimeline = ({ current }: { current: string }) => <div className="text-xs text-slate-300">{stages.map((s) => <div key={s} className={current.includes(s) ? "text-cyan-300" : ""}>• {s}</div>)}</div>;

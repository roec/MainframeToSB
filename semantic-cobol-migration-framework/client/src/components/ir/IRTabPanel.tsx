import { JsonCodeBlock } from "./JsonCodeBlock";
export const IRTabPanel = ({ ir }: { ir: any }) => <div className="grid md:grid-cols-3 gap-2"><JsonCodeBlock value={ir.programIR} /><JsonCodeBlock value={ir.dataIR} /><JsonCodeBlock value={ir.logicIR} /></div>;

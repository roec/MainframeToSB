import { FileUploadButton } from "./FileUploadButton";
export const SourceActionBar = ({ onLoadSample, onClear, onRun, onLoadFile }: { onLoadSample: () => void; onClear: () => void; onRun: () => void; onLoadFile: (v: string) => void }) => (
  <div className="flex gap-2 flex-wrap">
    <FileUploadButton onLoaded={onLoadFile} />
    <button className="px-3 py-2 border rounded" onClick={onLoadSample}>Load sample</button>
    <button className="px-3 py-2 border rounded" onClick={onClear}>Clear</button>
    <button className="px-3 py-2 border rounded bg-emerald-700" onClick={onRun}>Run Semantic Migration</button>
  </div>
);

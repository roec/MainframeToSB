export const FileUploadButton = ({ onLoaded }: { onLoaded: (value: string) => void }) => (
  <label className="cursor-pointer text-sm px-3 py-2 rounded border border-slate-600 inline-block">
    Upload
    <input className="hidden" type="file" accept=".cob,.cbl,.txt" onChange={async (e) => {
      const f = e.target.files?.[0];
      if (!f) return;
      onLoaded(await f.text());
    }} />
  </label>
);

export const CopyButton = ({ value }: { value: string }) => <button className="text-xs px-2 py-1 border rounded" onClick={() => navigator.clipboard.writeText(value)}>Copy</button>;

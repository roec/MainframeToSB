import { getDownloadUrl } from "../../lib/api";
export const DownloadPanel = ({ sessionId, enabled }: { sessionId?: string; enabled: boolean }) => <button disabled={!enabled || !sessionId} className="px-3 py-2 border rounded disabled:opacity-50" onClick={() => sessionId && window.open(getDownloadUrl(sessionId), "_blank")}>Download Spring Boot ZIP</button>;

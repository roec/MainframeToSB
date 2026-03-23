import type { MigrationSession } from "../types/migration";

const API_BASE = "http://localhost:4000/api/migration";

export const startMigration = async (sourceCode: string): Promise<{ sessionId: string; status: string }> => {
  const res = await fetch(`${API_BASE}/start`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sourceCode })
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const fetchResult = async (sessionId: string): Promise<MigrationSession> => {
  const res = await fetch(`${API_BASE}/result/${sessionId}`);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
};

export const getStreamUrl = (sessionId: string) => `${API_BASE}/stream/${sessionId}`;
export const getDownloadUrl = (sessionId: string) => `${API_BASE}/download/${sessionId}`;

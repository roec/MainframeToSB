import { useCallback, useMemo } from "react";
import { startMigration, getStreamUrl } from "../lib/api";
import { useMigrationStore } from "../store/migrationStore";
import { useSSE } from "./useSSE";

export const useMigrationRunner = () => {
  const { sourceCode, sessionId, startSession, updateFromEvent } = useMigrationStore();
  const run = useCallback(async () => {
    const res = await startMigration(sourceCode);
    startSession(res.sessionId);
  }, [sourceCode, startSession]);

  const streamUrl = useMemo(() => (sessionId ? getStreamUrl(sessionId) : undefined), [sessionId]);
  useSSE(streamUrl, updateFromEvent, Boolean(sessionId));

  return { run };
};

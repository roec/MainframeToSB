import { useEffect } from "react";

export const useSSE = (url: string | undefined, onMessage: (data: unknown) => void, enabled = true) => {
  useEffect(() => {
    if (!url || !enabled) return;
    const source = new EventSource(url);
    source.onmessage = (evt) => {
      try { onMessage(JSON.parse(evt.data)); } catch { onMessage(evt.data); }
    };
    return () => source.close();
  }, [url, enabled, onMessage]);
};

type Listener = (event: any) => void;
class EventBus {
  private listeners = new Map<string, Set<Listener>>();
  subscribe(sessionId: string, listener: Listener) {
    const set = this.listeners.get(sessionId) ?? new Set<Listener>();
    set.add(listener); this.listeners.set(sessionId, set);
    return () => set.delete(listener);
  }
  publish(sessionId: string, event: any) { this.listeners.get(sessionId)?.forEach((l) => l(event)); }
}
export const eventBus = new EventBus();

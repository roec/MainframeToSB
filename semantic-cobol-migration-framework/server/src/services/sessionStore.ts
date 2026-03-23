import type { MigrationSession } from "../models/migration";

class SessionStore {
  private sessions = new Map<string, MigrationSession>();
  set(session: MigrationSession) { this.sessions.set(session.id, session); }
  get(id: string) { return this.sessions.get(id); }
  require(id: string) { const s = this.get(id); if (!s) throw new Error("Session not found"); return s; }
}

export const sessionStore = new SessionStore();

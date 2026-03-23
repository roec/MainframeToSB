import type { MigrationSession } from "../models/migration";

export abstract class BaseAgent {
  constructor(public readonly name: string) {}
  abstract run(session: MigrationSession, context: Record<string, unknown>): Promise<unknown>;
}

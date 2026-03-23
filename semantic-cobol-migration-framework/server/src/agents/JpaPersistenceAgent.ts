import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";
export class JpaPersistenceAgent extends BaseAgent {
  constructor() { super("JpaPersistenceAgent"); }
  async run(_s: any, ctx: any) {
    const fallback = { jpaEntities: ["CustomerEntity"], repositories: ["CustomerRepository"], tableMappings: [{ table: "customers" }], notes: [] };
    return orchestrator.invoke(this.name, PromptBuilder.persistence(ctx.dataIR, ctx.domain), fallback);
  }
}

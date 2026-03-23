import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";
export class DomainModelerAgent extends BaseAgent {
  constructor() { super("DomainModelerAgent"); }
  async run(_s: any, ctx: any) {
    const fallback = { entities: ["Customer"], valueObjects: [], enums: ["CustomerStatus"], domainServices: ["CustomerDomainService"], businessRules: ["Customer id must exist"] };
    return orchestrator.invoke(this.name, PromptBuilder.domain(ctx.programIR, ctx.dataIR, ctx.logicIR, ctx.useCase), fallback);
  }
}

import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";

export class UseCaseMapperAgent extends BaseAgent {
  constructor() { super("UseCaseMapperAgent"); }
  async run(_s: any, ctx: any) {
    const fallback = { useCases: ["Get customer by id"], applicationServices: ["CustomerApplicationService#getById"], restEndpoints: [{ method: "GET", path: "/api/customers/{id}", purpose: "Customer lookup" }], requestDtos: [{ name: "CustomerRequest" }], responseDtos: [{ name: "CustomerResponse" }] };
    return orchestrator.invoke(this.name, PromptBuilder.useCase(ctx.programIR, ctx.dataIR, ctx.logicIR), fallback);
  }
}

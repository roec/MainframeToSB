import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";
export class CodeGeneratorAgent extends BaseAgent {
  constructor() { super("CodeGeneratorAgent"); }
  async run(_s: any, ctx: any) {
    const fallback = { packageName: "com.example.migrationdemo", files: [{ path: "src/main/java/...", purpose: "Generated" }] };
    return orchestrator.invoke(this.name, PromptBuilder.generator(ctx.useCase, ctx.domain, ctx.persistence), fallback);
  }
}

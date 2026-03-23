import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";
export class ValidationAgent extends BaseAgent {
  constructor() { super("ValidationAgent"); }
  async run(_s: any, ctx: any) {
    const fallback = { isValid: true, warnings: [], errors: [], summary: "Artifacts are coherent." };
    return orchestrator.invoke(this.name, PromptBuilder.validation(ctx.generatedFilesMetadata), fallback);
  }
}

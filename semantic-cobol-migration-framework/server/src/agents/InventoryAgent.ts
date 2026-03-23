import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";

export class InventoryAgent extends BaseAgent {
  constructor() { super("InventoryAgent"); }
  async run(session: any) {
    const fallback = { programName: "CUSTINQ", divisions: ["IDENTIFICATION", "DATA", "PROCEDURE"], sections: ["WORKING-STORAGE"], fileReferences: [], copybooks: [], dependencies: [], entryPoints: ["MAIN-PARA"], businessPurpose: "Customer inquiry" };
    return orchestrator.invoke(this.name, PromptBuilder.inventory(session.sourceCode), fallback);
  }
}

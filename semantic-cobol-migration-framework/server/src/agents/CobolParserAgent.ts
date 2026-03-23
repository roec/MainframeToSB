import { BaseAgent } from "./BaseAgent";
import { PromptBuilder } from "../llm/PromptBuilder";
import { orchestrator } from "../services/migrationServiceDeps";

export class CobolParserAgent extends BaseAgent {
  constructor() { super("CobolParserAgent"); }
  async run(session: any, context: any) {
    const fallback = {
      programIR: { programName: "CUSTINQ", divisions: ["IDENTIFICATION", "DATA", "PROCEDURE"], sections: ["WORKING-STORAGE"], dependencies: [], entryPoints: ["MAIN-PARA"], fileReferences: [] },
      dataIR: { workingStorage: [{ name: "WS-CUSTOMER-ID", type: "number", pic: "9(9)" }, { name: "WS-CUSTOMER-NAME", type: "string", pic: "X(50)" }], records: [] },
      logicIR: { paragraphs: [{ name: "FETCH-CUSTOMER", purpose: "Lookup customer", operations: ["READ", "DISPLAY"] }], businessRules: ["Customer id must exist"], inferredUseCases: ["Customer inquiry"] }
    };
    return orchestrator.invoke(this.name, PromptBuilder.parser(session.sourceCode, context.inventory), fallback);
  }
}

import { businessLogicHints } from "./businessLogicHints";
import { dataMappings } from "./dataMappings";
import { historicalExamples } from "./historicalExamples";
import { migrationRules } from "./migrationRules";
import { techTemplates } from "./techTemplates";

export class KnowledgeBaseService {
  getContext(agentName: string) {
    return { agentName, migrationRules, dataMappings, businessLogicHints, techTemplates, historicalExamples };
  }
}

import { DeepSeekClient } from "./DeepSeekClient";
import { KnowledgeBaseService } from "../knowledge/KnowledgeBaseService";

export class LLMOrchestrator {
  constructor(private readonly client: DeepSeekClient, private readonly kb: KnowledgeBaseService) {}
  async invoke(agentName: string, prompt: { system: string; user: string }, fallback: unknown) {
    try {
      const context = this.kb.getContext(agentName);
      const raw = await this.client.chat(prompt.system, `${prompt.user}\nKB:${JSON.stringify(context)}`);
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }
}

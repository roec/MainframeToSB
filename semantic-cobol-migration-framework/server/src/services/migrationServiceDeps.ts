import { DeepSeekClient } from "../llm/DeepSeekClient";
import { LLMOrchestrator } from "../llm/LLMOrchestrator";
import { KnowledgeBaseService } from "../knowledge/KnowledgeBaseService";

const client = new DeepSeekClient(process.env.DEEPSEEK_API_KEY ?? "", process.env.DEEPSEEK_MODEL ?? "deepseek-chat", process.env.DEEPSEEK_BASE_URL ?? "https://api.deepseek.com");
export const orchestrator = new LLMOrchestrator(client, new KnowledgeBaseService());

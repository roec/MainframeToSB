# Semantic COBOL to Spring Boot Migration Framework

Enterprise full-stack demo for semantic COBOL modernization using a DeepSeek-driven multi-agent pipeline.

## What this app does
- Accepts COBOL source (paste/upload).
- Runs a staged migration pipeline with SSE live progress.
- Produces Program IR, Data IR, Logic IR, agent outputs, logs, and generated Spring Boot project files.
- Enables downloadable `.zip` export of generated Spring Boot + JPA + REST project.

## Architecture Overview
- **Frontend**: React + TypeScript + Vite + Tailwind + Zustand.
- **Backend**: Express + TypeScript + SSE + archiver.
- **LLM Layer**: DeepSeek client abstraction + prompt builder + orchestrator + local RAG-like knowledge sources.
- **Generation Layer**: Hybrid deterministic Spring Boot templates enriched by agent outputs.

## Project Structure
- `semantic-cobol-migration-framework/client`: UI and SSE-driven migration studio.
- `semantic-cobol-migration-framework/server`: orchestration, agents, knowledge base, project generation, zip download.

## Setup
### Prerequisites
- Node.js 20+
- npm 10+

### Environment
Copy `semantic-cobol-migration-framework/server/.env.example` to `.env` in the `server/` folder and configure:

```env
PORT=4000
CLIENT_URL=http://localhost:5173
DEEPSEEK_API_KEY=your_deepseek_api_key_here
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_BASE_URL=https://api.deepseek.com
```

### Run backend
```bash
cd semantic-cobol-migration-framework/server
npm install
npm run dev
```

### Run frontend
```bash
cd semantic-cobol-migration-framework/client
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`, backend on `http://localhost:4000`.

## DeepSeek Integration Note
- DeepSeek calls are encapsulated in `server/src/llm/DeepSeekClient.ts`.
- Missing/invalid API keys degrade safely to deterministic fallback outputs so demos remain functional.

## Zip Download Flow
When pipeline reaches completed state, frontend enables download button calling:
`GET /api/migration/download/:sessionId`
The backend streams an in-memory ZIP archive with generated Spring Boot project files.

## Example Usage Flow
1. Load sample COBOL.
2. Click **Run Semantic Migration**.
3. Track progress, stage timeline, live logs, and agent cards.
4. Inspect IR, project tree, and generated Java files.
5. Download generated ZIP.

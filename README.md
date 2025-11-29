# AURA – Autonomous Unified Review Agent

AI-Driven Developer Productivity & Autonomous QA Agent for Any Codebase.

This repo contains:
- `backend/` – Express + TypeScript API with sample agents
- `frontend/` – Next.js UI to trigger analysis and view results

## Quick Start

### Backend

```bash
cd backend
pnpm install         # or npm install / yarn
cp .env.example .env # create env file and add LLM_API_KEY if using real LLM
pnpm dev
````

Backend will run on `http://localhost:4000`.

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

Frontend will run on `http://localhost:3000`.

Open the UI, paste any repo URL (mocked in current version), and click “Run AURA”.

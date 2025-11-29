# AURA – Autonomous Unified Review Agent

AI-Driven Developer Productivity & Autonomous QA Agent for Any Codebase.

This repo contains:
- `backend/` – Express + TypeScript API with sample agents.
- `frontend/` – Next.js UI to trigger analysis and view results.

The current implementation is mock-first: the backend returns a deterministic snapshot so you can interact with the UI without external services. If you add an `OPENAI_API_KEY`, the agents will attempt to call the LLM; otherwise they gracefully fall back to stubbed responses.

## Prerequisites
- Node.js 18+
- npm 8+ (pnpm/yarn also work if installed)

## Environment
Create a backend `.env` file based on `.env.example` (not committed). Important variables:

```
PORT=4000
OPENAI_API_KEY=your-key-if-available
GITHUB_TOKEN=optional-token
```

The frontend proxies requests to the backend using `BACKEND_URL` (or `NEXT_PUBLIC_BACKEND_URL`). Defaults to `http://localhost:4000` for local development.

## Quick Start

### Backend
```
cd backend
npm install          # or pnpm install / yarn
cp .env.example .env # set PORT/OPENAI_API_KEY if desired
npm run dev          # starts on http://localhost:4000
```

### Frontend
```
cd frontend
npm install
BACKEND_URL=http://localhost:4000 npm run dev
```
Frontend runs on `http://localhost:3000`. Open the UI, paste any repo URL (mocked analysis), and click **Run AURA**.

## Development Notes
- Next.js API route (`/api/analysis/run`) proxies to the backend, so the browser never needs direct backend URLs.
- Types for analysis results are shared across components to keep the UI resilient to backend changes.
- If no `OPENAI_API_KEY` is provided, backend agents emit safe fallback content.

## Project Scripts
Top-level `package.json` includes workspace tooling; run commands inside each package (npm shown, but pnpm/yarn equivalents work):
- `npm run dev` (frontend/backend) – start development servers.
- `npm run build` – build the respective package.
- `npm run lint` (frontend) – run Next.js linting.

## Repo Map
- `backend/src` – Express server, routes, agent implementations, and simple heuristics.
- `frontend/src/components` – UI primitives (form, logo, summary cards).
- `frontend/src/pages` – Next.js pages and API proxy.

Enjoy experimenting with AURA!

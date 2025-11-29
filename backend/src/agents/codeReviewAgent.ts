import { RepoSnapshot } from "../core/repoAnalyzer";
import { callLLM } from "../core/llmClient";

export interface CodeReviewComment {
  file: string;
  line?: number;
  severity: "info" | "warning" | "error";
  message: string;
  suggestion?: string;
}

export async function runCodeReviewAgent(snapshot: RepoSnapshot): Promise<CodeReviewComment[]> {
  const fileList = snapshot.files
    .map(f => `- ${f.path} (${f.language}, ~${f.linesOfCode} LOC)`)
    .join("\n");

  const prompt = `
You are AURA, an autonomous code review agent.
You see the following repository snapshot:

${fileList}

Generate a list of potential review comments focusing on:
- maintainability
- potential bugs
- security smells

Reply in JSON array of objects with:
{ "file": string, "severity": "info"|"warning"|"error", "message": string, "suggestion"?: string }.
If you don't see anything serious, still include a few improvement ideas.
`;

  const content = await callLLM([
    { role: "system", content: "You are a senior staff engineer with strong code review skills." },
    { role: "user", content: prompt }
  ]);

  try {
    const parsed = JSON.parse(content) as CodeReviewComment[];
    return parsed;
  } catch {
    // fallback: wrap text in a single 'info' comment
    return [
      {
        file: "GENERAL",
        severity: "info",
        message: "LLM output (non-JSON): " + content.slice(0, 300)
      }
    ];
  }
}

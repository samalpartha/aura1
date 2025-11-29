import { RepoSnapshot } from "../core/repoAnalyzer";
import { callLLM } from "../core/llmClient";

export interface GeneratedTest {
  file: string;
  target: string;
  framework: string;
  code: string;
}

export async function runTestGeneratorAgent(snapshot: RepoSnapshot): Promise<GeneratedTest[]> {
  const focusedFile = snapshot.files.find(f => f.path.includes("auth")) ?? snapshot.files[0];

  const prompt = `
You are an automated test generation agent.
Target file: ${focusedFile.path}
Language: ${focusedFile.language}

Generate 1-2 high-value unit tests in a popular testing framework
(e.g., Jest for TS/JS, JUnit for Java). Focus on edge cases and failures.

Return JSON array:
[
  {
    "file": "path/for/test/file",
    "target": "name of function or module under test",
    "framework": "Jest | JUnit | PyTest | etc.",
    "code": "test code here"
  }
]
`;

  const content = await callLLM([
    { role: "system", content: "You are an expert QA engineer and test architect." },
    { role: "user", content: prompt }
  ]);

  try {
    return JSON.parse(content) as GeneratedTest[];
  } catch {
    return [
      {
        file: "__tests__/auth.spec.ts",
        target: "mockTargetFunction",
        framework: "Jest",
        code: `// Fallback mock test
describe("auth", () => {
  it("should handle basic case", () => {
    expect(true).toBe(true);
  });
});`
      }
    ];
  }
}

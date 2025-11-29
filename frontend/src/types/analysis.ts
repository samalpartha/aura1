export interface FileSummary {
  path: string;
  language: string;
  linesOfCode: number;
}

export interface RepoSnapshot {
  repoUrl: string;
  branch: string;
  files: FileSummary[];
}

export interface CodeReview {
  file: string;
  line?: number;
  severity: "info" | "warning" | "error";
  message: string;
  suggestion?: string;
}

export interface GeneratedTest {
  file: string;
  target: string;
  framework: string;
  code: string;
}

export interface RegressionRisk {
  module: string;
  riskScore: number;
  rationale: string;
}

export interface AnalysisReport {
  snapshot: RepoSnapshot;
  reviews: CodeReview[];
  tests: GeneratedTest[];
  risks: RegressionRisk[];
}

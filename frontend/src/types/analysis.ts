export interface CodeReview {
  file: string;
  severity: "error" | "warning";
  message: string;
  suggestion?: string;
}

export interface GeneratedTest {
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
  snapshot: any; // Keep snapshot as any for now
  reviews: CodeReview[];
  tests: GeneratedTest[];
  risks: RegressionRisk[];
}

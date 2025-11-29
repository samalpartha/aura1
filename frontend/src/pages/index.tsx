import { useState } from "react";
import { Container, Heading, Text, Flex } from "@radix-ui/themes";
import { AuraLogo } from "@/components/AuraLogo";
import { RepoForm } from "@/components/RepoForm";
import { RepoSummaryCard } from "@/components/RepoSummaryCard";
import { AnalysisReport } from "@/types/analysis";

export default function Home() {
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleAnalyze = async (repoUrl: string) => {
    setIsPending(true);
    setError(null);
    setReport(null);

    try {
      const res = await fetch("/api/analysis/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoUrl })
      });

      if (!res.ok) {
        const errBody = await res.json();
        throw new Error(errBody.error || "Failed to run analysis");
      }

      const data: AnalysisReport = await res.json();
      setReport(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main>
      <Container size="3" py="8">
        <Flex direction="column" align="center" gap="2">
          <AuraLogo />
          <Heading as="h2" size="5" weight="light" color="gray">Autonomous Code Analysis</Heading>
        </Flex>

        <RepoForm onSubmit={handleAnalyze} isPending={isPending} />

        {error && <Text color="red" mt="4">Error: {error}</Text>}

        <RepoSummaryCard report={report} />

      </Container>
    </main>
  );
}

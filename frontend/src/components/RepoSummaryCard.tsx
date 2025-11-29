import { Heading, Section, Flex, Card, Text, Code, Badge } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { AnalysisReport } from "@/types/analysis";

interface RepoSummaryCardProps {
  report: AnalysisReport | null;
}

export function RepoSummaryCard({ report }: RepoSummaryCardProps) {
  if (!report) return null;

  const riskColor = (score: number) => (score > 0.6 ? "red" : score > 0.3 ? "yellow" : "green");

  return (
    <Flex direction="column" gap="5" mt="6">
      <Section size="1">
        <Heading as="h2" size="6" mb="3">Code Review</Heading>
        <Flex direction="column" gap="3">
          {report.reviews.map((r, i) => (
            <Card key={i}>
              <Flex gap="3" align="start">
                <ExclamationTriangleIcon color={r.severity === 'error' ? 'red' : 'orange'} />
                <Text size="2">
                  <Code>{r.file}</Code>: {r.message}
                  {r.suggestion && <Text as="p" color="gray">Suggestion: {r.suggestion}</Text>}
                </Text>
              </Flex>
            </Card>
          ))}
        </Flex>
      </Section>

      <Section size="1">
        <Heading as="h2" size="6" mb="3">Generated Tests</Heading>
        {report.tests.map((t, i) => (
          <Card key={i}>
            <Heading as="h3" size="3">Test for <Code>{t.target}</Code></Heading>
            <Text size="1" color="gray" as="p">Framework: {t.framework}</Text>
            <pre><code>{t.code}</code></pre>
          </Card>
        ))}
      </Section>

      <Section size="1">
        <Heading as="h2" size="6" mb="3">Regression Risks</Heading>
        <Flex direction="column" gap="3">
          {report.risks.map((risk, i) => (
            <Card key={i}>
              <Flex align="center" justify="between">
                <Code>{risk.module}</Code>
                <Badge color={riskColor(risk.riskScore)} radius="full">
                  {(risk.riskScore * 100).toFixed(0)}% Risk
                </Badge>
              </Flex>
              <Text as="p" size="2" color="gray">{risk.rationale}</Text>
            </Card>
          ))}
        </Flex>
      </Section>
    </Flex>
  );
}

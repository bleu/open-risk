import type { EvaluationValue } from "@/types";

/**
 * Chaos Labs — Oracle accuracy & freshness scores (0-100).
 * Source: Chaos Labs Oracle Risk Portal (community.chaoslabs.xyz).
 * Snapshot: 2026-06-10
 */
export const chaoslabsOracleEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  chainlink: { accuracy: 95, freshness: 88 },
  chronicle: { accuracy: 91, freshness: 85 },
  winklink: { accuracy: 72, freshness: 65 },
  redstone: { accuracy: 89, freshness: 92 },
  pyth: { accuracy: 93, freshness: 96 },
};

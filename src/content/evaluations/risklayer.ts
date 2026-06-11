import type { EvaluationValue } from "@/types";

/**
 * RiskLayer protocol risk scores (mocked from risklayer.online dashboard).
 * Metrics: score (overall 0-10 risk score)
 *
 * Source: https://risklayer.online/protocols
 * Last fetched: 2026-06-11
 */
export const risklayerEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  curve: { score: 6.7 },
  aave: { score: 5.9 },
  compound: { score: 5.9 },
  pendle: { score: 5.7 },
  spark: { score: 4.9 },
  "rocket-pool": { score: 4.8 },
  morpho: { score: 4.8 },
  lido: { score: 4.2 },
  uniswap: { score: 4.0 },
};

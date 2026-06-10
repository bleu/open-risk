import type { EvaluationValue } from "@/types";

/**
 * DeFiSafety — Process Quality Review oracle scores (0-100).
 * Source: defisafety.com
 * Snapshot: 2026-06-10
 */
export const defisafetyOracleEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  chainlink: { "oracle-score": 92 },
  chronicle: { "oracle-score": 78 },
  winklink: { "oracle-score": 55 },
  redstone: { "oracle-score": 81 },
  pyth: { "oracle-score": 85 },
};

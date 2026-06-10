import type { EvaluationValue } from "@/types";

/**
 * Forta Network — Oracle manipulation alerts & risk level.
 * Source: Forta GraphQL API (api.forta.network).
 * Snapshot: 2026-06-10
 */
export const fortaOracleEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  chainlink: { "alerts-30d": 2, "risk-level": "Low" },
  chronicle: { "alerts-30d": 0, "risk-level": "Low" },
  winklink: { "alerts-30d": 5, "risk-level": "Medium" },
  redstone: { "alerts-30d": 1, "risk-level": "Low" },
  pyth: { "alerts-30d": 1, "risk-level": "Low" },
};

import type { EvaluationValue } from "@/types";

/**
 * DefiLlama — TVS weekly delta derived from /protocols endpoint.
 * Snapshot: 2026-06-10
 */
export const defillamaOracleEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  chainlink: { "tvs-delta": 2.3 },
  chronicle: { "tvs-delta": -1.5 },
  winklink: { "tvs-delta": -4.2 },
  redstone: { "tvs-delta": 8.7 },
  pyth: { "tvs-delta": 5.1 },
};

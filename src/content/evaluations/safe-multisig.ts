import type { EvaluationValue } from "@/types";

/**
 * Safe multisig configuration data.
 * Metric: threshold (displayed as "M/N" e.g. "3/5")
 *
 * To refresh: run `npm run fetch:safe-multisig` and copy values from data/safe-multisig/_index.json
 * To add protocols: add Safe addresses in src/providers/safe-multisig.ts
 * Last fetched: 2026-06-10
 */
export const safeMultisigEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  spark: { threshold: "3/5" },
  aave: { threshold: "5/9" },
  morpho: { threshold: "5/9" },
  curve: { threshold: "5/9" },
  pendle: { threshold: "3/5" },
  lido: { threshold: "3/6" },
};

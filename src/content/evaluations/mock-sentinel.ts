import type { EvaluationValue } from "@/types";

/** Mock provider: letter grade A-F */
export const sentinelEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  aave: { grade: "A" },
  spark: { grade: "A" },
  morpho: { grade: "B" },
  fluid: { grade: "B" },
  euler: { grade: "C" },
  compound: { grade: "A" },
  liquity: { grade: "A" },
  uniswap: { grade: "A" },
  curve: { grade: "B" },
  pendle: { grade: "B" },
  lido: { grade: "A" },
  "rocket-pool": { grade: "B" },
  "cow-swap": { grade: "C" },
  "1inch": { grade: "C" },
  "0x-matcha": { grade: "C" },
  yearn: { grade: "B" },
  mellow: { grade: "C" },
  "morpho-vaults": { grade: "B" },
};

import type { EvaluationValue } from "@/types";

/** Real DeFiScan stage values extracted from data/defiscan/_index.json (Ethereum only) */
export const defiscanEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  spark: { stage: "Stage 0" },
  aave: { stage: "Stage 0" },
  morpho: { stage: "Stage 1" },
  compound: { stage: "Stage 0" },
  liquity: { stage: "Stage 2" },
  uniswap: { stage: "Stage 2" },
  curve: { stage: "Stage 0" },
  pendle: { stage: "Stage 0" },
  lido: { stage: "Stage 0" },
};

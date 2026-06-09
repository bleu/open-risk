import type { EvaluationValue } from "@/types";

/** Mock provider: numeric score 1-10 */
export const riskscaleEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  aave: { score: 8 },
  spark: { score: 7 },
  morpho: { score: 7 },
  fluid: { score: 6 },
  gearbox: { score: 5 },
  euler: { score: 6 },
  compound: { score: 8 },
  liquity: { score: 9 },
  uniswap: { score: 9 },
  curve: { score: 7 },
  balancer: { score: 6 },
  "1inch": { score: 5 },
  pendle: { score: 6 },
  lido: { score: 8 },
  "rocket-pool": { score: 7 },
  yearn: { score: 6 },
  "morpho-vaults": { score: 7 },
};

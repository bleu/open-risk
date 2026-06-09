import type { EvaluationValue } from "@/types";

/** Mock provider: risk level Low / Medium / High */
export const threatlabEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  aave: { risk: "Low" },
  spark: { risk: "Low" },
  fluid: { risk: "Medium" },
  gearbox: { risk: "Medium" },
  euler: { risk: "Medium" },
  compound: { risk: "Low" },
  liquity: { risk: "Low" },
  uniswap: { risk: "Low" },
  curve: { risk: "Low" },
  balancer: { risk: "Medium" },
  "cow-swap": { risk: "Medium" },
  "0x-matcha": { risk: "High" },
  pendle: { risk: "Medium" },
  lido: { risk: "Low" },
  yearn: { risk: "Medium" },
  mellow: { risk: "High" },
  "morpho-vaults": { risk: "Medium" },
};

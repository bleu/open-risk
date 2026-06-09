import type { EvaluationValue } from "@/types";

/** Real DeFiPunk'd consensus_grade values extracted from data/defipunkd/ */
export const defipunkdEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  aave: {
    control: "orange",
    autonomy: "orange",
    "open-access": "orange",
    verifiability: "green",
  },
  spark: {
    control: null,
    autonomy: "red",
    "open-access": null,
    verifiability: "green",
  },
  morpho: {
    control: "orange",
    autonomy: null,
    "open-access": null,
    verifiability: "green",
  },
  liquity: {
    control: "green",
    autonomy: "green",
    "open-access": "green",
    verifiability: "green",
  },
  uniswap: {
    control: "green",
    autonomy: "green",
    "open-access": "green",
    verifiability: "green",
  },
  curve: {
    control: "green",
    autonomy: "green",
    "open-access": "green",
    verifiability: "green",
  },
  balancer: {
    control: null,
    autonomy: null,
    "open-access": null,
    verifiability: "orange",
  },
  pendle: {
    control: "orange",
    autonomy: "orange",
    "open-access": "green",
    verifiability: "green",
  },
  lido: {
    control: "orange",
    autonomy: "orange",
    "open-access": "green",
    verifiability: "green",
  },
  "rocket-pool": {
    control: "orange",
    autonomy: null,
    "open-access": "green",
    verifiability: "green",
  },
};

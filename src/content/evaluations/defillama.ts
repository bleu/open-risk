import type { EvaluationValue } from "@/types";

/**
 * DeFiLlama protocol data: TVL change, audit status, hack history.
 * Metrics: tvl-delta (% 7d change), audited (1/0), hacks (count), hack-loss (USD)
 *
 * To refresh: run `npm run fetch:defillama` then copy values from data/defillama/_index.json
 * Last fetched: 2026-06-10
 */
export const defillamaEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  spark: { "tvl-delta": -4.6, audited: 1, hacks: 0, "hack-loss": 0 },
  aave: { "tvl-delta": -7.7, audited: 1, hacks: 1, "hack-loss": 862000 },
  morpho: { "tvl-delta": -7.0, audited: 1, hacks: 1, "hack-loss": 250000 },
  fluid: { "tvl-delta": -5.1, audited: 1, hacks: 2, "hack-loss": 8915000 },
  gearbox: { "tvl-delta": -11.1, audited: 1, hacks: 0, "hack-loss": 0 },
  euler: { "tvl-delta": 4.4, audited: 1, hacks: 1, "hack-loss": 197000000 },
  compound: { "tvl-delta": -6.5, audited: 1, hacks: 2, "hack-loss": 159000000 },
  liquity: { "tvl-delta": -3.8, audited: 1, hacks: 0, "hack-loss": 0 },
  uniswap: { "tvl-delta": -8.0, audited: 1, hacks: 0, "hack-loss": 0 },
  curve: { "tvl-delta": -6.9, audited: 1, hacks: 4, "hack-loss": 65515000 },
  balancer: { "tvl-delta": -14.1, audited: 1, hacks: 3, "hack-loss": 129038000 },
  "cow-swap": { "tvl-delta": null, audited: 0, hacks: 0, "hack-loss": 0 },
  "1inch": { "tvl-delta": -9.8, audited: 1, hacks: 2, "hack-loss": 5720000 },
  "0x-matcha": { "tvl-delta": null, audited: 0, hacks: 1, "hack-loss": 13430000 },
  yearn: { "tvl-delta": -9.9, audited: 1, hacks: 4, "hack-loss": 31839000 },
  mellow: { "tvl-delta": -2.6, audited: 1, hacks: 0, "hack-loss": 0 },
  pendle: { "tvl-delta": -15.4, audited: 1, hacks: 0, "hack-loss": 0 },
  lido: { "tvl-delta": -11.2, audited: 1, hacks: 0, "hack-loss": 0 },
  "rocket-pool": { "tvl-delta": 12.5, audited: 1, hacks: 0, "hack-loss": 0 },
};

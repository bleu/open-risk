import type { EvaluationValue } from "@/types";

/**
 * GoPlus token security data.
 * Metrics: verified (source code open), safe-token (not a honeypot)
 *
 * Values are normalized: 1 = safe/good, 0 = risky/bad
 *
 * To refresh: run `npm run fetch:goplus` then copy values from data/goplus/_index.json
 * Last fetched: 2026-06-10
 */
export const goplusEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  aave: { verified: 1, "safe-token": 1 },
  morpho: { verified: 1, "safe-token": 1 },
  fluid: { verified: 1, "safe-token": 1 },
  gearbox: { verified: 1, "safe-token": 1 },
  euler: { verified: 1, "safe-token": 1 },
  compound: { verified: 1, "safe-token": 1 },
  liquity: { verified: 1, "safe-token": 1 },
  uniswap: { verified: 1, "safe-token": 1 },
  curve: { verified: 1, "safe-token": 1 },
  balancer: { verified: 1, "safe-token": 1 },
  "cow-swap": { verified: 1, "safe-token": 1 },
  "1inch": { verified: 1, "safe-token": 1 },
  "0x-matcha": { verified: 1, "safe-token": 1 },
  yearn: { verified: 1, "safe-token": 1 },
  pendle: { verified: 1, "safe-token": 1 },
  lido: { verified: 1, "safe-token": 1 },
  "rocket-pool": { verified: 1, "safe-token": 1 },
};

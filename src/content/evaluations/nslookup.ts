import type { EvaluationValue } from "@/types";

/**
 * NSLookup DNS health scores (0-100) per protocol.
 * Metrics: score (overall), dnssec, caa
 *
 * To refresh: run `npm run fetch:nslookup` then copy values from data/nslookup/_index.json
 * Last fetched: 2026-06-10
 */
export const nslookupEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  spark: { score: 85, dnssec: 100, caa: 71 },
  aave: { score: 77, dnssec: 100, caa: 0 },
  morpho: { score: 72, dnssec: 100, caa: 0 },
  fluid: { score: 88, dnssec: 100, caa: 71 },
  gearbox: { score: 59, dnssec: 100, caa: 0 },
  euler: { score: 93, dnssec: 100, caa: 71 },
  compound: { score: 77, dnssec: 100, caa: 0 },
  liquity: { score: 56, dnssec: 40, caa: 0 },
  uniswap: { score: 88, dnssec: 100, caa: 71 },
  curve: { score: 95, dnssec: 100, caa: 86 },
  balancer: { score: 65, dnssec: 40, caa: 0 },
  "cow-swap": { score: 58, dnssec: 40, caa: 0 },
  "1inch": { score: 77, dnssec: 100, caa: 0 },
  "0x-matcha": { score: 88, dnssec: 100, caa: 71 },
  yearn: { score: 66, dnssec: 40, caa: 0 },
  mellow: { score: 77, dnssec: 100, caa: 0 },
  "morpho-vaults": { score: 72, dnssec: 100, caa: 0 },
  pendle: { score: 77, dnssec: 100, caa: 0 },
  lido: { score: 70, dnssec: 40, caa: 0 },
  "rocket-pool": { score: 67, dnssec: 65, caa: 0 },
};

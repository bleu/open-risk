import type { EvaluationValue } from "@/types";

/**
 * Peg Monitor — stablecoin peg health data.
 * Metrics: peg-deviation (current % off $1.00), max-depeg (worst historical %)
 *
 * Current prices from DeFiLlama /stablecoins API.
 * Max depeg values from historical data / known incidents.
 *
 * Yield-bearing stablecoins (USYC, USDY, BUIDL) have null peg metrics
 * since they are designed to appreciate above $1.
 *
 * Only populated for stablecoin-type tokens; null for all others.
 *
 * Last fetched: 2026-06-10
 */
export const pegMonitorEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  usdt:  { "peg-deviation": -0.08, "max-depeg": -4.7 },
  usdc:  { "peg-deviation": -0.01, "max-depeg": -8.7 },
  usds:  { "peg-deviation": -0.05, "max-depeg": -1.2 },
  usd1:  { "peg-deviation": -0.11, "max-depeg": -0.8 },
  usde:  { "peg-deviation": -0.09, "max-depeg": -1.5 },
  dai:   { "peg-deviation": -0.03, "max-depeg": -8.0 },
  usyc:  { "peg-deviation": null,  "max-depeg": null },   // yield-bearing
  buidl: { "peg-deviation": null,  "max-depeg": null },   // yield-bearing
  pyusd: { "peg-deviation": -0.03, "max-depeg": -0.5 },
  usdg:  { "peg-deviation": -0.01, "max-depeg": -0.3 },
  usdy:  { "peg-deviation": null,  "max-depeg": null },   // yield-bearing
  rlusd: { "peg-deviation": -0.01, "max-depeg": -0.4 },
  usdd:  { "peg-deviation": -0.08, "max-depeg": -8.5 },
  usdf:  { "peg-deviation": -0.52, "max-depeg": -2.1 },
  usdtb: { "peg-deviation": -0.09, "max-depeg": -0.6 },
  u:     { "peg-deviation":  0.00, "max-depeg": -0.3 },
  gho:   { "peg-deviation": -0.10, "max-depeg": -5.2 },
  usd0:  { "peg-deviation": -0.11, "max-depeg": -1.8 },
  tusd:  { "peg-deviation": -0.15, "max-depeg": -5.2 },
  fdusd: { "peg-deviation": -0.28, "max-depeg": -3.1 },
};

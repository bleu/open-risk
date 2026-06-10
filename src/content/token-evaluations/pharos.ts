import type { EvaluationValue } from "@/types";

/**
 * Pharos stablecoin safety scores.
 * Metrics:
 *   safety-grade — letter grade (A+ through F) based on liquidity, resilience,
 *                  decentralization, and dependency risk
 *   safety-score — 0–100 composite score (higher = safer)
 *   dews-score   — Dependency Early Warning System score (lower = calmer)
 *   liquidity    — exit capacity / liquidity score (0–100, higher = better)
 *
 * Source: https://pharos.watch/datasets/scores-latest/latest.json
 * Methodology: safety-score v7.291 | dews v6.08 | liquidity v5.8
 * Only populated for stablecoin-type tokens.
 *
 * Last fetched: 2026-06-10
 */
export const pharosEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  usdt:  { "safety-grade": "B",  "safety-score": 71, "dews-score": 14, liquidity: 63 },
  usdc:  { "safety-grade": "B+", "safety-score": 76, "dews-score": 16, liquidity: 72 },
  usds:  { "safety-grade": "B+", "safety-score": 75, "dews-score": 9,  liquidity: 72 },
  usd1:  { "safety-grade": "B",  "safety-score": 72, "dews-score": 27, liquidity: 60 },
  usde:  { "safety-grade": "C",  "safety-score": 57, "dews-score": 18, liquidity: 55 },
  dai:   { "safety-grade": "B+", "safety-score": 77, "dews-score": 20, liquidity: 61 },
  usyc:  { "safety-grade": "C+", "safety-score": 64, "dews-score": null, liquidity: null },
  buidl: { "safety-grade": "B-", "safety-score": 67, "dews-score": 4,  liquidity: null },
  pyusd: { "safety-grade": "A-", "safety-score": 80, "dews-score": 12, liquidity: 77 },
  usdg:  { "safety-grade": "B",  "safety-score": 72, "dews-score": 17, liquidity: 66 },
  usdy:  { "safety-grade": "C+", "safety-score": 62, "dews-score": null, liquidity: 38 },
  rlusd: { "safety-grade": "B",  "safety-score": 70, "dews-score": 21, liquidity: 58 },
  usdd:  { "safety-grade": "C-", "safety-score": 54, "dews-score": 10, liquidity: 28 },
  usdf:  { "safety-grade": "C",  "safety-score": 59, "dews-score": 23, liquidity: 53 },
  usdtb: { "safety-grade": "C+", "safety-score": 62, "dews-score": 12, liquidity: 67 },
  u:     { "safety-grade": "C",  "safety-score": 59, "dews-score": 3,  liquidity: 53 },
  gho:   { "safety-grade": "B",  "safety-score": 73, "dews-score": 13, liquidity: 78 },
  usd0:  { "safety-grade": "C",  "safety-score": 56, "dews-score": 16, liquidity: 60 },
  tusd:  { "safety-grade": "D",  "safety-score": 48, "dews-score": 12, liquidity: 42 },
  fdusd: { "safety-grade": "C+", "safety-score": 62, "dews-score": 8,  liquidity: 44 },
};

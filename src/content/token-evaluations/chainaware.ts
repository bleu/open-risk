import type { EvaluationValue } from "@/types";

/**
 * ChainAware.ai rug pull safety scores for ERC-20 tokens on Ethereum.
 * Metrics: rug-score (0–100 where higher = safer)
 *
 * Uses dual-pipeline analysis: deployer behavioral history + smart contract
 * code inspection via AST parsing and bytecode analysis.
 *
 * To refresh: query ChainAware Rug Pull Detector API
 * Last fetched: 2026-06-10
 */
export const chainawareEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  // Exchange
  wbt:  { "rug-score": 82 },
  cro:  { "rug-score": 92 },
  nexo: { "rug-score": 88 },
  gt:   { "rug-score": 80 },
  // RWA
  xaut: { "rug-score": 88 },
  // DeFi
  wlfi:   { "rug-score": 60 },
  aave:   { "rug-score": 96 },
  ohm:    { "rug-score": 72 },
  ldo:    { "rug-score": 95 },
  ff:     { "rug-score": 55 },
  pendle: { "rug-score": 90 },
  // Infrastructure
  mnt:  { "rug-score": 85 },
  wld:  { "rug-score": 78 },
  pol:  { "rug-score": 90 },
  h:    { "rug-score": 65 },
  gno:  { "rug-score": 94 },
  strk: { "rug-score": 82 },
  grt:  { "rug-score": 92 },
  // Meme
  floki: { "rug-score": 58 },
  // Stablecoins
  usdt:  { "rug-score": 90 },
  usdc:  { "rug-score": 96 },
  usds:  { "rug-score": 92 },
  usd1:  { "rug-score": 65 },
  usde:  { "rug-score": 85 },
  dai:   { "rug-score": 95 },
  usyc:  { "rug-score": 88 },
  buidl: { "rug-score": 95 },
  pyusd: { "rug-score": 92 },
  usdg:  { "rug-score": 90 },
  usdy:  { "rug-score": 88 },
  rlusd: { "rug-score": 85 },
  usdd:  { "rug-score": 68 },
  usdf:  { "rug-score": 62 },
  usdtb: { "rug-score": 85 },
  u:     { "rug-score": 60 },
  gho:   { "rug-score": 92 },
  usd0:  { "rug-score": 78 },
  tusd:  { "rug-score": 70 },
  fdusd: { "rug-score": 82 },
};

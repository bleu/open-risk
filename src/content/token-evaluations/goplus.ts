import type { EvaluationValue } from "@/types";

/**
 * GoPlus token security data for ERC-20 tokens on Ethereum.
 * Metrics: verified (source code open), safe (not a honeypot),
 *          fixed-supply (cannot mint), immutable (no proxy)
 *
 * Values: 1 = safe/good, 0 = risky/bad
 *
 * To refresh: query GoPlus Token Security API (chain_id=1) per address
 * Last fetched: 2026-06-10
 */
export const goplusTokenEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  // Exchange
  wbt:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  cro:  { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  nexo: { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  gt:   { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  // RWA
  xaut: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  // DeFi
  wlfi:   { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  aave:   { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  ohm:    { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  ldo:    { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  ff:     { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  pendle: { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  // Infrastructure
  mnt:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  wld:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  pol:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  h:    { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  gno:  { verified: 1, safe: 1, "fixed-supply": 1, immutable: 1 },
  strk: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  grt:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  // Meme
  floki: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  // Stablecoins
  usdt:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdc:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usds:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usd1:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usde:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  dai:   { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usyc:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  buidl: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  pyusd: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdg:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdy:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  rlusd: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdd:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdf:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usdtb: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  u:     { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  gho:   { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  usd0:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  tusd:  { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
  fdusd: { verified: 1, safe: 1, "fixed-supply": 0, immutable: 0 },
};

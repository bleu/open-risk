import type { EvaluationValue } from "@/types";

/**
 * Honeypot.is token analysis for ERC-20 tokens on Ethereum.
 * Metrics: safe (not a honeypot, 1=safe/0=honeypot),
 *          buy-tax (% tax on buys), sell-tax (% tax on sells)
 *
 * Simulates buy/sell transactions to detect honeypots and hidden taxes.
 * No API key required.
 *
 * To refresh: query Honeypot.is /v2/IsHoneypot endpoint
 * Last fetched: 2026-06-10
 */
export const honeypotisEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  // Exchange
  wbt:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  cro:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  nexo: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  gt:   { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  // RWA
  xaut: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  // DeFi
  wlfi:   { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  aave:   { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  ohm:    { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  ldo:    { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  ff:     { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  pendle: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  // Infrastructure
  mnt:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  wld:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  pol:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  h:    { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  gno:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  strk: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  grt:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  // Meme
  floki: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  // Stablecoins
  usdt:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdc:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usds:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usd1:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usde:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  dai:   { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usyc:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  buidl: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  pyusd: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdg:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdy:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  rlusd: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdd:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdf:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usdtb: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  u:     { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  gho:   { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  usd0:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  tusd:  { safe: 1, "buy-tax": 0, "sell-tax": 0 },
  fdusd: { safe: 1, "buy-tax": 0, "sell-tax": 0 },
};

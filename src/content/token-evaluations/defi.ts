import type { EvaluationValue } from "@/types";

/**
 * De.Fi Scanner risk assessments for ERC-20 tokens on Ethereum.
 * Metrics: risk (Low / Medium / High)
 *
 * To refresh: query De.Fi Scanner API (scannerProject endpoint)
 * Last fetched: 2026-06-10
 */
export const defiScannerEvaluations: Record<
  string,
  Record<string, EvaluationValue>
> = {
  // Exchange
  wbt:  { risk: "Low" },
  cro:  { risk: "Low" },
  nexo: { risk: "Low" },
  gt:   { risk: "Low" },
  // RWA
  xaut: { risk: "Low" },
  // DeFi
  wlfi:   { risk: "Medium" },
  aave:   { risk: "Low" },
  ohm:    { risk: "Medium" },
  ldo:    { risk: "Low" },
  ff:     { risk: "Medium" },
  pendle: { risk: "Low" },
  // Infrastructure
  mnt:  { risk: "Low" },
  wld:  { risk: "Medium" },
  pol:  { risk: "Low" },
  h:    { risk: "Medium" },
  gno:  { risk: "Low" },
  strk: { risk: "Low" },
  grt:  { risk: "Low" },
  // Meme
  floki: { risk: "Medium" },
  // Stablecoins
  usdt:  { risk: "Low" },
  usdc:  { risk: "Low" },
  usds:  { risk: "Low" },
  usd1:  { risk: "Medium" },
  usde:  { risk: "Low" },
  dai:   { risk: "Low" },
  usyc:  { risk: "Low" },
  buidl: { risk: "Low" },
  pyusd: { risk: "Low" },
  usdg:  { risk: "Low" },
  usdy:  { risk: "Low" },
  rlusd: { risk: "Low" },
  usdd:  { risk: "Medium" },
  usdf:  { risk: "Medium" },
  usdtb: { risk: "Low" },
  u:     { risk: "Medium" },
  gho:   { risk: "Low" },
  usd0:  { risk: "Low" },
  tusd:  { risk: "Medium" },
  fdusd: { risk: "Low" },
};

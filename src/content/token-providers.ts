import type { Provider } from "@/types";

/**
 * Providers for token-level risk analysis.
 *
 * These providers analyze individual token contracts for security properties,
 * unlike the protocol-level providers which assess protocol architecture.
 */
export const TOKEN_PROVIDERS: Provider[] = [
  {
    id: "defillama-token",
    name: "DeFiLlama",
    metrics: [
      { id: "mcap", label: "Mkt Cap", ratingType: "live-mcap" },
      { id: "peg-deviation", label: "Peg", ratingType: "percentage" },
      { id: "max-depeg", label: "Max Depeg", ratingType: "percentage" },
    ],
  },
  {
    id: "pharos",
    name: "Pharos",
    metrics: [
      { id: "safety-grade", label: "Grade", ratingType: "letter" },
      { id: "safety-score", label: "Safety", ratingType: "dns-score" },
      { id: "dews-score", label: "DEWS", ratingType: "warning-score" },
      { id: "liquidity", label: "Liquidity", ratingType: "dns-score" },
    ],
  },
  {
    id: "goplus-token",
    name: "GoPlus",
    metrics: [
      { id: "verified", label: "Verified", ratingType: "boolean" },
      { id: "safe", label: "Safe", ratingType: "boolean" },
      { id: "fixed-supply", label: "Fixed Supply", ratingType: "boolean" },
      { id: "immutable", label: "Immutable", ratingType: "boolean" },
    ],
  },
  {
    id: "defi-scanner",
    name: "De.Fi",
    metrics: [
      { id: "risk", label: "Risk", ratingType: "risk-level" },
    ],
  },
  {
    id: "chainaware",
    name: "ChainAware",
    metrics: [
      { id: "rug-score", label: "Safety", ratingType: "dns-score" },
    ],
  },
];

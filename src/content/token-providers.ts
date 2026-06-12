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
      { id: "mcap", label: "Mkt Cap", ratingType: "live-mcap", description: "Current market capitalization of the token in USD." },
      { id: "peg-deviation", label: "Peg", ratingType: "percentage", description: "Current price deviation from the token's target peg value." },
      { id: "max-depeg", label: "Max Depeg", ratingType: "percentage", description: "Largest recorded price deviation from the token's target peg." },
    ],
  },
  {
    id: "pharos",
    name: "Pharos",
    metrics: [
      { id: "safety-grade", label: "Grade", ratingType: "letter", description: "Overall safety letter grade (A+ to F) combining peg stability, liquidity, and risk factors." },
      { id: "safety-score", label: "Safety", ratingType: "dns-score", description: "Numerical safety score (0–100) measuring stablecoin reliability and risk exposure." },
      { id: "dews-score", label: "DEWS", ratingType: "warning-score", description: "Depeg Early Warning Score — lower values indicate lower risk of an imminent depeg event." },
      { id: "liquidity", label: "Liquidity", ratingType: "dns-score", description: "Liquidity score (0–100) measuring available DEX depth and exit capacity for the token." },
    ],
  },
  {
    id: "goplus-token",
    name: "GoPlus",
    metrics: [
      { id: "verified", label: "Verified", ratingType: "boolean", description: "Whether the token contract source code is verified and publicly readable." },
      { id: "safe", label: "Safe", ratingType: "boolean", description: "Whether the token passes honeypot detection (no hidden transfer restrictions)." },
      { id: "fixed-supply", label: "Fixed Supply", ratingType: "boolean", description: "Whether the token supply is fixed (contract cannot mint new tokens)." },
      { id: "immutable", label: "Immutable", ratingType: "boolean", description: "Whether the token contract is non-upgradeable (no proxy pattern)." },
    ],
  },
  {
    id: "defi-scanner",
    name: "De.Fi",
    metrics: [
      { id: "risk", label: "Risk", ratingType: "risk-level", description: "Smart contract risk level (Low/Medium/High) based on code analysis and known vulnerability patterns." },
    ],
  },
  {
    id: "chainaware",
    name: "ChainAware",
    metrics: [
      { id: "rug-score", label: "Safety", ratingType: "dns-score", description: "Rug pull safety score (0–100, higher is safer) based on deployer behavior and contract analysis." },
    ],
  },
];

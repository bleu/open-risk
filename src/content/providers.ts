import type { Provider } from "@/types";

export const PROVIDERS: Provider[] = [
  {
    id: "defillama",
    name: "DeFiLlama",
    metrics: [
      { id: "tvl", label: "TVL", ratingType: "live-tvl" },
      { id: "tvl-delta", label: "Δ TVL 7d", ratingType: "percentage" },
      { id: "hacks", label: "Hacks", ratingType: "count" },
      { id: "hack-loss", label: "Hack $", ratingType: "currency" },
    ],
  },
  {
    id: "nslookup",
    name: "NSLookup",
    metrics: [
      { id: "score", label: "DNS Score", ratingType: "dns-score" },
      { id: "dnssec", label: "DNSSEC", ratingType: "dns-score" },
      { id: "caa", label: "CAA", ratingType: "dns-score" },
    ],
  },
  {
    id: "defiscan",
    name: "DeFiScan",
    metrics: [{ id: "stage", label: "Stage", ratingType: "stage" }],
  },
  {
    id: "defipunkd",
    name: "DeFiPunk'd",
    metrics: [
      { id: "control", label: "Control", ratingType: "grade" },
      { id: "autonomy", label: "Autonomy", ratingType: "grade" },
      { id: "open-access", label: "Open Access", ratingType: "grade" },
      { id: "verifiability", label: "Verifiability", ratingType: "grade" },
    ],
  },
  {
    id: "goplus",
    name: "GoPlus",
    metrics: [
      { id: "verified", label: "Src Verified", ratingType: "boolean" },
      { id: "safe-token", label: "Token Safe", ratingType: "boolean" },
    ],
  },
  {
    id: "safe-multisig",
    name: "Safe Multisig",
    metrics: [{ id: "threshold", label: "Signers", ratingType: "multisig" }],
  },
  {
    id: "risklayer",
    name: "RiskLayer",
    metrics: [{ id: "score", label: "Risk Score", ratingType: "numeric" }],
  },
];

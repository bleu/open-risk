import type { Provider } from "@/types";

export const PROVIDERS: Provider[] = [
  {
    id: "defillama",
    name: "DeFiLlama",
    metrics: [
      { id: "tvl", label: "TVL", ratingType: "live-tvl", description: "Total value of crypto assets deposited in the protocol's smart contracts." },
      { id: "tvl-delta", label: "Δ TVL 7d", ratingType: "percentage", description: "Percentage change in total value locked over the past 7 days." },
      { id: "hacks", label: "Hacks", ratingType: "count", description: "Number of recorded security incidents (hacks/exploits) for this protocol." },
      { id: "hack-loss", label: "Hack $", ratingType: "currency", description: "Total USD value lost across all recorded hack events." },
    ],
  },
  {
    id: "nslookup",
    name: "NSLookup",
    metrics: [
      { id: "score", label: "DNS Score", ratingType: "dns-score", description: "Overall DNS health score (0–100) for the protocol's frontend domain." },
      { id: "dnssec", label: "DNSSEC", ratingType: "dns-score", description: "DNSSEC deployment score — whether the domain uses DNS Security Extensions to prevent spoofing." },
      { id: "caa", label: "CAA", ratingType: "dns-score", description: "CAA record score — whether the domain restricts which certificate authorities can issue TLS certificates." },
    ],
  },
  {
    id: "defiscan",
    name: "DeFiScan",
    metrics: [{ id: "stage", label: "Stage", ratingType: "stage", description: "Decentralization maturity stage (0/1/2) based on key control, upgradeability, and exit window analysis." }],
  },
  {
    id: "defipunkd",
    name: "DeFiPunk'd",
    metrics: [
      { id: "control", label: "Control", ratingType: "grade", description: "Grade for how concentrated admin and upgrade control is among privileged signers." },
      { id: "autonomy", label: "Autonomy", ratingType: "grade", description: "Grade for the protocol's ability to operate without ongoing human intervention." },
      { id: "open-access", label: "Open Access", ratingType: "grade", description: "Grade for whether the protocol is permissionlessly accessible to all users." },
      { id: "verifiability", label: "Verifiability", ratingType: "grade", description: "Grade for whether the protocol's behavior can be independently verified on-chain." },
    ],
  },
  {
    id: "goplus",
    name: "GoPlus",
    metrics: [
      { id: "verified", label: "Src Verified", ratingType: "boolean", description: "Whether the governance token's smart contract source code is verified on Etherscan." },
      { id: "safe-token", label: "Token Safe", ratingType: "boolean", description: "Whether the governance token passes honeypot detection (no hidden buy/sell restrictions)." },
    ],
  },
  {
    id: "safe-multisig",
    name: "Safe Multisig",
    metrics: [{ id: "threshold", label: "Signers", ratingType: "multisig", description: "Multisig signer threshold (M-of-N) for the protocol's governance Safe." }],
  },
  {
    id: "risklayer",
    name: "RiskLayer",
    metrics: [{ id: "score", label: "Risk Score", ratingType: "numeric", description: "AI-generated risk score (0–10) across dependency, governance, tokenomics, audit, and smart contract dimensions." }],
  },
];

import type { Provider } from "@/types";

export const ORACLE_PROVIDERS: Provider[] = [
  {
    id: "defillama",
    name: "DefiLlama",
    metrics: [
      { id: "tvs-delta", label: "Δ TVS 7d", ratingType: "percentage", description: "Percentage change in total value secured by this oracle over the past 7 days." },
    ],
  },
  {
    id: "chaoslabs",
    name: "Chaos Labs",
    metrics: [
      { id: "accuracy", label: "Accuracy", ratingType: "dns-score", description: "Oracle accuracy score (0–100) measuring how closely reported prices track reference prices." },
      { id: "freshness", label: "Freshness", ratingType: "dns-score", description: "Oracle freshness score (0–100) measuring how quickly price feeds are updated." },
    ],
  },
  {
    id: "defisafety",
    name: "DeFiSafety",
    metrics: [
      { id: "oracle-score", label: "Oracle Score", ratingType: "dns-score", description: "Process Quality Review score (0–100) assessing oracle documentation, testing, and security practices." },
    ],
  },
  {
    id: "forta",
    name: "Forta",
    metrics: [
      { id: "alerts-30d", label: "Alerts 30d", ratingType: "count", description: "Number of security alerts detected by Forta monitoring bots in the last 30 days." },
      { id: "risk-level", label: "Risk", ratingType: "risk-level", description: "Risk level (Low/Medium/High) derived from the severity and frequency of recent security alerts." },
    ],
  },
];

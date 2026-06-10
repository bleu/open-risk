import type { Provider } from "@/types";

export const ORACLE_PROVIDERS: Provider[] = [
  {
    id: "defillama",
    name: "DefiLlama",
    metrics: [
      { id: "tvs-delta", label: "Δ TVS 7d", ratingType: "percentage" },
    ],
  },
  {
    id: "chaoslabs",
    name: "Chaos Labs",
    metrics: [
      { id: "accuracy", label: "Accuracy", ratingType: "dns-score" },
      { id: "freshness", label: "Freshness", ratingType: "dns-score" },
    ],
  },
  {
    id: "defisafety",
    name: "DeFiSafety",
    metrics: [
      { id: "oracle-score", label: "Oracle Score", ratingType: "dns-score" },
    ],
  },
  {
    id: "forta",
    name: "Forta",
    metrics: [
      { id: "alerts-30d", label: "Alerts 30d", ratingType: "count" },
      { id: "risk-level", label: "Risk", ratingType: "risk-level" },
    ],
  },
];

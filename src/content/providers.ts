import type { Provider } from "@/types";

export const PROVIDERS: Provider[] = [
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
    id: "riskscale",
    name: "RiskScale",
    metrics: [{ id: "score", label: "Score", ratingType: "numeric" }],
  },
  {
    id: "sentinel",
    name: "Sentinel",
    metrics: [{ id: "grade", label: "Grade", ratingType: "letter" }],
  },
  {
    id: "threatlab",
    name: "ThreatLab",
    metrics: [{ id: "risk", label: "Risk", ratingType: "risk-level" }],
  },
];

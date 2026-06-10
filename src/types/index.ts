export type ProtocolType =
  | "lending"
  | "dex-amm"
  | "swap-aggregator"
  | "yield-vault"
  | "liquid-staking";

export interface Protocol {
  /** Canonical identifier */
  id: string;
  /** Display name */
  name: string;
  type: ProtocolType;
  /** USD TVL — used for sorting and display */
  tvl: number;
  /** Maps provider id → the slug that provider uses for this protocol (null = not covered) */
  providerSlugs: Record<string, string | null>;
}

export type RatingType =
  | "stage"
  | "grade"
  | "numeric"
  | "letter"
  | "risk-level"
  | "dns-score";

export interface ProviderMetric {
  id: string;
  label: string;
  ratingType: RatingType;
}

export interface Provider {
  id: string;
  name: string;
  metrics: ProviderMetric[];
}

export type EvaluationValue = string | number | null;

/**
 * evaluations[providerId][protocolId][metricId] = value
 */
export type EvaluationMap = Record<
  string,
  Record<string, Record<string, EvaluationValue>>
>;

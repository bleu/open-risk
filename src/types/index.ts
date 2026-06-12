export type ProtocolType =
  | "lending"
  | "dex-amm"
  | "swap-aggregator"
  | "yield-vault"
  | "liquid-staking";

export type TokenType =
  | "defi"
  | "infrastructure"
  | "meme"
  | "exchange"
  | "rwa"
  | "stablecoin";

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
  | "dns-score"
  | "warning-score"
  | "percentage"
  | "boolean"
  | "currency"
  | "count"
  | "multisig"
  | "live-tvl"
  | "live-mcap";

export interface ProviderMetric {
  id: string;
  label: string;
  ratingType: RatingType;
  /** One-sentence factual description of what this metric measures. */
  description?: string;
}

export interface Provider {
  id: string;
  name: string;
  metrics: ProviderMetric[];
}

export interface Token {
  id: string;
  name: string;
  symbol: string;
  type: TokenType;
  /** Market cap in USD — used for sorting and display */
  mcap: number;
  /** Contract address (chain-prefixed if not Ethereum mainnet, e.g. "arbitrum:0x...") */
  address: string | null;
  /** Maps provider id → the slug that provider uses for this token (null = not covered) */
  providerSlugs: Record<string, string | null>;
}

export interface Oracle {
  id: string;
  name: string;
  /** Total Value Secured in USD */
  tvs: number;
  /** Number of DeFi protocols using this oracle */
  protocols: number;
  providerSlugs: Record<string, string | null>;
}

export type EvaluationValue = string | number | null;

/**
 * evaluations[providerId][protocolId][metricId] = value
 */
export type EvaluationMap = Record<
  string,
  Record<string, Record<string, EvaluationValue>>
>;

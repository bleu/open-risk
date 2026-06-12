/**
 * External link embeds for Protocol Profile pages.
 * Maps protocol id → list of links to display below provider cards.
 */
export interface ProtocolEmbed {
  label: string;
  url: string;
}

export const PROTOCOL_EMBEDS: Record<string, ProtocolEmbed[]> = {
  aave: [
    {
      label: "DeFi Sphere — Aave V3 (Ethereum Core)",
      url: "https://app.defi-sphere.com/protocols/aave_v3/ethereum?deployment=core",
    },
  ],
  spark: [
    {
      label: "DeFi Sphere — SparkLend (Ethereum)",
      url: "https://app.defi-sphere.com/protocols/sparklend/ethereum",
    },
  ],
  morpho: [
    {
      label: "DeFi Sphere — Morpho (Ethereum)",
      url: "https://app.defi-sphere.com/protocols/morpho/ethereum",
    },
  ],
  liquity: [
    {
      label: "DeFi Sphere — Liquity V2 (Ethereum)",
      url: "https://app.defi-sphere.com/protocols/liquity_v2/ethereum",
    },
  ],
  compound: [
    {
      label: "DeFi Sphere — Compound V3",
      url: "https://app.defi-sphere.com/protocols/compound_v3",
    },
  ],
};

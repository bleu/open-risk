/**
 * External iframe embeds for Protocol Profile pages.
 * Maps protocol id → list of embeds to display below provider cards.
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
};

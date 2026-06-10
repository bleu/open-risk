import type { Oracle } from "@/types";

/**
 * Top 5 oracles by Total Value Secured (TVS),
 * derived from DefiLlama /protocols endpoint (2026-06-10).
 */
export const ORACLES: Oracle[] = [
  {
    id: "chainlink",
    name: "Chainlink",
    tvs: 44_200_000_000,
    protocols: 28,
    providerSlugs: {
      defillama: "chainlink",
      chaoslabs: "chainlink",
      defisafety: "chainlink",
      forta: "chainlink",
    },
  },
  {
    id: "chronicle",
    name: "Chronicle",
    tvs: 5_800_000_000,
    protocols: 4,
    providerSlugs: {
      defillama: "chronicle",
      chaoslabs: "chronicle",
      defisafety: "chronicle",
      forta: "chronicle",
    },
  },
  {
    id: "winklink",
    name: "WINkLink",
    tvs: 3_000_000_000,
    protocols: 2,
    providerSlugs: {
      defillama: "winklink",
      chaoslabs: "winklink",
      defisafety: "winklink",
      forta: "winklink",
    },
  },
  {
    id: "redstone",
    name: "RedStone",
    tvs: 2_800_000_000,
    protocols: 6,
    providerSlugs: {
      defillama: "redstone",
      chaoslabs: "redstone",
      defisafety: "redstone",
      forta: "redstone",
    },
  },
  {
    id: "pyth",
    name: "Pyth",
    tvs: 1_100_000_000,
    protocols: 2,
    providerSlugs: {
      defillama: "pyth",
      chaoslabs: "pyth",
      defisafety: "pyth",
      forta: "pyth",
    },
  },
];

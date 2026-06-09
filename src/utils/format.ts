export function formatTvl(value: number): string {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(1)}B`;
  }
  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(0)}M`;
  }
  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value}`;
}

export function formatProtocolType(type: string): string {
  const labels: Record<string, string> = {
    lending: "Lending",
    "dex-amm": "DEX / AMM",
    "swap-aggregator": "Swap Aggregator",
    "yield-vault": "Yield / Vault",
    "liquid-staking": "Liquid Staking",
  };
  return labels[type] ?? type;
}

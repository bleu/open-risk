import type { Protocol, Token } from "@/types";

export type SortKey = "tvl" | "name" | "feeds";
export type TokenSortKey = "mcap" | "name" | "feeds";
export type SortDir = "asc" | "desc";

export function sortProtocols(
  protocols: Protocol[],
  key: SortKey,
  direction: SortDir,
  feedCounts?: Map<string, number>,
): Protocol[] {
  const sorted = [...protocols].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "tvl":
        cmp = a.tvl - b.tvl;
        break;
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "feeds":
        cmp = (feedCounts?.get(a.id) ?? 0) - (feedCounts?.get(b.id) ?? 0);
        break;
    }
    return direction === "desc" ? -cmp : cmp;
  });
  return sorted;
}

export function sortTokens(
  tokens: Token[],
  key: TokenSortKey,
  direction: SortDir,
  feedCounts?: Map<string, number>,
): Token[] {
  const sorted = [...tokens].sort((a, b) => {
    let cmp = 0;
    switch (key) {
      case "mcap":
        cmp = a.mcap - b.mcap;
        break;
      case "name":
        cmp = a.name.localeCompare(b.name);
        break;
      case "feeds":
        cmp = (feedCounts?.get(a.id) ?? 0) - (feedCounts?.get(b.id) ?? 0);
        break;
    }
    return direction === "desc" ? -cmp : cmp;
  });
  return sorted;
}

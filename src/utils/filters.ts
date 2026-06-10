import type { Protocol, Token, Provider, EvaluationMap, ProtocolType, TokenType } from "@/types";

export function filterProtocols(
  protocols: Protocol[],
  search: string,
  type: ProtocolType | "all",
): Protocol[] {
  return protocols.filter((p) => {
    const matchesSearch =
      search === "" || p.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = type === "all" || p.type === type;
    return matchesSearch && matchesType;
  });
}

export function getVisibleProviders(
  providers: Provider[],
  filteredProtocols: Protocol[],
  evaluations: EvaluationMap,
  selectedType: ProtocolType | "all",
): Provider[] {
  if (selectedType === "all") return providers;

  return providers.filter((provider) =>
    filteredProtocols.some((protocol) => {
      const protocolEvals = evaluations[provider.id]?.[protocol.id];
      if (!protocolEvals) return false;
      return provider.metrics.some((m) => protocolEvals[m.id] != null);
    }),
  );
}

export function filterTokens(
  tokens: Token[],
  search: string,
  type: TokenType | "all",
): Token[] {
  return tokens.filter((t) => {
    const q = search.toLowerCase();
    const matchesSearch =
      search === "" ||
      t.name.toLowerCase().includes(q) ||
      t.symbol.toLowerCase().includes(q);
    const matchesType = type === "all" || t.type === type;
    return matchesSearch && matchesType;
  });
}

export function getVisibleTokenProviders(
  providers: Provider[],
  filteredTokens: Token[],
  evaluations: EvaluationMap,
  selectedType: TokenType | "all",
): Provider[] {
  if (selectedType === "all") return providers;

  return providers.filter((provider) =>
    filteredTokens.some((token) => {
      const tokenEvals = evaluations[provider.id]?.[token.id];
      if (!tokenEvals) return false;
      return provider.metrics.some((m) => tokenEvals[m.id] != null);
    }),
  );
}

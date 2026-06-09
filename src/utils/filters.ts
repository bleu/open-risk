import type { Protocol, Provider, EvaluationMap, ProtocolType } from "@/types";

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

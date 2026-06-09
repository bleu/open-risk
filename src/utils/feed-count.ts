import type { Protocol, Provider, EvaluationMap } from "@/types";

export function computeFeedCount(
  protocol: Protocol,
  visibleProviders: Provider[],
  evaluations: EvaluationMap,
): number {
  return visibleProviders.filter((provider) => {
    const protocolEvals = evaluations[provider.id]?.[protocol.id];
    if (!protocolEvals) return false;
    return provider.metrics.some((m) => protocolEvals[m.id] != null);
  }).length;
}

export function computeFeedCounts(
  protocols: Protocol[],
  visibleProviders: Provider[],
  evaluations: EvaluationMap,
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const protocol of protocols) {
    counts.set(
      protocol.id,
      computeFeedCount(protocol, visibleProviders, evaluations),
    );
  }
  return counts;
}

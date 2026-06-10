import type { Provider, EvaluationMap } from "@/types";

interface HasId {
  id: string;
}

export function computeFeedCount(
  entity: HasId,
  visibleProviders: Provider[],
  evaluations: EvaluationMap,
): number {
  return visibleProviders.filter((provider) => {
    const entityEvals = evaluations[provider.id]?.[entity.id];
    if (!entityEvals) return false;
    return provider.metrics.some((m) => entityEvals[m.id] != null);
  }).length;
}

export function computeFeedCounts(
  entities: HasId[],
  visibleProviders: Provider[],
  evaluations: EvaluationMap,
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const entity of entities) {
    counts.set(
      entity.id,
      computeFeedCount(entity, visibleProviders, evaluations),
    );
  }
  return counts;
}

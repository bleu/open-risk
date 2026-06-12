"use client";

import { useMemo, useState } from "react";
import { ORACLES } from "@/content/oracles";
import { ORACLE_PROVIDERS } from "@/content/oracle-providers";
import { oracleEvaluations } from "@/content/oracle-evaluations";
import { RatingCell } from "@/ui/rating-cell";
import { SearchBar } from "@/ui/search-bar";
import { formatTvl } from "@/utils/format";
import { ScoreModal } from "@/ui/score-modal";
import { MetricTooltip } from "@/ui/metric-tooltip";

type SortKey = "tvs" | "name" | "protocols" | "feeds";
type SortDir = "asc" | "desc";

interface ScoreModalState {
  providerId: string;
  providerName: string;
  metricId: string;
  metricLabel: string;
}

export function OracleMatrix() {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("tvs");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [scoreModal, setScoreModal] = useState<ScoreModalState | null>(null);

  const filtered = useMemo(
    () =>
      ORACLES.filter(
        (o) =>
          search === "" ||
          o.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [search],
  );

  const visibleProviders = ORACLE_PROVIDERS;

  const feedCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const oracle of filtered) {
      const count = visibleProviders.filter((provider) => {
        const evals = oracleEvaluations[provider.id]?.[oracle.id];
        if (!evals) return false;
        return provider.metrics.some((m) => evals[m.id] != null);
      }).length;
      counts.set(oracle.id, count);
    }
    return counts;
  }, [filtered]);

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      switch (sortKey) {
        case "tvs":
          cmp = a.tvs - b.tvs;
          break;
        case "name":
          cmp = a.name.localeCompare(b.name);
          break;
        case "protocols":
          cmp = a.protocols - b.protocols;
          break;
        case "feeds":
          cmp =
            (feedCounts.get(a.id) ?? 0) - (feedCounts.get(b.id) ?? 0);
          break;
      }
      return sortDir === "desc" ? -cmp : cmp;
    });
  }, [filtered, sortKey, sortDir, feedCounts]);

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setSortKey(key);
      setSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "desc" ? " \u25BC" : " \u25B2";
  }

  // Build a Protocol-shaped array for ScoreModal compatibility
  const oraclesAsProtocols = sorted.map((o) => ({
    id: o.id,
    name: o.name,
    type: "lending" as const,
    tvl: o.tvs,
    providerSlugs: o.providerSlugs,
  }));

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {sorted.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No oracles match your search.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-600">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Provider group row */}
              <tr className="border-b border-surface-600 bg-surface-800">
                <th
                  colSpan={4}
                  className="sticky left-0 z-20 bg-surface-800"
                />
                {visibleProviders.map((provider) => (
                  <th
                    key={provider.id}
                    colSpan={provider.metrics.length}
                    className="border-l border-surface-600 px-3 py-2 text-center text-xs font-semibold text-gray-300"
                  >
                    {provider.name}
                  </th>
                ))}
              </tr>

              {/* Metric sub-header row */}
              <tr className="border-b border-surface-500 bg-surface-800">
                <th
                  className="sticky left-0 z-20 w-[160px] min-w-[160px] bg-surface-800 px-4 py-2 text-left text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Oracle{sortIndicator("name")}
                </th>
                <th
                  className="sticky left-[160px] z-20 w-[100px] min-w-[100px] bg-surface-800 px-3 py-2 text-right text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleSort("tvs")}
                >
                  TVS{sortIndicator("tvs")}
                </th>
                <th
                  className="sticky left-[260px] z-20 w-[80px] min-w-[80px] bg-surface-800 px-3 py-2 text-center text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleSort("protocols")}
                >
                  Protocols{sortIndicator("protocols")}
                </th>
                <th
                  className="sticky left-[340px] z-20 w-[60px] min-w-[60px] bg-surface-800 px-3 py-2 text-center text-xs font-medium text-gray-400 cursor-pointer select-none shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)]"
                  onClick={() => handleSort("feeds")}
                >
                  Feeds{sortIndicator("feeds")}
                </th>
                {visibleProviders.flatMap((provider) =>
                  provider.metrics.map((metric, i) => (
                    <th
                      key={`${provider.id}-${metric.id}`}
                      className={`group relative min-w-[80px] px-3 py-2 text-center text-xs font-medium text-gray-400 ${
                        i === 0 ? "border-l border-surface-600" : ""
                      }`}
                    >
                      {metric.label}
                      {metric.description && <MetricTooltip description={metric.description} />}
                    </th>
                  )),
                )}
              </tr>
            </thead>

            <tbody>
              {sorted.map((oracle, rowIdx) => {
                const rowBg =
                  rowIdx % 2 === 0 ? "bg-surface-900" : "bg-surface-800";
                return (
                  <tr
                    key={oracle.id}
                    className={`group border-b border-surface-700 transition-colors hover:!bg-surface-700 ${rowBg}`}
                  >
                    <td
                      className={`sticky left-0 z-10 w-[160px] min-w-[160px] px-4 py-3 font-medium text-gray-100 ${rowBg} group-hover:!bg-surface-700`}
                    >
                      {oracle.name}
                    </td>
                    <td
                      className={`sticky left-[160px] z-10 w-[100px] min-w-[100px] px-3 py-3 text-right font-mono text-sm text-gray-300 ${rowBg} group-hover:!bg-surface-700`}
                    >
                      {formatTvl(oracle.tvs)}
                    </td>
                    <td
                      className={`sticky left-[260px] z-10 w-[80px] min-w-[80px] px-3 py-3 text-center font-mono text-sm text-gray-300 ${rowBg} group-hover:!bg-surface-700`}
                    >
                      {oracle.protocols}
                    </td>
                    <td
                      className={`sticky left-[340px] z-10 w-[60px] min-w-[60px] px-3 py-3 text-center font-mono text-sm text-gray-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)] ${rowBg} group-hover:!bg-surface-700`}
                    >
                      {feedCounts.get(oracle.id) ?? 0}
                    </td>

                    {visibleProviders.flatMap((provider) =>
                      provider.metrics.map((metric, i) => {
                        const isScoreable =
                          metric.ratingType === "dns-score";
                        return (
                          <td
                            key={`${provider.id}-${metric.id}`}
                            className={`min-w-[80px] px-3 py-3 text-center ${
                              i === 0
                                ? "border-l border-surface-700"
                                : ""
                            } ${isScoreable ? "cursor-pointer" : ""}`}
                            onClick={
                              isScoreable
                                ? () =>
                                    setScoreModal({
                                      providerId: provider.id,
                                      providerName: provider.name,
                                      metricId: metric.id,
                                      metricLabel: metric.label,
                                    })
                                : undefined
                            }
                          >
                            <RatingCell
                              value={
                                oracleEvaluations[provider.id]?.[
                                  oracle.id
                                ]?.[metric.id] ?? null
                              }
                              ratingType={metric.ratingType}
                            />
                          </td>
                        );
                      }),
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {scoreModal && (
        <ScoreModal
          title={`${scoreModal.providerName} — ${scoreModal.metricLabel}`}
          providerId={scoreModal.providerId}
          metricId={scoreModal.metricId}
          protocols={oraclesAsProtocols}
          evaluations={oracleEvaluations}
          onClose={() => setScoreModal(null)}
        />
      )}
    </>
  );
}

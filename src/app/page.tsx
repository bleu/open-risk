"use client";

import { useMemo, useState } from "react";
import type { ProtocolType, TokenType } from "@/types";
import { PROTOCOLS } from "@/content/protocols";
import { PROVIDERS } from "@/content/providers";
import { evaluations } from "@/content/evaluations";
import { TOKENS } from "@/content/tokens";
import { TOKEN_PROVIDERS } from "@/content/token-providers";
import { tokenEvaluations } from "@/content/token-evaluations";
import { SearchBar } from "@/ui/search-bar";
import { TypeTabs } from "@/ui/type-tabs";
import { TokenTypeTabs } from "@/ui/token-type-tabs";
import { EntityTabs, type EntityType } from "@/ui/entity-tabs";
import { RatingCell } from "@/ui/rating-cell";
import { filterProtocols, getVisibleProviders, filterTokens, getVisibleTokenProviders } from "@/utils/filters";
import { sortProtocols, sortTokens, type SortKey, type TokenSortKey, type SortDir } from "@/utils/sort";
import { computeFeedCounts } from "@/utils/feed-count";
import { formatTvl, formatProtocolType, formatTokenType, formatMcap } from "@/utils/format";
import { TvlModal } from "@/ui/tvl-modal";
import { FeedsModal } from "@/ui/feeds-modal";
import { TierModal, getTiersForRatingType } from "@/ui/tier-modal";
import { ScoreModal } from "@/ui/score-modal";
import { OracleMatrix } from "@/ui/oracle-matrix";

interface TierModalState {
  providerId: string;
  providerName: string;
  metricId: string;
  metricLabel: string;
  ratingType: string;
}

interface ScoreModalState {
  providerId: string;
  providerName: string;
  metricId: string;
  metricLabel: string;
}

export default function Home() {
  const [entity, setEntity] = useState<EntityType>("protocols");

  // Protocol state
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<ProtocolType | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("tvl");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [tvlModalOpen, setTvlModalOpen] = useState(false);
  const [feedsModalOpen, setFeedsModalOpen] = useState(false);
  const [tierModal, setTierModal] = useState<TierModalState | null>(null);
  const [scoreModal, setScoreModal] = useState<ScoreModalState | null>(null);

  // Token state
  const [tokenSearch, setTokenSearch] = useState("");
  const [selectedTokenType, setSelectedTokenType] = useState<TokenType | "all">("all");
  const [tokenSortKey, setTokenSortKey] = useState<TokenSortKey>("mcap");
  const [tokenSortDir, setTokenSortDir] = useState<SortDir>("desc");

  const filtered = useMemo(
    () => filterProtocols(PROTOCOLS, search, selectedType),
    [search, selectedType],
  );

  const visibleProviders = useMemo(
    () => getVisibleProviders(PROVIDERS, filtered, evaluations, selectedType),
    [filtered, selectedType],
  );

  const feedCounts = useMemo(
    () => computeFeedCounts(filtered, visibleProviders, evaluations),
    [filtered, visibleProviders],
  );

  const sorted = useMemo(
    () => sortProtocols(filtered, sortKey, sortDir, feedCounts),
    [filtered, sortKey, sortDir, feedCounts],
  );

  // Token computed values
  const filteredTokens = useMemo(
    () => filterTokens(TOKENS, tokenSearch, selectedTokenType),
    [tokenSearch, selectedTokenType],
  );

  const visibleTokenProviders = useMemo(
    () => getVisibleTokenProviders(TOKEN_PROVIDERS, filteredTokens, tokenEvaluations, selectedTokenType),
    [filteredTokens, selectedTokenType],
  );

  const tokenFeedCounts = useMemo(
    () => computeFeedCounts(filteredTokens, visibleTokenProviders, tokenEvaluations),
    [filteredTokens, visibleTokenProviders],
  );

  const sortedTokens = useMemo(
    () => sortTokens(filteredTokens, tokenSortKey, tokenSortDir, tokenFeedCounts),
    [filteredTokens, tokenSortKey, tokenSortDir, tokenFeedCounts],
  );

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

  function handleTokenSort(key: TokenSortKey) {
    if (tokenSortKey === key) {
      setTokenSortDir((d) => (d === "desc" ? "asc" : "desc"));
    } else {
      setTokenSortKey(key);
      setTokenSortDir(key === "name" ? "asc" : "desc");
    }
  }

  function tokenSortIndicator(key: TokenSortKey) {
    if (tokenSortKey !== key) return "";
    return tokenSortDir === "desc" ? " \u25BC" : " \u25B2";
  }

  return (
    <>
    <EntityTabs selected={entity} onChange={setEntity} />
    <main className="mx-auto max-w-[1600px] px-6 py-6">
      {entity === "tokens" ? (
      <>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <SearchBar value={tokenSearch} onChange={setTokenSearch} />
        <TokenTypeTabs selected={selectedTokenType} onChange={setSelectedTokenType} />
      </div>

      {sortedTokens.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No tokens match your search.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-600">
          <table className="w-full border-collapse text-sm">
            <thead>
              {/* Provider group row */}
              <tr className="border-b border-surface-600 bg-surface-800">
                <th
                  colSpan={5}
                  className="sticky left-0 z-20 bg-surface-800"
                />
                {visibleTokenProviders.map((provider) => (
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
                  onClick={() => handleTokenSort("name")}
                >
                  Token{tokenSortIndicator("name")}
                </th>
                <th className="sticky left-[160px] z-20 w-[80px] min-w-[80px] bg-surface-800 px-3 py-2 text-left text-xs font-medium text-gray-400">
                  Symbol
                </th>
                <th className="sticky left-[240px] z-20 w-[100px] min-w-[100px] bg-surface-800 px-3 py-2 text-left text-xs font-medium text-gray-400">
                  Category
                </th>
                <th
                  className="sticky left-[340px] z-20 w-[110px] min-w-[110px] bg-surface-800 px-3 py-2 text-right text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleTokenSort("mcap")}
                >
                  Mkt Cap{tokenSortIndicator("mcap")}
                </th>
                <th
                  className="sticky left-[450px] z-20 w-[60px] min-w-[60px] bg-surface-800 px-3 py-2 text-center text-xs font-medium text-gray-400 cursor-pointer select-none shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)]"
                  onClick={() => handleTokenSort("feeds")}
                >
                  Feeds{tokenSortIndicator("feeds")}
                </th>
                {visibleTokenProviders.flatMap((provider) =>
                  provider.metrics.map((metric, i) => (
                    <th
                      key={`${provider.id}-${metric.id}`}
                      className={`min-w-[80px] px-3 py-2 text-center text-xs font-medium text-gray-400 ${
                        i === 0 ? "border-l border-surface-600" : ""
                      }`}
                    >
                      {provider.metrics.length > 1 ? metric.label : ""}
                    </th>
                  )),
                )}
              </tr>
            </thead>

            <tbody>
              {sortedTokens.map((token, rowIdx) => {
                const rowBg =
                  rowIdx % 2 === 0 ? "bg-surface-900" : "bg-surface-800";
                return (
                <tr
                  key={token.id}
                  className={`group border-b border-surface-700 transition-colors hover:!bg-surface-700 ${rowBg}`}
                >
                  <td
                    className={`sticky left-0 z-10 w-[160px] min-w-[160px] px-4 py-3 font-medium text-gray-100 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {token.name}
                  </td>
                  <td
                    className={`sticky left-[160px] z-10 w-[80px] min-w-[80px] px-3 py-3 font-mono text-xs text-gray-400 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {token.symbol}
                  </td>
                  <td
                    className={`sticky left-[240px] z-10 w-[100px] min-w-[100px] px-3 py-3 text-xs text-gray-400 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {formatTokenType(token.type)}
                  </td>
                  <td
                    className={`sticky left-[340px] z-10 w-[110px] min-w-[110px] px-3 py-3 text-right font-mono text-sm text-gray-300 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {formatMcap(token.mcap)}
                  </td>
                  <td
                    className={`sticky left-[450px] z-10 w-[60px] min-w-[60px] px-3 py-3 text-center font-mono text-sm text-gray-300 shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)] ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {tokenFeedCounts.get(token.id) ?? 0}
                  </td>

                  {visibleTokenProviders.flatMap((provider) =>
                    provider.metrics.map((metric, i) => {
                      const isTierable =
                        metric.ratingType === "stage" ||
                        metric.ratingType === "grade";
                      const isScoreable =
                        metric.ratingType === "dns-score";
                      const isClickable = isTierable || isScoreable;
                      return (
                        <td
                          key={`${provider.id}-${metric.id}`}
                          className={`min-w-[80px] px-3 py-3 text-center ${
                            i === 0 ? "border-l border-surface-700" : ""
                          } ${isClickable ? "cursor-pointer" : ""}`}
                          onClick={
                            isTierable
                              ? () =>
                                  setTierModal({
                                    providerId: provider.id,
                                    providerName: provider.name,
                                    metricId: metric.id,
                                    metricLabel: metric.label,
                                    ratingType: metric.ratingType,
                                  })
                              : isScoreable
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
                              tokenEvaluations[provider.id]?.[token.id]?.[
                                metric.id
                              ] ?? null
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
      </>
      ) : entity === "oracles" ? (
        <OracleMatrix />
      ) : entity !== "protocols" ? (
        <div className="py-20 text-center text-gray-500">
          <p className="text-lg font-medium text-gray-400 capitalize">{entity}</p>
          <p className="mt-2 text-sm">Coming soon.</p>
        </div>
      ) : (
      <>
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <SearchBar value={search} onChange={setSearch} />
        <TypeTabs selected={selectedType} onChange={setSelectedType} />
      </div>

      {sorted.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No protocols match your search.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-surface-600">
          <table className="w-full border-collapse text-sm">
            {/* ── Header ── */}
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
                  className="sticky left-0 z-20 w-[180px] min-w-[180px] bg-surface-800 px-4 py-2 text-left text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleSort("name")}
                >
                  Protocol{sortIndicator("name")}
                </th>
                <th className="sticky left-[180px] z-20 w-[120px] min-w-[120px] bg-surface-800 px-3 py-2 text-left text-xs font-medium text-gray-400">
                  Type
                </th>
                <th
                  className="sticky left-[300px] z-20 w-[100px] min-w-[100px] bg-surface-800 px-3 py-2 text-right text-xs font-medium text-gray-400 cursor-pointer select-none"
                  onClick={() => handleSort("tvl")}
                >
                  TVL{sortIndicator("tvl")}
                </th>
                <th
                  className="sticky left-[400px] z-20 w-[60px] min-w-[60px] bg-surface-800 px-3 py-2 text-center text-xs font-medium text-gray-400 cursor-pointer select-none shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)]"
                  onClick={() => handleSort("feeds")}
                >
                  Feeds{sortIndicator("feeds")}
                </th>
                {visibleProviders.flatMap((provider) =>
                  provider.metrics.map((metric, i) => (
                    <th
                      key={`${provider.id}-${metric.id}`}
                      className={`min-w-[80px] px-3 py-2 text-center text-xs font-medium text-gray-400 ${
                        i === 0 ? "border-l border-surface-600" : ""
                      }`}
                    >
                      {provider.metrics.length > 1 ? metric.label : ""}
                    </th>
                  )),
                )}
              </tr>
            </thead>

            {/* ── Body ── */}
            <tbody>
              {sorted.map((protocol, rowIdx) => {
                const rowBg =
                  rowIdx % 2 === 0 ? "bg-surface-900" : "bg-surface-800";
                return (
                <tr
                  key={protocol.id}
                  className={`group border-b border-surface-700 transition-colors hover:!bg-surface-700 ${rowBg}`}
                >
                  <td
                    className={`sticky left-0 z-10 w-[180px] min-w-[180px] px-4 py-3 font-medium text-gray-100 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {protocol.name}
                  </td>
                  <td
                    className={`sticky left-[180px] z-10 w-[120px] min-w-[120px] px-3 py-3 text-xs text-gray-400 ${rowBg} group-hover:!bg-surface-700`}
                  >
                    {formatProtocolType(protocol.type)}
                  </td>
                  <td
                    className={`sticky left-[300px] z-10 w-[100px] min-w-[100px] px-3 py-3 text-right font-mono text-sm text-gray-300 cursor-pointer hover:text-blue-400 transition-colors ${rowBg} group-hover:!bg-surface-700`}
                    onClick={() => setTvlModalOpen(true)}
                  >
                    {formatTvl(protocol.tvl)}
                  </td>
                  <td
                    className={`sticky left-[400px] z-10 w-[60px] min-w-[60px] px-3 py-3 text-center font-mono text-sm text-gray-300 cursor-pointer hover:text-emerald-400 transition-colors shadow-[4px_0_8px_-2px_rgba(0,0,0,0.4)] ${rowBg} group-hover:!bg-surface-700`}
                    onClick={() => setFeedsModalOpen(true)}
                  >
                    {feedCounts.get(protocol.id) ?? 0}
                  </td>

                  {visibleProviders.flatMap((provider) =>
                    provider.metrics.map((metric, i) => {
                      const isTierable =
                        metric.ratingType === "stage" ||
                        metric.ratingType === "grade";
                      const isScoreable =
                        metric.ratingType === "dns-score";
                      const isClickable = isTierable || isScoreable;
                      return (
                        <td
                          key={`${provider.id}-${metric.id}`}
                          className={`min-w-[80px] px-3 py-3 text-center ${
                            i === 0 ? "border-l border-surface-700" : ""
                          } ${isClickable ? "cursor-pointer" : ""}`}
                          onClick={
                            isTierable
                              ? () =>
                                  setTierModal({
                                    providerId: provider.id,
                                    providerName: provider.name,
                                    metricId: metric.id,
                                    metricLabel: metric.label,
                                    ratingType: metric.ratingType,
                                  })
                              : isScoreable
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
                              evaluations[provider.id]?.[protocol.id]?.[
                                metric.id
                              ] ?? null
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
      {tvlModalOpen && (
        <TvlModal protocols={sorted} onClose={() => setTvlModalOpen(false)} />
      )}
      {feedsModalOpen && (
        <FeedsModal
          protocols={sorted}
          providers={visibleProviders}
          evaluations={evaluations}
          feedCounts={feedCounts}
          onClose={() => setFeedsModalOpen(false)}
        />
      )}
      {tierModal && (
        <TierModal
          title={tierModal.metricLabel ? `${tierModal.providerName} — ${tierModal.metricLabel}` : tierModal.providerName}
          providerId={tierModal.providerId}
          metricId={tierModal.metricId}
          protocols={sorted}
          evaluations={evaluations}
          tiers={getTiersForRatingType(tierModal.ratingType)}
          onClose={() => setTierModal(null)}
        />
      )}
      {scoreModal && (
        <ScoreModal
          title={`${scoreModal.providerName} — ${scoreModal.metricLabel}`}
          providerId={scoreModal.providerId}
          metricId={scoreModal.metricId}
          protocols={sorted}
          evaluations={evaluations}
          onClose={() => setScoreModal(null)}
        />
      )}
      </>
      )}
    </main>
    </>
  );
}

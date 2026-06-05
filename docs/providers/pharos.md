---
name: Pharos
slug: pharos
type: Monitoring
focus: "Real-time risk monitoring and automated alerts for live protocol risk events"
website: https://pharos.watch
docs_url: https://pharos.watch/api/
fetch_method: api
api_base: https://api.pharos.watch
auth_required: true
data_format: json
source_repo: https://github.com/TokenBrice/stablecoin-dashboard
access: free
metric_orientation: financial-market
recommendation: conditional
last_researched: 2026-06-05
confidence: low
---

# Pharos

Pharos (pharos.watch) is a free, open-source stablecoin analytics and risk-monitoring dashboard built by DeFi analyst TokenBrice. It tracks ~369 active stablecoins (401-asset universe) across many chains in real time, computing peg-stability, liquidity, safety, freeze/blacklist, and systemic-risk metrics, with depeg early-warning alerts. Despite the RFP §4 generic label ("real-time risk monitoring and automated alerts for live protocol risk events"), the actual entity is stablecoin-centric rather than protocol-centric.

> **Ambiguity note:** "Pharos" is a heavily collided name. The most prominent unrelated entity is *Pharos Network* (a RealFi/RWA Layer-1 blockchain, PROS token, pharos.xyz) — that is NOT a risk feed and is not this dossier's subject. There is also "Pharos Production" (a dev/audit shop). The DeFi-risk-monitoring entity matching the RFP focus is **pharos.watch** by TokenBrice. Confidence is set `low` because of this collision and because the RFP one-liner ("live protocol risk events") only loosely matches a stablecoin-peg monitor.

## Coverage of Top 20

Pharos monitors *stablecoins and pegged assets*, not lending markets, DEXes, or staking protocols as such. Its relevance to the Top-20 is therefore **indirect**: only through stablecoins/pegged assets issued or operated by those protocols.

- **Likely covered (indirectly, via issued pegged assets):**
  - **Spark / Sky** — sUSDS (Sky stablecoin / Spark savings token) is referenced in coverage; likely tracked.
  - **Aave** — GHO (Aave-native stablecoin) likely tracked.
  - **Curve** — crvUSD likely tracked; Curve is also a primary DEX-liquidity data source for Pharos.
  - **Lido** — stETH is a pegged LST that may appear under crypto-backed/LST pegs (unconfirmed for this asset specifically).
  - **Rocket Pool** — rETH similarly may appear as a pegged LST (unconfirmed).
  - (All of the above are inferred from Pharos's category structure; the public coverage page does not publish a named per-asset roster — see Open Questions.)
- **Not applicable (no pegged asset / out of Pharos's scope):**
  - **Morpho, Fluid, Gearbox, Euler, Compound, Liquity** — lending/CDP protocols; Pharos does not assess lending-market risk. (Liquity's LUSD/BOLD and any protocol stablecoins *could* appear as assets, but the protocol's lending risk is out of scope.)
  - **Uniswap, Balancer, CoW Swap, 1inch, 0x / Matcha** — DEXes/aggregators have no native pegged asset to track (Uniswap/Curve appear only as liquidity *venues* Pharos reads from, not as rated subjects).
  - **Gearbox, Yearn Finance, Mellow, Morpho Vaults, Pendle** — yield/vault protocols; no pegged-asset feed and no vault-risk coverage.
- **Notes:** Coverage determined from the methodology, API, and GitHub README, which describe a stablecoin asset universe categorized by peg currency and backing type (CeFi / CeFi-Dependent / DeFi / RWA-backed / Crypto-backed). Pharos does not present a protocol-by-protocol risk view, so direct mapping to the 20 seed *protocols* is weak. The named protocol-stablecoin matches (sUSDS, GHO, crvUSD) are the strongest links.

## Data products & meaning

Pharos exposes several computed indices and a public JSON API. The most importable surfaces are the per-stablecoin metrics and depeg-event feed.

### Stablecoin metrics (Safety Score + sub-scores)
- **What it is:** Per-coin computed scores — Safety Score (A+ to F), PegScore, Liquidity Score, Pharos Yield Score (PYS) — plus supply, price, chains, and peg metadata.
- **What it means:** A multi-dimensional risk grade for a pegged asset: peg-stability multiplier × (Liquidity/Exit + Resilience + Decentralization + Dependency Risk). Tells you how robust and exit-able a stablecoin is, not how trustless its issuing protocol is.
- **Shape / fields:** JSON; `/api/stablecoins` returns supply, price, chains, peg metadata, freshness headers per active coin; `/api/stablecoin/{id}` returns a per-coin profile.

### Depeg events / Depeg Early Warning Score (DEWS)
- **What it is:** Active and historical depeg incidents, plus a forward-looking DEWS stress score.
- **What it means:** Real-time and predictive flags that a stablecoin is losing or about to lose its peg; DEWS combines price deviation, source divergence, liquidity erosion, pool imbalance, supply velocity, blacklist activity, mint/burn pressure, and yield anomalies.
- **Shape / fields:** JSON; `/api/depeg-events?active=true` returns current events + incident-history filters.

### DEX liquidity / exit capacity
- **What it is:** Pool depth, protocol diversity, and exit-capacity per stablecoin (aggregated from Curve, Uniswap V3, and others).
- **What it means:** How much can be exited at peg before slippage; a practical run-risk signal.
- **Shape / fields:** JSON; `/api/dex-liquidity` keyed by Pharos stablecoin ID.

### Systemic / ecosystem indices
- **What it is:** Pharos Stability Index (PSI, 0–100, recomputed ~every 15 min), Chain Health Score, Contagion Stress Test, FreezeWatch (freeze/blacklist event tracking across 8 chains).
- **What it means:** Market-wide stablecoin stress, per-chain health, contagion propagation through dependency graphs, and censorship/seizure events.
- **Shape / fields:** JSON via API + on-site dashboards; freeze events include affected addresses/amounts and seizure flags.

**Most relevant to import:** The **depeg-events feed (`/api/depeg-events`)** plus the **per-stablecoin Safety/Peg scores (`/api/stablecoins`)** — these are the live "risk event" signals matching the RFP's monitoring framing, and they are the only feeds that map (indirectly) onto Top-20 protocols via their issued stablecoins (sUSDS, GHO, crvUSD).

## Metric alignment

- **Ethereum-principles signal:** Weak/partial. A "Decentralization" sub-dimension exists but is limited to *chain tier and deployment model* (a chain-risk penalty) plus "infrastructure tagging" for shared issuance frameworks — it does not assess key/admin control, upgradeability, governance, or exit windows of the issuing protocol. Blacklist/freeze tracking is a censorship-resistance signal (genuinely Ethereum-principles-flavored) but applied to assets, not protocols.
- **Financial / market signal:** Dominant. Peg stability, liquidity/exit depth, yield (PYS), mint/burn flows, TVL depth, contagion/dependency risk, systemic stress index.
- **Orientation:** **financial-market** (with a thin decentralization/censorship slice). It produces real-time market-risk metrics for pegged assets.
- **Diversity vs. registry:** Largely **complementary** — no other listed feed specializes in stablecoin peg/depeg monitoring and freeze/blacklist tracking. It overlaps with BlockAnalitica (collateral/market risk) and DeFi Saver (liquidation health) on the financial axis, but its stablecoin-peg + censorship-event focus is unique. It does **not** duplicate the decentralization-maturity feeds (DeFiScan, DeFiPunk'd).

## Inclusion assessment

- **Verdict:** conditional
- **Reasoning:**
  - *Access:* Strong positive — fully free, open-source (MIT), public JSON API with self-serve email-verified keys, no paywall. Highly automatable. Leans **include**.
  - *Scope breadth:* Negative — it rates *stablecoins*, not protocols. It maps onto only a few Top-20 protocols (Spark/Sky, Aave, Curve) and only via their issued stablecoins; most Top-20 protocols (DEXes, lending markets, vaults, LSTs) have no Pharos coverage. This is the main reason it is not a clean `include`.
  - *Is it actually a risk feed?* Yes — it is a genuine, methodology-driven risk monitor (not a portfolio tool or explorer).
  - *Neutrality & conflicts:* Positive — independent, "no paid placement," no monetization, no accounts/wallet connectivity; built by a known independent analyst (TokenBrice).
  - *Redundancy:* Low — unique stablecoin-peg + freeze/blacklist niche.
  - *Coverage relevance:* The narrow-but-unique argument applies: it uniquely serves stablecoin-issuing Top-20 protocols (sUSDS/Spark-Sky, GHO/Aave, crvUSD/Curve) with a real-time monitoring signal no other feed provides.
  - **Net:** `conditional` — include specifically for stablecoin-issuing protocols where its depeg/freeze signals are valuable; do not expect it to populate cells for DEXes, vaults, or LST protocols. Pair its inclusion with a clear note that coverage is asset-scoped, not protocol-scoped.

## How to fetch

- **Method:** Public REST API returning JSON. Base URL `https://api.pharos.watch`.
- **Auth:** Required. Send `X-API-Key: {token}` header on protected public routes. Keys are self-serve, email-verified, revealed once in-browser; managed via `ops.pharos.watch/admin-api/`.
- **Rate limits:** Default 30 requests/minute; keys expire after 60 days; respect 429s with jitter; poll realtime endpoints no faster than 60s, history endpoints ~hourly.
- **Endpoints (documented):**
  - `GET /api/stablecoins` — supply, price, chains, peg metadata, freshness headers for every active stablecoin.
  - `GET /api/stablecoin/{id}` (e.g. `usdc-circle`) — per-coin profile.
  - `GET /api/depeg-events?active=true` — current depeg events + incident-history filters.
  - `GET /api/dex-liquidity` — pool depth / protocol diversity / exit capacity by Pharos stablecoin ID.
- **Machine-readable spec:** OpenAPI at `/openapi.json`; Postman collection provided. Per-repo, see `/docs/api-reference.md` for exact route/field contracts; `/feed/` routes referenced for historical/feed data.
- **Source / alt fetch:** Open-source repo (MIT) — GitHub (TokenBrice; repo referenced as both `stablecoin-dashboard` and `pharos-watch`). Tech stack: Next.js frontend, Cloudflare Worker API + crons, Cloudflare D1 (SQLite). Data refreshed on 15-min to ~2-hour cycles from DefiLlama, Pyth, Binance, Kraken, Bitstamp, Coinbase, Curve, Uniswap V3, on-chain reads, and 40+ providers.
- Live verification deferred (documentation-only per skill rules); endpoints above are from the published API page and README, not probed.

## Open questions / gaps

- **Identity collision (drives low confidence):** Confirm pharos.watch (TokenBrice) is the intended RFP §4 "Pharos" and not Pharos Network (pharos.xyz, RealFi L1) or Pharos Production. The RFP one-liner emphasizes "live protocol risk events," which only loosely matches a stablecoin-peg monitor.
- **Exact GitHub repo URL/slug:** README content was retrieved but the repo path was reported inconsistently as `TokenBrice/stablecoin-dashboard` vs `TokenBrice/pharos-watch`. Verify the canonical URL.
- **Named per-asset roster:** The public coverage page does not publish a named stablecoin list, so specific Top-20 mappings (sUSDS, GHO, crvUSD, and whether stETH/rETH are tracked as pegged LSTs) are inferred, not confirmed. Pull `/api/stablecoins` (or the dashboard) to confirm exactly which protocol-issued assets are present.
- **CSV/bulk export:** No CSV export documented; only JSON API + `/feed/` routes. Confirm whether bulk historical export exists.
- **License clarity:** Reported as MIT (repo). Note RFP requires AGPL-3.0 for the *aggregator project itself*, not for consumed feeds — Pharos's MIT license is fine for data consumption but worth recording.
- **API key longevity for automation:** 60-day key expiry and 30 rpm limit may need an operational refresh/contact process for an always-on aggregator.

## Sources

- https://pharos.watch/ — official site; product overview, metrics list, nav/footer links (/api/, /methodology/, /about/, /coverage/, /learn/glossary/, /status/), coverage categories.
- https://pharos.watch/api/ — API base URL (api.pharos.watch), endpoints, X-API-Key auth, rate limits, OpenAPI/Postman.
- https://pharos.watch/methodology/ — metric definitions (Safety Score, PSI, PegScore, DEWS, Liquidity Score, PYS, Chain Health, Contagion Stress Test), data sources, decentralization assessment scope.
- https://pharos.watch/coverage/ — coverage feature set; confirmed no public named-asset roster on page.
- https://tokenbrice.xyz/pharos/ — builder (TokenBrice), open-source/free stance, GitHub repo reference, Telegram alert bot, data products.
- https://github.com/TokenBrice/stablecoin-dashboard — repo README: MIT license, tech stack, data sources, API access model, asset universe (401 coins / 369 active).
- https://www.pharos.xyz/ and https://docs.pharos.xyz/ — UNRELATED Pharos Network (RealFi L1); recorded to disambiguate.

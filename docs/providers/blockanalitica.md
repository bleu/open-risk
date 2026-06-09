---
name: Block Analitica
slug: blockanalitica
type: Dashboard
focus: "Quantitative on-chain risk dashboards for lending markets: liquidations, collateral health, market exposure"
website: https://blockanalitica.com/
docs_url: https://docs.blockanalitica.com/
fetch_method: api
api_base: https://api.blockanalitica.com (inferred; per-dashboard backends, e.g. open-source maker-api / ajna-api)
auth_required: false
data_format: json
source_repo: https://github.com/blockanalitica
access: free
metric_orientation: financial-market
recommendation: include
last_researched: 2026-06-08
confidence: medium
---

# Block Analitica

Block Analitica is a DeFi risk-management firm that builds quantitative on-chain
risk dashboards, runs simulations, and advises lending protocols on parameters
and asset onboarding. It has served the Sky (formerly MakerDAO) ecosystem since
2019 and publishes free, public, protocol-specific dashboards (Sky/Spark,
Aave, Morpho, Compound, Ajna, eBTC) plus a cross-protocol stablecoin/risk
dashboard called Sphere.

## Coverage of Top 20

Block Analitica's published surfaces are concentrated on Ethereum lending
markets, which maps directly onto the Top-20 lending category. Its docs portal
explicitly lists supported protocols as Sky, Spark, Aave, Morpho, Compound,
Fluid, and Liquity.

- **Likely covered:**
  - **Spark** — dedicated dashboard (spark.blockanalitica.com); Sky sub-protocol, core BA focus.
  - **Aave** — open-source Aave risk dashboard (aave.blockanalitica.com, funded by Aave Grants DAO); v2/v3 markets.
  - **Morpho** — dedicated dashboard (morpho.blockanalitica.com).
  - **Morpho Vaults** — likely, given MetaMorpho is part of the Morpho dashboard scope (unconfirmed which view; see gaps).
  - **Compound** — listed as a supported protocol in the docs portal.
  - **Fluid** — listed as supported in the docs portal.
  - **Liquity** — listed as supported in the docs portal.
  - **Spark/Sky lending collateral** — via the Sky/Maker dashboard (now handed to info.sky.money).
- **Not applicable:**
  - **Uniswap, Curve, Balancer (DEX/AMM)** — BA measures lending-market risk (liquidations, collateral, LTV), not AMM pool risk; no DEX dashboards published.
  - **CoW Swap, 1inch, 0x / Matcha (swap aggregators)** — no lending positions to model; outside BA's liquidation/collateral focus.
  - **Yearn, Mellow, Pendle (yield/vaults)** — no published BA dashboards; Sphere focuses on stablecoin lending/borrowing rates, not yield-vault risk. (Pendle/Yearn could appear indirectly as collateral in covered lending markets but are not directly modeled.)
  - **Lido, Rocket Pool (liquid staking)** — stETH/rETH appear as collateral inputs to covered lending markets, but BA does not publish a staking-protocol risk dashboard.
  - **Gearbox, Euler (lending)** — not listed among BA's supported protocols; no published dashboard found.
- **Notes:** Coverage determined from the docs portal supported-protocol list, the
  blockanalitica.com product page, GitHub repo names, and live dashboard
  subdomains. BA's lending focus means the lending half of the Top-20 is well
  served while DEX/aggregator/staking protocols are out of scope by design.

## Data products & meaning

### Protocol-specific risk dashboards (Aave, Morpho, Spark, Compound, Ajna, eBTC, Sky)
- **What it is:** Per-protocol web dashboards surfacing on-chain risk state of
  each lending market: total supply/borrow, collateral composition, liquidation
  activity, at-risk debt, LTV/health-factor distributions, and risk-parameter
  configuration.
- **What it means:** A quantitative, market-risk view of "how close is this
  lending market to bad debt" — collateral health, liquidation exposure, and
  concentration of borrowers. This is operational risk-monitoring data, not a
  governance/decentralization rating.
- **Shape / fields:** JSON served by per-dashboard backends (the open-source
  maker-api and ajna-api are Python services powering their respective
  dashboards). Frontends are React SPAs (AGPL-3.0) that consume these JSON APIs.
  Concrete field schemas are not published as formal API docs; they must be read
  from the open-source code or observed from network calls.

### Sphere (stablecoin rates + Sphere Risk Scores)
- **What it is:** A cross-protocol dashboard for stablecoin lending/borrowing in
  DeFi, covering "all major stablecoins on mainnet," plus a "Sphere Risk Scores"
  layer and an "Agent Sphere" LLM analyst that summarizes conditions.
- **What it means:** Helps borrowers/lenders compare CDP/lending opportunities by
  risk-adjusted yield. Sphere Risk Scores produce two composite dimensions:
  **Market Risk** (undercollateralization risk from price shocks, factoring
  on-chain liquidity, liquidation bonuses, borrower LTV) and **Liquidity Risk**
  (supplier/borrower concentration via HHI, utilization, relative pool size).
  Oracle-risk and settlement evaluations are noted as forthcoming.
- **Shape / fields:** Indexed risk scores (higher = riskier), supply APY, and
  six radar-chart metrics per pool. These are **synthesized/composite** scores
  derived from on-chain inputs — relevant for the no-composite-scoring caveat
  below.

**Most relevant to import:** The **protocol-specific lending dashboards**
(Aave, Morpho, Spark, Compound). They provide raw quantitative risk metrics
(liquidations, collateral health, at-risk debt) per Top-20 lending protocol,
are backed by open-source AGPL APIs, and are shown verbatim without BA's own
scoring — matching the aggregator's verbatim-display model better than Sphere's
composite Risk Scores.

## Metric alignment

- **Ethereum-principles signal:** Minimal. BA does not rate decentralization,
  key/admin control, upgradeability, or exit windows. (Risk-parameter
  configuration it surfaces is governance-adjacent but framed as market risk,
  not trust-minimization.)
- **Financial / market signal:** Dominant. BA measures liquidations, collateral
  health, LTV/health-factor distributions, market exposure, borrower/supplier
  concentration, utilization, TVL, and (in Sphere) risk-adjusted yield.

**Orientation: financial-market.** Specific metrics: liquidation activity,
at-risk debt, collateral composition, LTV distribution, HHI concentration, pool
utilization, and Sphere's Market/Liquidity Risk Scores. In the registry this
**complements** decentralization-rating feeds (DeFiScan, DeFiPunk'd) and overlaps
partially with other lending-market dashboards (DeFi Saver, CuratorWatch for
Morpho), but BA's depth on liquidation/collateral health for major lending
protocols is a distinct, high-value quantitative angle. Sphere's composite Risk
Scores would, if imported, need to be shown verbatim only (no re-synthesis) to
stay within the RFP's no-composite-scoring constraint.

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *Access:* Strongly favorable. Dashboards are free and public (no login
    observed), and the underlying APIs/frontends are open-source under AGPL-3.0
    on GitHub — directly automatable and aligned with the public-good and
    feed-automation goals.
  - *Scope breadth:* Covers a large share of the Top-20 lending category (Spark,
    Aave, Morpho, Compound, Fluid, Liquity, plus Morpho Vaults likely). Narrow to
    lending, but that is the highest-funds-at-risk category in the seed list.
  - *Is it actually a risk feed?* Yes — purpose-built quantitative risk dashboards
    and simulations, named explicitly in RFP §4.
  - *Neutrality & conflicts:* BA is paid by/advises several listed protocols
    (Sky, Spark, Morpho, Aave Grants DAO funding the Aave dashboard, Ethena,
    Chronicle). These commercial ties are **disclosed publicly** but MUST be
    declared in the aggregator's conflict notes; they slightly temper neutrality.
  - *Redundancy:* Overlaps partially with DeFi Saver (loan health) and
    CuratorWatch (Morpho curators), but BA's protocol-wide liquidation/collateral
    modeling and stress-simulation depth is differentiated.
  - *Coverage relevance:* Uniquely strong on the Sky/Spark/Aave/Morpho/Compound
    cluster, which is the core of the Top-20.

## How to fetch

- **Open-source repos (GitHub):** https://github.com/blockanalitica — frontends
  are React SPAs (AGPL-3.0): `AAVE`, `maker-ui`, `ajna`. Backends are Python
  APIs: `maker-api` ("open source API powering Maker risk dashboard"),
  `ajna-api` (AGPL-3.0). `chain-harvester` (MIT) is their on-chain data
  extraction tool; `ba-utils` (TS) and `@blockanalitica/ui` (npm) are shared
  libraries. Self-hosting an API is possible (Docker compose present in
  maker-api); see each repo's CONTRIBUTING.md.
- **Hosted APIs:** Each dashboard has its own backend domain (discovered from the
  React frontend JS bundles, not from published docs):
  - **`morpho-api.blockanalitica.com`** — **confirmed working** (2026-06-08).
    Django/DRF JSON API, paginated (`?p=N`). Endpoints: `/markets/`, `/vaults/`,
    `/overall/`, `/liquidations/`, `/risk/capital-at-risk/`, `/chains/`,
    `/tokens/`. No auth required. Returns 460 markets and 378 vaults with rates,
    LTV, collateral, liquidity, and curator data.
  - **`spark-api.blockanalitica.com`** — **all endpoints return 404**
    (2026-06-08). Frontend JS references this host but no API routes respond.
    May have been retired or moved.
  - **`papi.blockanalitica.com`** (Aave) — **all endpoints return 404**
    (2026-06-08). `aave.blockanalitica.com` dashboard also refuses connections.
    May be deprecated despite the active GitHub repo.
  - **`maker.blockanalitica.com`** — 302-redirects to `info.sky.money` (handed
    to Sky ecosystem).
- **Auth / rate limits:** No login or auth required on the Morpho API; no
  published rate-limit documentation found. Treat as public-read JSON.
- **Format:** JSON (REST). No OpenAPI/Swagger spec located.
- **Net:** Only the Morpho API is currently usable for automated fetching. Spark
  and Aave data would require either finding the new API hosts or self-hosting
  from the open-source repos.

## Open questions / gaps

- Spark and Aave API hosts are confirmed down (2026-06-08). Needs investigation
  into whether these APIs moved to new hosts or were retired. The open-source
  repos (AAVE, ajna-api) could be self-hosted as a fallback.
- Whether Morpho Vaults / MetaMorpho is covered as a distinct view in the Morpho
  API — the `/vaults/` endpoint returns 378 vaults with curator data, suggesting
  yes, but needs confirmation of MetaMorpho-specific fields.
- Sphere data accessibility: is Sphere Risk Score data exposed via API, or only
  rendered/summarized via the "Agent Sphere" LLM front end?
- Pricing for any private/consulting tier (public dashboards are free; commercial
  advisory engagements are separate and undocumented publicly).

## Sources

- https://blockanalitica.com/ — product/services overview; lists dashboards (Sky, Spark, Compound, Morpho, Sphere, HyperLend, Hyperdrive, eBTC, Ajna), client list (Sky, Spark, Morpho, Summer.fi, Ethena, Chronicle), "$17B+ assets" trust claim.
- https://docs.blockanalitica.com/ — docs portal; "Agent Sphere" AI analyst; supported protocols listed as Sky, Spark, Aave, Morpho, Compound, Fluid, Liquity.
- https://github.com/blockanalitica — org with 11 public repos; AAVE (AGPL-3.0), maker-ui (AGPL-3.0), maker-api (open-source API), ajna-api (AGPL-3.0), ajna, chain-harvester (MIT), ba-utils, plastron, hypersync-client-python, skyAirdrop, research.
- https://github.com/blockanalitica/maker-api — "An open source API powering Maker risk dashboard"; Python, Docker compose present.
- https://github.com/blockanalitica/AAVE — "An open source AAVE risk dashboard"; AGPL-3.0, financed by Aave Grants DAO; React/JS; `npm ci` / `npm run start`.
- https://blockanalitica.substack.com/p/introducing-sphere-risk-scores — Sphere Risk Scores: Market Risk + Liquidity Risk dimensions; inputs (on-chain liquidity, liquidation bonuses, borrower LTV, HHI concentration, utilization); composite/indexed scores; covers major mainnet stablecoins.
- https://maker.blockanalitica.com/defi/ — 302-redirects to https://info.sky.money/ (Sky ecosystem handover).
- WebSearch (Block Analitica pricing/access) — public dashboards (Spark, eBTC, Sphere) accessible without login; no public pricing tier documented.

---
name: pigi.finance
slug: pigi
type: Dashboard
focus: "Vault analytics and risk-adjusted yield comparison across 50+ protocols. Tracks historical exploits, holder concentration, and risk-adjusted APY."
website: https://pigi.finance
docs_url: https://pigi.finance/defi-api
fetch_method: scrape
api_base: n/a
auth_required: true
data_format: html
source_repo: n/a
access: freemium
metric_orientation: financial-market
recommendation: conditional
last_researched: 2026-06-05
confidence: medium
---

# pigi.finance

pigi.finance is a DeFi analytics dashboard that aggregates vault data across 50+ yield protocols and surfaces a single "Risk-Adjusted APR" metric alongside risk indicators (volatility, Sharpe/Sortino ratios) and holder-concentration intelligence, to help capital allocators compare yield strategies on a risk-aware basis. It also publishes a public DeFi hacks/exploits tracker and a commercial DeFi vaults API.

## Coverage of Top 20

pigi.finance indexes vaults at the strategy level across many lending/yield protocols. Its vault listings and API marketing explicitly name several Top-20 protocols; coverage of others is plausible but unconfirmed from public surfaces.

- **Likely covered:** Aave, Morpho (and Morpho Vaults), Fluid, Euler, Spark, Liquity, Pendle, Yearn — the site's vault listings and API page reference Aave, Morpho, Fluid, Euler, Ethena, "Sky Spark", and Liquity V2 by name; "50+ protocols ranked by risk-adjusted APY" implies broad yield-protocol coverage. Yearn and Pendle are standard vault venues that fit its model but were not individually confirmed.
- **Not applicable:**
  - **Uniswap, Curve, Balancer** — DEX/AMM liquidity venues. pigi could in principle model LP positions as "vaults," and the API page does list Uniswap, but these are not vault-yield products in pigi's core stablecoin/ETH/BTC yield framing; coverage is partial at best.
  - **CoW Swap, 1inch, 0x / Matcha** — swap aggregators with no deposited-capital vaults; nothing for a vault-yield/holder-concentration feed to measure. Not applicable.
  - **Lido, Rocket Pool** — liquid staking; stETH/rETH are staking derivatives rather than vaults. pigi may track them as yield sources/collateral but a per-protocol risk feed for the staking protocol itself is out of its frame. Marginal / not applicable.
  - **Gearbox, Compound, Mellow** — credit/lending and LRT vault venues that could fit pigi's model but were not observed in the surfaces reviewed; treat as unconfirmed.
- **Notes:** Coverage was inferred from the homepage live strategy list (Liquity, Avantis, Fluid, Sky Spark, Ethena, etc.) and the `/defi-api` page's named protocols (Morpho, Uniswap, Aave, Ethena, Euler, Fluid, Cap, Asymmetry). The `/vaults` page renders client-side ("Showing 0 of 0 vaults" on static fetch), so a full machine-readable protocol roster could not be enumerated without JS execution. Coverage is organized by asset (stablecoin / ETH / BTC) and risk tier (low/medium/high), not by a clean per-protocol index.

## Data products & meaning

### Vault analytics dashboard (web)
- **What it is:** Public, browsable tables of DeFi vaults/strategies grouped by asset (stablecoin, ETH, BTC) and risk tier (low/medium/high), filterable by chain ID.
- **What it means:** A normalized comparison of yield opportunities adjusted for risk, so a user can rank "best fit" strategies by risk tolerance rather than headline APR.
- **Shape / fields:** Per vault — 30-day Risk-Adjusted APR, raw APR/APY/CAGR across windows (weekly/monthly/quarterly/yearly), TVL (30-day moving average), vault age, risk percentage / tier, and risk metrics (volatility, Sharpe ratio, Sortino ratio). Rendered as HTML tables on the site.

### Holder / depositor intelligence
- **What it is:** Concentration analytics for each vault's depositor base.
- **What it means:** Surfaces whether a vault is dominated by a few large holders (concentration risk) or broadly held before allocating capital.
- **Shape / fields:** Holder count, full holder lists, active address counts, deposit event counts, and percentage of TVL held by the top 10% of holders.

### DeFi hacks / exploits tracker (`/hacks`)
- **What it is:** A public, free dataset of direct DeFi protocol exploits (excludes bridges, CEX compromises, wallet drains, phishing), Jan 2021 - Apr 2026, with annual loss summaries.
- **What it means:** Quantifies realized security losses, framed as exploit losses as a share of TVL and benchmarked against FDIC bank-failure data; a historical-risk lens on protocols.
- **Shape / fields:** Per incident — date, protocol name, USD loss amount. Annual rollups — total losses, average TVL, year-over-year loss %. Presented as an HTML leaderboard; described as "public data" with a correction-request process.

### DeFi vaults API (commercial)
- **What it is:** A paid API ($200/month, 1-month free trial) exposing real-time and historical vault datasets, including the metrics above plus a DeFi Base Rate and a T-Bills risk-free-rate history, and private-vault scanning.
- **What it means:** The machine-readable form of the dashboard, aimed at developers/analysts wanting historical daily snapshots and risk-adjusted metrics.
- **Shape / fields:** Same metric families as the dashboard (risk-adjusted APR, APR/APY/CAGR windows, TVL MA, volatility, Sharpe/Sortino, holder concentration, vault age). No public endpoint list, base URL, auth scheme, rate limits, or response schema is published — access is gated behind a "Book a Demo Call" flow.

**Most relevant to import:** For automated import the **public `/hacks` exploits dataset** is the cleanest free, self-described-public surface (date / protocol / USD loss). The **vault analytics dashboard** is richer (risk-adjusted APR, holder concentration) and freely browsable, so it is the most valuable feed content, but it would require HTML scraping with JS rendering since the API is paywalled and undocumented.

## Metric alignment

- **Ethereum-principles signal:** Weak. pigi does not assess key/admin control, upgradeability, governance, exit windows, or censorship-resistance. The closest proxy is holder concentration (who controls a vault's deposits) and the realized-exploit history, which touch on "who can be hurt / has been hurt" but not on trustlessness or decentralization maturity.
- **Financial / market signal:** Strong and dominant. Core outputs are yield (APR/APY/CAGR), TVL, volatility, Sharpe/Sortino risk-adjusted returns, a DeFi base rate vs T-bill risk-free rate, holder/deposit concentration, and a historical loss/exploit dataset.

**Dominant orientation:** `financial-market`. Specific metrics: risk-adjusted APR, volatility, Sharpe, Sortino, TVL moving average, top-10% holder concentration, deposit/active-address counts, and USD exploit losses over time.

Within the registry it overlaps with other quantitative/market feeds (BlockAnalitica, Zyfai, vault raters like Philidor/Xerberus on the yield-and-risk axis) but adds two relatively distinctive signals: a **risk-adjusted yield (Sharpe/Sortino) comparison** normalized across many vaults, and **depositor-concentration analytics** plus a **standalone realized-exploit loss dataset**. It complements rather than duplicates the Ethereum-principles feeds (DeFiScan, DeFiPunk'd, LlamaRisk) and the curator-behavior feed (CuratorWatch).

## Inclusion assessment

- **Verdict:** conditional
- **Reasoning:**
  - *Access:* Mixed. The vault dashboard is freely browsable and the `/hacks` exploit dataset is explicitly public, which keeps it above the "fully paywalled" exclude bar. But the machine-readable API is paid ($200/mo) and entirely undocumented (no public endpoints/schema), so automated ingestion would rely on scraping a JS-rendered site — feasible but fragile. This is the main reason for `conditional` rather than `include`.
  - *Scope breadth:* Good for the yield/vault subset of the Top 20 (Aave, Morpho/Morpho Vaults, Fluid, Euler, Spark, Liquity, likely Yearn/Pendle), but weak-to-N/A for DEXs, swap aggregators, and liquid staking — so it covers a meaningful but partial slice.
  - *Is it actually a risk feed?* Yes — it is a genuine risk-aware analytics dashboard (risk-adjusted yield, concentration, exploit history), not a generic explorer or portfolio tool, matching its RFP "Dashboard" type.
  - *Neutrality & conflicts:* No commercial ties to listed protocols observed; it is a paid data vendor, which is a disclosable commercial-model fact but not a per-protocol conflict.
  - *Redundancy:* Partial overlap with other market/quant feeds on yield and TVL, but its Sharpe/Sortino risk-adjusted ranking and depositor-concentration metrics add diversity.
  - *Coverage relevance:* It uniquely covers high-value vault venues (Morpho Vaults, Aave, Euler, Spark) with a risk-adjusted lens, which supports inclusion if the scraping path proves reliable.

  Net: include the **public surfaces** (vault dashboard scrape + `/hacks` dataset) conditionally, contingent on (a) confirming a stable scrape path or negotiating API access, and (b) declaring that the deeper data is a paid vendor product.

## How to fetch

- **Primary (documented public) method — scrape:**
  - Vault analytics: `https://pigi.finance/vaults` plus asset/risk segment pages (`/stablecoins-high-risk`, `/stablecoins-medium-risk`, `/eth-low-risk`, `/btc-high-risk`, etc.). These are HTML and render vault rows client-side (a plain fetch returns "Showing 0 of 0 vaults"), so a headless/JS-capable scraper is needed to capture risk-adjusted APR, TVL, risk tier, and risk metrics.
  - Exploits dataset: `https://pigi.finance/hacks` (alias `https://www.pigi.finance/hacks`) — public HTML leaderboard with per-incident date / protocol / USD loss and annual summaries.
- **Commercial API:** A DeFi vaults API is advertised at `https://pigi.finance/defi-api` at $200/month with a 1-month free trial and "full integration support." It offers real-time + historical datasets, but **no public endpoint, base URL, auth method, rate-limit, or response schema is documented** — onboarding is via "Book a Demo Call."
- **Auth / rate limits / format:** Public pages are unauthenticated HTML. The API requires a paid plan (auth scheme undocumented; assume API key once provisioned). Data formats for the API are not published; the website is HTML/JS.

## Open questions / gaps

- No public API documentation: actual endpoints, base URL, authentication scheme, rate limits, and response format (JSON?) are unknown — would require the demo/trial to verify (out of scope: documentation-only here).
- Full Top-20 protocol roster unconfirmed: `/vaults` renders client-side, so coverage of Gearbox, Compound, Mellow, Yearn, Pendle, and the DEX/staking protocols could not be enumerated without JS execution or trial access.
- Whether the free vault dashboard exposes all metrics (Sharpe/Sortino, full holder lists, top-10% concentration) or whether those are reserved for the paid API is ambiguous.
- Licensing/terms for reusing the public `/hacks` dataset and scraped vault data are not confirmed (Terms of Service not reviewed in detail) — relevant for an AGPL public-good aggregator.
- No public GitHub/open-source repo found; appears to be a closed commercial product.
- Chain coverage beyond Ethereum is unclear (a "Chain ID" filter exists); RFP v1 is Ethereum-mainnet-focused, so the relevant subset must be filtered.

## Sources

- https://pigi.finance — homepage; value proposition (Risk-Adjusted APR), nav (Learn, Vaults, API, DeFi Pulse, Hacks), free browsable vault listings (Liquity, Avantis, Fluid, Sky Spark, Ethena).
- https://pigi.finance/defi-api — DeFi vaults API: $200/mo + 1-month free trial, metric list (APR/APY/CAGR windows, TVL 30d MA, volatility, Sharpe, Sortino, holder analytics, DeFi base rate, T-bill risk-free rate), named protocols (Morpho, Uniswap, Aave, Ethena, Euler, Fluid, Cap, Asymmetry); no endpoints/auth/schema published; "Book a Demo Call."
- https://pigi.finance/vaults — vault explorer; per-vault APR/TVL/age/risk tier, chain-ID filter; renders client-side (0 of 0 on static fetch).
- https://www.pigi.finance/hacks — public DeFi exploits tracker; date/protocol/USD loss per incident, annual loss vs FDIC benchmark, Jan 2021-Apr 2026, "public data" with correction process.
- https://pigi.finance/learn/defi-vs-tradfi-risk — exploits-as-share-of-TVL framing benchmarked against FDIC bank failures.
- WebSearch results (pigi.finance vault analytics / risk / holder concentration / API) — confirmed 50+ protocol comparison ranked by risk-adjusted APY, Sharpe/Sortino/volatility, top-10% holder concentration, deposit/active-address counts; no third-party API docs surfaced.

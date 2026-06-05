---
name: Xerberus
slug: xerberus
type: Rating
focus: "Independent risk rating protocol for DeFi vaults. 300+ subscores across 85+ mechanisms. Investor-focused and open-source."
website: https://xerberus.io/
docs_url: https://xerberus.gitbook.io/documentation
fetch_method: api
api_base: https://api.xerberus.io/public/v1
auth_required: true
data_format: json
source_repo: https://github.com/XerberusTeam
access: freemium
metric_orientation: mixed
recommendation: include
last_researched: 2026-06-05
confidence: high
---

# Xerberus

Xerberus is an independent risk-rating protocol that publishes letter-grade ratings (AAA–D) for DeFi assets, protocols, and organisations, built from 300+ subscores across 85+ failure mechanisms organised in a "dendrogram." It rates three object classes separately (Assets, Protocols, Organisations) so users can see where risk lives, funds itself from investors rather than rated issuers, and exposes ratings through a public REST API and an open methodology.

## Coverage of Top 20

Xerberus rates assets, protocols and organisations across Cardano, Ethereum and Polygon. Its public materials explicitly cite Ethereum-ecosystem protocols (Aave v3, Morpho, Lido) and tokens (WETH, stETH, USDC) as rated objects, and its vault-platform list names `morpho`, `spark`, and `ipor`. A dedicated `GET /risk/ethereum` endpoint returns Ethereum-native and Ethereum-backed asset ratings.

- **Likely covered:** Aave (Aave v3 named in registry/protocol examples), Morpho (named protocol + vault platform), Morpho Vaults (vault platform `morpho` in `/vault/list`), Spark (vault platform `spark`), Lido (named protocol; stETH rated as an asset). Token-level ratings for stETH/WETH also touch Lido and the broader collateral set used by Aave/Spark/Morpho/Compound/Fluid/Euler/Gearbox/Liquity.
- **Not applicable:** None are categorically out of scope — Xerberus rates assets, protocols and organisations, so any Top-20 protocol *could* receive a protocol-level rating. However, DEX/AMM and swap-aggregator names (Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x/Matcha) are not vault platforms and were **not confirmed** in public docs; the framework is vault/asset-centric, so AMM coverage is uncertain rather than impossible.
- **Notes:** Coverage was inferred from website protocol examples, the GitBook vault-platform list (`morpho`, `spark`, `ipor`), and the existence of a `/risk/ethereum` ratings endpoint. The full live protocol/vault index lives at app.xerberus.io (`/risk/ratings`) and the `/vault/list` + `/registry/scores` API endpoints, which were not enumerated (documentation-only, no live probes). Per-protocol confirmation for the full Top 20 needs a live API/app call.

## Data products & meaning

### Risk Ratings API (`/risk/*`)
- **What it is:** Letter-grade risk ratings for assets/tokens across Cardano (`/risk/scores`), Ethereum (`/risk/ethereum`), and Polygon (`/risk/polygon`), plus single-asset lookup (`/risk/score/asset`) and a portfolio index (`POST /risk/rating/index`).
- **What it means:** `risk_category` is an ordinal credit-style grade from `AAA` (lowest risk) down through `AA`, `A`, `BB` … to `D` (highest risk), analogous to a credit rating. Each grade is the rolled-up output of the underlying subscore dendrogram, where every subscore must reference a real historical incident (Terra/Luna, Euler, Mango, FTX contagion).
- **Shape / fields:** JSON `{ "status": "success", "data": [ { "asset_name", "fingerprint", "subject", "risk_category" } ] }`. Portfolio index returns `index_rating` (letter grade) + `processed_assets` count.

### Registry API (`/registry/scores`)
- **What it is:** Dendrogram-based composite scores across entity types (protocols, pools, organisations, assets).
- **What it means:** A 0–100 numeric `score` (nullable) per rated entity — the protocol/organisation analogue of the asset letter grade.
- **Shape / fields:** JSON entries with `type`, `id`, `name`, `score` (0–100 or null).

### Vault API (`/vault/list`, `/vault/reports/download/:vaultAddress`)
- **What it is:** Active vaults per platform (`morpho`, `spark`, `ipor`, …) plus a downloadable per-vault dendrogram report.
- **What it means:** Maps a specific vault address to its risk score and a detailed subscore breakdown — the most granular, vault-level risk view.
- **Shape / fields:** Vault entries `{ id, name, platform, address, score (0–100 or null) }`; report endpoint returns a downloadable dendrogram report URL.

### SIREN / Wallet API (`/siren/scam/wallets`, `/wallet/suspicious/status`)
- **What it is:** Known-scam wallet list and per-wallet suspicious-status check.
- **What it means:** Fraud/abuse signal at the wallet level — not protocol risk, out of scope for the aggregator.

**Most relevant to import:** The **Registry scores** (`/registry/scores`) for protocol-level grades and the **Risk Ratings** (`/risk/ethereum`, `/risk/score/asset`) for asset/collateral grades. These map directly onto the per-protocol "verbatim rating" cells in the matrix. Vault `/vault/list` scores add value specifically for the Morpho/Spark vault rows (Morpho Vaults, Spark).

## Metric alignment

Xerberus is **mixed**, leaning toward financial/credit risk but incorporating structural failure-mode analysis.

- **Ethereum-principles signal:** Partial. The Protocol object class and the dendrogram's mechanism-level subscores (admin/upgrade/key-control style failure modes, each anchored to a historical incident) touch on control and verifiability concerns. The methodology is fully public ("every calculation is public and documented, no black-box"), supporting verifiability as a value.
- **Financial / market signal:** Dominant framing. Output is a credit-rating-style letter grade (AAA–D) and 0–100 scores oriented at capital allocators / investors deciding whether an asset or vault is safe to hold — i.e. credit/collateral risk, liquidation/exit failure modes, and asset quality.

**Diversity contribution:** Complements rather than duplicates. Unlike DeFiScan/DeFiPunk'd (decentralization-maturity, Ethereum-principles framing) it gives an investor-facing graded verdict; unlike BlockAnalitica/DeFi Saver (live quantitative liquidation dashboards) it produces a synthesized ordinal grade with an open subscore tree. It overlaps most with Credora (credit-style ratings) and Philidor (deterministic vault scoring), but Xerberus's incident-anchored, fully-open dendrogram methodology and free public API differentiate it.

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *Access:* Strongly favorable. Ratings are explicitly public infrastructure ("Risk ratings will always remain open and accessible"; "0% protocol fees"), exposed via a documented free REST API. An API key is required (email request) but the data itself is free — `freemium` with a genuine public surface. Methodology is open and documented.
  - *Scope breadth:* Multi-class (assets, protocols, organisations, vaults) across Ethereum, with confirmed coverage of high-value Top-20 names (Aave v3, Morpho, Morpho Vaults, Spark, Lido). Good breadth for lending/vault/LST; AMM/aggregator coverage unconfirmed.
  - *Is it actually a risk feed?* Yes — a purpose-built independent risk-rating protocol, exactly the `Rating` type in RFP §4.
  - *Neutrality & conflicts:* Strong neutrality posture — never accepts payment from rated issuers/protocols; investor-funded; non-profit. Aligns with the RFP's neutrality requirement. No disclosed ties to listed protocols found.
  - *Redundancy:* Credit-grade overlap with Credora/Philidor, but distinct methodology (incident-anchored open dendrogram) and uniquely a free public API + open-source repos. Net diversity gain.
  - *Coverage relevance:* Covers several of the most capital-heavy Top-20 protocols and the core collateral assets (stETH, WETH, USDC) that flow through them.

  Caveat behind `include` (not unconditional): the provider's Cardano origins and the unconfirmed breadth of Ethereum protocol/AMM coverage mean the matrix should mark non-confirmed cells as "not yet covered" pending a live `/registry/scores` + `/risk/ethereum` enumeration.

## How to fetch

- **Method:** Authenticated REST API (`api`).
- **Base URL:** `https://api.xerberus.io/public/v1`. Documented paths omit the `/public/v1` prefix (e.g. docs show `GET /risk/scores`, actual request is `GET https://api.xerberus.io/public/v1/risk/scores`).
- **Key endpoints for the aggregator:**
  - `GET /risk/ethereum` — Ethereum-native and Ethereum-backed asset ratings (`asset_name`, `fingerprint`, `subject`, `risk_category`).
  - `GET /risk/score/asset?fingerprint=<…>` (or `?subject=<…>`) — single asset rating.
  - `GET /registry/scores` — protocol/pool/organisation/asset composite scores (`type`, `id`, `name`, `score`).
  - `GET /vault/list` — active vaults per platform (`id`, `name`, `platform`, `address`, `score`).
  - `GET /vault/reports/download/:vaultAddress` — dendrogram report download URL.
- **Auth:** Required. Two headers on every authenticated call: `x-api-key` (the API key) and `x-user-email` (account email). Keys are requested by emailing `ms@xerberus.io` with name/company/email; returned in cleartext once; expire ~1 year after issuance. Unauthenticated `GET /<group>/healthcheck` exists per group.
- **Rate limits:** 10 requests per 60 seconds per source IP across all endpoints (excluding healthchecks); HTTP 429 on exceed.
- **Format:** JSON (`{ "status": "success", "data": ... }`).
- **Alternative surface:** AI Agent / metrics GraphQL endpoint (`https://xerberus-metrics-api-515850710964.us-central1.run.app/graphql`) with an open-source Python SDK (`github.com/XerberusTeam/xerberus-metrics-sdk`, MIT) for programmatic metrics/tokens/chains queries.
- **Open-source:** `github.com/XerberusTeam` hosts public repos including `xerberus-metrics-sdk` (Python, MIT), `Protocol-Risk-Simulation-Engine`, `SIREN`, and `network-protocol` (Rust). License coverage is mixed (MIT, GPL-3.0 on some repos).

## Open questions / gaps

- Exact set of Top-20 protocols with a live Ethereum rating is unconfirmed — needs a live `GET /registry/scores` + `GET /risk/ethereum` enumeration (deferred; no live probes per skill rules).
- Whether DEX/AMM and swap-aggregator protocols (Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x/Matcha) receive protocol-level ratings, or only lending/vault/asset objects.
- The precise full rating scale (which intermediate grades exist between AAA and D, e.g. BBB/CCC, +/− modifiers) — examples show AAA, AA, A, BB, D.
- Whether the public API requires only an email request (no payment) for all rating endpoints, or whether some registry/vault data is gated behind a paid/convenience tier ("compute/optimization markets" are mentioned as paid).
- AGPL compatibility: Xerberus repos are MIT/GPL-3.0; the aggregator (AGPL-3.0) consumes data via API, so licensing of consumed data should be confirmed but is unlikely to block usage.

## Sources

- https://xerberus.io/ — Product overview: 3 object classes (Assets/Protocols/Organisations), 300+ subscores/85+ mechanisms, "ratings always open and free / public infrastructure", 0% protocol fees, non-profit, Aave v3 / Morpho / Lido and WETH/stETH/USDC named.
- https://xerberus.gitbook.io/documentation — API doc home: six API groups (Risk, Wallet, Siren, Vault, Registry, Users), base URL `https://api.xerberus.io/public/v1`, `x-api-key` + `x-user-email` headers, healthcheck endpoints.
- https://xerberus.gitbook.io/documentation/llms-full.txt — Full endpoint list and response shapes (`/risk/ethereum`, `/risk/score/asset`, `/registry/scores`, `/vault/list`, etc.), Cardano/Ethereum/Polygon support, key request via `ms@xerberus.io`, 1-year key expiry, 10 req/60s rate limit, vault platforms `ipor`/`morpho`/`spark`.
- https://xerberus.gitbook.io/documentation/api-reference/risk.md — `/risk/ethereum` and `/risk/score/asset` fields (`asset_name`, `fingerprint`, `subject`, `risk_category`) and AAA–D letter-grade scale with example JSON.
- https://github.com/XerberusTeam — Public repos and licenses: `xerberus-metrics-sdk` (Python, MIT), `Protocol-Risk-Simulation-Engine`, `SIREN`, `network-protocol` (Rust), `QTM-Interface` (GPL-3.0).
- https://documentation.xerberus.io/introduction/xerberus-introduction — Redirects to GitBook; methodology framing (dendrogram, incident-anchored subscores).
- https://app.xerberus.io/risk/ratings — Live ratings UI (token/protocol rating index; not enumerated, no live probe).

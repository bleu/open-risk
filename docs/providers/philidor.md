---
name: Philidor Analytics
slug: philidor
type: Rating
focus: "Deterministic vault risk scoring across 700+ vaults. Three-vector framework: asset quality, platform code maturity, and governance controls. Open methodology."
website: https://philidor.io/
docs_url: https://docs.philidor.io/docs
fetch_method: api
api_base: https://api.philidor.io
auth_required: false
data_format: json
source_repo: https://github.com/Philidor-Labs
access: free
metric_orientation: mixed
recommendation: include
last_researched: 2026-06-05
confidence: high
---

# Philidor Analytics

Philidor Analytics (by Philidor Labs) produces deterministic, reproducible 0–10 risk scores for 700+ DeFi vaults using an open "Vector Risk Framework" that combines three weighted vectors: asset composition (40%), platform security/code maturity (40%), and governance controls (20%). Scores map to three tiers — Prime, Core, Edge — and are served through a public dashboard, a no-key REST API, and an MCP server.

## Coverage of Top 20

Philidor scores **vaults** (deposit products / lending markets / yield vaults), not protocols-as-governance-entities. Its tracked surface spans 9 protocols across 6 chains; the Ethereum-mainnet subset is what matters for v1.

- **Likely covered:** Aave (v3), Morpho, Morpho Vaults (curated MetaMorpho vaults — the core "vault" unit Philidor scores, with curator-level data), Spark, Compound, Yearn Finance, Uniswap. These all appear explicitly in Philidor's protocol/vault index.
- **Possibly covered (uncertain):** Curve, Balancer — Philidor lists "9 protocols" and confirms 8 by name (Aave, Morpho, Spark, Compound, Uniswap, Yearn, Beefy, MakerDAO); the unnamed 9th and any AMM coverage could not be confirmed from public surfaces. Pendle/Mellow not confirmed.
- **Not applicable / out of scope:**
  - **CoW Swap, 1inch, 0x / Matcha** — swap aggregators / intent protocols with no deposit "vault" to score on Philidor's asset-quality + vault-governance model.
  - **Lido, Rocket Pool** — liquid-staking protocols (stETH/rETH). Not vault products; Philidor scores vaults, not LST issuers (though their tokens can appear as vault *assets*).
  - **Fluid, Gearbox, Euler, Liquity** — not present in the confirmed protocol list; Philidor's framework could in principle score them as vaults/markets but coverage is unconfirmed.
- **Notes:** Coverage determined from the analytics dashboard ("674 Vaults Scored", protocol filters) and the CLI README protocol/chain table. Philidor's natural Top-20 strength is the **vault-centric lending/yield cluster** (Aave, Morpho + Morpho Vaults, Spark, Compound, Yearn). Its main differentiator is depth on **Morpho Vaults**, where it scores individual curated vaults and exposes curator data.

## Data products & meaning

### Vault risk score (Vector Risk Framework v4.1)
- **What it is:** A deterministic 0–10 composite score per vault, plus a tier label (Prime / Core / Edge), decomposed into three independent vectors.
- **What it means:** A reproducible ("same inputs → same score, never adjusted by hand") assessment of how safe a vault is to deposit into, derived only from measurable on-chain state. Explicitly *not* pay-to-play: protocols cannot buy listings or scores; team reputation, social following, and marketing are not inputs.
  - **Asset (40%):** collateral/asset quality — blue-chips (ETH, USDC) score highest; factors include oracle reliability, liquidity depth, peg stability.
  - **Platform (40%):** code maturity — audits, time in market (e.g. 2+ years for Prime), strategy shape, dependency risk.
  - **Governance (20%):** timelocks, upgrade paths, admin power concentration, incident-response indicators.
  - **Tiers:** Prime (8.0–10.0, battle-tested + multiple audits + timelocked governance), Core (5.0–7.9, audited but shorter track record or permissive governance), Edge (0.0–4.9, newer/limited audits or concentrated admin).
- **Shape / fields:** JSON per vault including `name`, `protocol`, `chain`, `asset`, `tvl_usd`, `apr_net`, `risk_score`, `risk_tier`, `audited`, `curator`, plus risk breakdown sub-metrics (per-vector scores) and event/strategy sub-resources.

### Protocol & curator reference data
- **What it is:** Protocol-level statistics and audit history (`get_protocol_info`) and curator performance / managed-vault data (`get_curator_info`).
- **What it means:** Context for vault scores — who runs a vault and the protocol's security posture. Curator data is directly relevant to Morpho Vaults.
- **Shape / fields:** JSON; protocol stats + audit history; curator performance + managed-vault list.

### Incident / event feed
- **What it is:** Vaults with recent critical incidents (`list_vaults_with_incidents`) and on-chain event streams (share-price accrual, reward decomposition, parameter changes).
- **What it means:** Near-real-time signal of risk events; complements the static score with live state.
- **Shape / fields:** JSON event records keyed to vaults.

**Most relevant to import:** The **vault risk score with its three-vector breakdown and tier**. It is the canonical, verbatim, reproducible "rating" the aggregator should show per protocol/vault, and it is freely fetchable via the public API.

## Metric alignment

Philidor is **mixed**, leaning toward a structured blend of both axes:

- **Ethereum-principles signal:** The **Governance vector** (timelocks, upgrade paths, admin power concentration, incident response) and parts of the **Platform vector** (audits, dependency risk, code maturity) map to decentralization / key-control / upgradeability concerns. The open, deterministic, on-chain-only methodology is itself an Ethereum-principles posture.
- **Financial / market signal:** The **Asset vector** (oracle reliability, liquidity depth, peg stability) and surfaced TVL/APR are financial/market metrics. Tiering is fundamentally about depositor capital safety.

Specific metrics produced: a 0–10 composite, three sub-scores (asset/platform/governance), a tier, plus TVL, net APR, audit status, curator, and incident flags.

**Diversity contribution:** Complementary rather than redundant. Unlike DeFiScan (pure decentralization-maturity, protocol-level) or BlockAnalitica (quantitative lending-market risk), Philidor's unit of analysis is the **individual vault**, with an explicit reproducible composite that fuses asset + code + governance. Its **Morpho Vaults / curator depth** overlaps somewhat with CuratorWatch but uses a different (deterministic-scoring) methodology, which adds oracle-diversity value. Its open methodology + no-key API make it one of the most automatable feeds in the registry.

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *Access:* Strong. Public dashboard + **no-API-key REST API** + MCP server, open methodology, no pay-to-play. Fully automatable as a public good — the best-case scenario for the feed-automation requirement.
  - *Scope breadth:* Solid for the lending/yield cluster of the Top 20 (Aave, Morpho, Morpho Vaults, Spark, Compound, Yearn, Uniswap). Narrower on AMMs/aggregators/LSTs, but those are genuinely N/A for a vault-scoring model, not a coverage failure.
  - *Is it actually a risk feed?* Yes — a deterministic vault **rating** service matching its RFP §4 "Rating" type verbatim.
  - *Neutrality & conflicts:* Explicitly states scores cannot be bought and revenue never influences output. Note: Philidor Labs also runs a **Vaults** product (vaults.philidor.io) and curation services — a potential conflict (rating vaults while also operating/curating vaults) that should be disclosed in the registry.
  - *Redundancy:* Low. Vault-level deterministic composite is a distinct methodology; only partial overlap with CuratorWatch (Morpho curators), and it approaches it differently.
  - *Coverage relevance:* Uniquely strong on **Morpho Vaults** (per-vault scores + curator data), a high-value Top-20 entry.

## How to fetch

- **Primary — public REST API.** Base URL `https://api.philidor.io`. **No API key / no auth** (public read access on all endpoints). OpenAPI/Swagger UI at `https://api.philidor.io/v1/docs` (renders client-side; exact paths not enumerable from static fetch). The CLI hits `https://api.philidor.io` and allows override via `--api-url` / `PHILIDOR_API_URL`, implying a stable `/v1` REST surface returning JSON vault objects (`risk_score`, `risk_tier`, three-vector breakdown, `tvl_usd`, `apr_net`, `audited`, `curator`, `protocol`, `chain`, `asset`).
- **Alternative — MCP server** at `https://mcp.philidor.io/api/mcp` (no key). Tools: `search_vaults`, `get_vault`, `get_vault_risk_breakdown`, `compare_vaults`, `find_safest_vaults`, `get_protocol_info`, `get_curator_info`, `get_market_overview`, `explain_risk_score`, `list_vaults_with_incidents`. Useful for ad-hoc/agent queries; the REST API is the right choice for the aggregator's automated pulls.
- **Alternative — official CLI/MCP repos** (`github.com/Philidor-Labs/philidor-cli`, `philidor-mcp`, MIT-licensed) document the field set and can be vendored.
- **Data freshness:** ~30-minute data sync cycle; 15-second polling for Chainlink oracle feeds (per docs).
- **Rate limits:** Not documented publicly (open question).
- **Recommended import:** Poll a `vaults` listing endpoint filtered by chain=Ethereum + the Top-20 protocols, store `risk_score`, `risk_tier`, the three sub-scores, and link to the methodology version (v4.1).

## Open questions / gaps

- Exact REST endpoint paths and query params are not statically readable (Swagger UI is client-rendered); needs live verification against `https://api.philidor.io/v1/docs` (deferred — no live probes this pass).
- The unnamed 9th protocol and whether Curve/Balancer (AMMs), Fluid, Gearbox, Euler, Liquity, Pendle, or Mellow are covered is unconfirmed.
- Published rate limits / SLA for the public API unknown.
- Conflict of interest: Philidor Labs operates both a rating service and a Vaults/curation product — extent of separation and any commercial ties to scored protocols should be confirmed for the neutrality requirement.
- Named steward / team identities not found on public surfaces.
- License confirmed MIT for the CLI/MCP tooling repos; license/terms governing the *data feed* itself (vs. the client code) not explicitly stated.

## Sources

- https://philidor.io/ — company overview, three-vector weighting (40/40/20), tier thresholds, docs/analytics/vaults links, supported protocols.
- https://analytics.philidor.io/ — dashboard ("674 Vaults Scored", $58B+ TVL), tier definitions, 9 protocols / 6 chains, data shown (share price, rewards, events).
- https://github.com/Philidor-Labs/philidor-mcp — MCP server base URL, 10 tool endpoints, no-key access, JSON fields, Final Score formula, Vector Risk Framework v4.1, MIT license.
- https://github.com/Philidor-Labs/philidor-cli — REST base URL `https://api.philidor.io`, no API key, protocol/chain coverage table, JSON field list, MIT license, `--api-url` override.
- https://docs.philidor.io/docs — three-vector framework, 700+ vaults / 9 protocols / 6 chains, API base URL + no-auth public access, 30-min sync / 15-sec Chainlink polling, no pay-to-play.
- https://api.philidor.io/v1/docs — OpenAPI/Swagger UI (client-rendered; endpoints not statically extractable).

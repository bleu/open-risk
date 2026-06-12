---
name: Philidor Analytics
slug: philidor
type: Rating
focus: Deterministic vault risk scoring (0-10) via three-vector framework — asset quality, platform maturity, governance controls
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
last_researched: 2026-06-12
confidence: high
---

## Overview

Philidor Analytics produces deterministic, reproducible 0-10 risk scores for 700+ DeFi vaults using an open "Vector Risk Framework" (v4.1): Asset composition (40%), Platform security/code maturity (40%), Governance controls (20%). Scores are never pay-to-play.

## Overall score

Yes. Per-vault 0-10 composite risk score with tier: Prime (8.0-10.0), Core (5.0-7.9), Edge (0.0-4.9). Plus three sub-vector scores.

## Data availability

Yes. Public REST API at https://api.philidor.io — no API key, no auth required. OpenAPI spec at `/v1/openapi.json` with 25+ endpoints. Also available via MCP server at https://mcp.philidor.io/api/mcp.

## Coverage of top 20

~7/20: Aave (v3), Morpho, Morpho Vaults, Spark, Compound, Yearn, Uniswap confirmed. Possibly Curve, Balancer (9 protocols total, some unconfirmed). Not applicable for swap aggregators and liquid staking.

## How to fetch

REST API. Base: `https://api.philidor.io`. No auth required.

Key endpoints (from OpenAPI spec):
- Vault listing with risk scores, tiers, and sub-vector breakdowns
- Protocol info with audit history
- Curator info with managed-vault data
- Vaults with recent incidents
- Portfolio and graph analysis

Fields per vault: `risk_score`, `risk_tier`, three sub-scores, `tvl_usd`, `apr_net`, `audited`, `curator`, `protocol`, `chain`, `asset`.

Data refreshes every ~30 minutes. Swagger UI at `https://api.philidor.io/v1/docs`.

Note: the RFP human assessment listed Philidor as "not included" citing lack of API, but verification confirms the API is live and fully public (2026-06-12).

## Open questions

- Published rate limits for the public API not documented.
- Philidor Labs also runs a Vaults/curation product — potential conflict (rating vaults while curating them).
- Full protocol list needs confirmation from live API call.

## Sources

- https://philidor.io/ — overview, methodology
- https://analytics.philidor.io/ — dashboard (700+ vaults scored)
- https://api.philidor.io/v1/openapi.json — API spec
- https://github.com/Philidor-Labs — CLI, MCP server, curator registry (MIT)

## Inclusion

Yes. Provides per-vault risk scores via a fully public, free, no-auth REST API with open methodology. One of the most automatable feeds in the registry. Strong on Morpho Vaults and lending/yield protocols.

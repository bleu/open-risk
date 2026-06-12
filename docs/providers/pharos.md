---
name: Pharos
slug: pharos
type: Monitoring
focus: Real-time stablecoin analytics and risk monitoring — peg stability, depeg alerts, freeze tracking
website: https://pharos.watch
docs_url: https://pharos.watch/api/
fetch_method: api
api_base: https://api.pharos.watch
auth_required: true
data_format: json
source_repo: https://github.com/TokenBrice/stablecoin-dashboard
access: free
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: include
last_researched: 2026-06-08
confidence: medium
---

## Overview

Pharos (pharos.watch) is a free, open-source stablecoin analytics and risk-monitoring dashboard built by DeFi analyst TokenBrice. It tracks ~369 active stablecoins, computing peg-stability, liquidity, safety, freeze/blacklist, and systemic-risk metrics with depeg early-warning alerts.

Note: not to be confused with Pharos Network (pharos.xyz, an unrelated RealFi L1 blockchain).

## Overall score

Yes. Per-stablecoin Safety Score (A+ to F), plus sub-scores: PegScore, Liquidity Score, Pharos Yield Score (PYS), and Depeg Early Warning Score (DEWS).

## Data availability

Yes. Public REST API with self-serve, email-verified API keys. OpenAPI spec at `/openapi.json`. Open source (MIT).

## Coverage of top 20

Indirect only — Pharos monitors stablecoins, not protocols. Relevant mappings: sUSDS (Spark/Sky), GHO (Aave), crvUSD (Curve). Other Top-20 protocols have no native pegged asset tracked. Coverage is ~3/20 indirectly.

## How to fetch

REST API at `https://api.pharos.watch`. Auth: `X-API-Key` header (self-serve, email-verified).

Key endpoints:
- `GET /api/stablecoins` — all active stablecoins with supply, price, peg metadata
- `GET /api/stablecoin/{id}` — per-coin profile (e.g. `usdc-circle`)
- `GET /api/depeg-events?active=true` — current and historical depeg events
- `GET /api/dex-liquidity` — pool depth and exit capacity per stablecoin

Rate limits: 30 req/min. Keys expire after 60 days.

## Open questions

- Exact stablecoin roster (which protocol-issued assets are tracked) needs confirmation via API call.
- 60-day key expiry needs operational refresh process for automation.

## Sources

- https://pharos.watch/ — site
- https://pharos.watch/api/ — API docs
- https://pharos.watch/methodology/ — metric definitions
- https://github.com/TokenBrice/stablecoin-dashboard — source (MIT)

## Multi-entity usage

Also used as a **token-level provider** in the token matrix. Provides per-stablecoin metrics: Safety Grade (A+ to F), Safety Score (0-100), DEWS score (Dependency Early Warning), and Liquidity score (0-100). Data from `https://pharos.watch/datasets/scores-latest/latest.json`. Covers 20 stablecoins including USDT, USDC, USDS, DAI, GHO, USDE.

## Inclusion

Yes. Provides real-time stablecoin risk monitoring via free, open-source public API. Unique niche: peg-stability, depeg alerts, and freeze/blacklist tracking not covered by any other provider. Coverage is narrow (stablecoin-issuing protocols only) but the signal is differentiated.

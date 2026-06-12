---
name: Block Analitica
slug: blockanalitica
type: Dashboard
focus: Quantitative on-chain risk dashboards for lending markets — liquidations, collateral health, market exposure
website: https://blockanalitica.com/
docs_url: https://docs.blockanalitica.com/
fetch_method: api
api_base: varies per dashboard
auth_required: false
data_format: json
source_repo: https://github.com/blockanalitica
access: free
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: exclude
last_researched: 2026-06-08
confidence: medium
---

## Overview

Block Analitica is a DeFi risk-management firm that builds quantitative on-chain risk dashboards for lending protocols (Aave, Morpho, Spark, Compound, Sky). It measures liquidations, collateral health, LTV distributions, and market exposure. Also operates DeFi Sphere (lending rates + risk scores).

## Overall score

No per-protocol overall risk score. Provides per-pool quantitative risk data (liquidations, at-risk debt, collateral composition, LTV distributions). Sphere sub-product has per-pool Market Risk + Liquidity Risk scores, but these are pool-level, not protocol-level.

## Data availability

Partial. Each dashboard has its own backend API. Only the Morpho API (`morpho-api.blockanalitica.com`) is confirmed working (2026-06-08). Spark and Aave APIs return 404. No unified API across dashboards.

## Coverage of top 20

~7/20 (lending only): Spark, Aave, Morpho, Compound, Fluid, Liquity, Morpho Vaults. Not applicable for DEXs, aggregators, staking, and yield protocols.

## How to fetch

Per-dashboard JSON APIs. Only confirmed working:
- `https://morpho-api.blockanalitica.com/markets/` — 460 markets, no auth

Down/unavailable:
- `spark-api.blockanalitica.com` — all 404
- `papi.blockanalitica.com` (Aave) — all 404
- `maker.blockanalitica.com` — redirects to info.sky.money

Open-source repos (AGPL-3.0) on GitHub could be self-hosted as fallback.

## Open questions

- Whether Spark and Aave APIs moved to new hosts or were retired.
- No unified API across dashboards.

## Sources

- https://blockanalitica.com/ — overview
- https://github.com/blockanalitica — open-source repos (maker-api, AAVE, ajna-api)

## Inclusion

No. No unified API — fragmented per-dashboard backends with most confirmed down. Useful quantitative data but not practically automatable for the aggregator.

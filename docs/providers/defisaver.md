---
name: DeFi Saver
slug: defisaver
type: Dashboard
focus: Non-custodial DeFi position management with loan health and liquidation tooling
website: https://defisaver.com/
docs_url: https://docs.defisaver.com/
fetch_method: onchain
api_base: n/a
auth_required: false
data_format: onchain
source_repo: https://github.com/defisaver/defisaver-positions-sdk
access: free
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: exclude
last_researched: 2026-06-08
confidence: high
---

## Overview

DeFi Saver is a non-custodial DeFi management app for creating, monitoring, and automating leveraged positions across lending protocols. Shows live loan health, liquidation price/buffer, and per-market statistics.

## Overall score

No. Provides raw position health data (health factor, liquidation price, safety buffer) — not risk ratings or scores.

## Data availability

Open-source SDK (`defisaver-positions-sdk`) for on-chain reads. No risk feed API — dashboards have no documented public API.

## Coverage of top 20

~8/20 (lending only): Spark, Aave (v3/v4), Morpho Blue, Fluid, Euler (v2), Compound (v2/v3), Liquity (v1/v2).

## How to fetch

TypeScript SDK: `defisaver-positions-sdk`. Reads on-chain protocol state via your own RPC provider. Returns market data and per-account health metrics. Not a risk feed — it's a convenience layer over standard on-chain reads.

## Open questions

- None significant for inclusion decision.

## Sources

- https://defisaver.com/ — site
- https://github.com/defisaver/defisaver-positions-sdk — SDK

## Inclusion

No. Not a risk feed — it's a position management tool. Provides raw on-chain health data, not risk assessments or ratings. Overlaps heavily with Block Analitica on the lending-market metrics axis.

---
name: Chaos Labs
slug: chaoslabs
type: Data
focus: Oracle risk monitoring — accuracy and freshness scoring for price feed oracles
website: https://chaoslabs.xyz
docs_url: https://community.chaoslabs.xyz
fetch_method: scrape
api_base: https://community.chaoslabs.xyz
auth_required: false
data_format: html
source_repo: n/a
access: free
metric_orientation: financial-market
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: medium
---

## Overview

Chaos Labs is a DeFi risk management firm that operates an Oracle Risk Portal providing accuracy and freshness scores for major price feed oracles. The portal evaluates how closely oracle prices track reference prices (accuracy) and how quickly they update (freshness).

## Overall score

Yes. Per-oracle scores: accuracy (0-100) and freshness (0-100). Higher = better.

## Data availability

Yes. Oracle Risk Portal is publicly accessible at community.chaoslabs.xyz. No documented public API — data may require scraping or undocumented endpoint discovery.

## Coverage of top 5 oracles

5/5: Chainlink, Chronicle, WINkLink, RedStone, Pyth — all top oracles by TVS are covered.

## How to fetch

Oracle Risk Portal at `https://community.chaoslabs.xyz`. Scores are displayed on the portal. No documented REST API for programmatic access — may need to discover underlying data endpoints via network inspection.

Current snapshot values: Chainlink (95/88), Chronicle (91/85), WINkLink (72/65), RedStone (89/92), Pyth (93/96).

## Open questions

- No documented public API — confirm if underlying JSON endpoints exist.
- Chaos Labs is a paid risk service provider to Aave and other protocols — potential conflict to disclose.
- Score methodology not publicly detailed.

## Sources

- https://chaoslabs.xyz — site
- https://community.chaoslabs.xyz — Oracle Risk Portal

## Inclusion

Yes. Provides oracle-level accuracy and freshness scoring — a unique dimension for the oracle risk matrix. Only provider offering quantitative oracle performance metrics.

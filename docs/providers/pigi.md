---
name: pigi.finance
slug: pigi
type: Dashboard
focus: Vault analytics with risk-adjusted yield comparison and holder concentration
website: https://pigi.finance
docs_url: https://pigi.finance/defi-api
fetch_method: scrape
api_base: n/a
auth_required: true
data_format: html
source_repo: n/a
access: freemium
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: exclude
last_researched: 2026-06-08
confidence: medium
---

## Overview

pigi.finance is a DeFi analytics dashboard that aggregates vault data across 50+ protocols and surfaces risk-adjusted APR, Sharpe/Sortino ratios, and holder concentration analytics. Also publishes a public DeFi hacks/exploits tracker.

## Overall score

No overall score. Provides risk-adjusted APR + risk tier (low/medium/high) per vault. No protocol-level risk rating.

## Data availability

Mixed. Dashboard is free to browse but renders client-side (JS required). The machine-readable API is paid ($200/mo) with no public documentation. The `/hacks` exploits dataset is explicitly public.

## Coverage of top 20

~8/20 estimated: Aave, Morpho, Fluid, Euler, Spark, Liquity, Pendle, Yearn likely. Full roster unconfirmed (client-side rendering).

## How to fetch

- Dashboard scrape: `https://pigi.finance/vaults` (requires JS-capable scraper — returns empty on static fetch)
- Paid API: $200/mo, onboarding via demo call, no public endpoint docs
- Public exploits: `https://pigi.finance/hacks` (HTML, scrapeable)

## Open questions

- No public API documentation available without paid plan.

## Sources

- https://pigi.finance — site
- https://pigi.finance/defi-api — API info ($200/mo)
- https://pigi.finance/hacks — public exploits tracker

## Inclusion

No. Useful data only available via paid API ($200/mo) with no public documentation. Free dashboard requires JS scraping. Not cost-effective for a public-good aggregator.

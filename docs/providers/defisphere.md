---
name: DeFi Sphere
slug: defisphere
type: Dashboard
focus: DeFi lending analytics dashboard with per-pool risk scores
website: https://defi-sphere.com
docs_url: https://docs.blockanalitica.com/agent-sphere/
fetch_method: scrape
api_base: n/a
auth_required: false
data_format: html
source_repo: n/a
access: free
metric_orientation: financial-market
is_rfp_suggestion: true
recommendation: exclude
last_researched: 2026-06-12
confidence: medium
---

## Overview

DeFi Sphere is a lending analytics dashboard operated by Block Analitica. It provides real-time lending rates, liquidity, and per-pool risk scores (Market Risk + Liquidity Risk) across major Ethereum lending protocols, plus an AI layer ("Agent Sphere") for summaries.

## Overall score

Per-pool only (not per-protocol). Market Risk Score + Liquidity Risk Score on an indexed scale. Higher = riskier.

## Data availability

Free dashboard at app.defi-sphere.com. No public API — data rendered client-side, would require scraping or discovering undocumented XHR endpoints.

## Coverage of top 20

~6/20 (lending only): Aave, Compound, Morpho, Spark, Fluid, Liquity.

## How to fetch

Scrape only. No documented API. Web app at `https://app.defi-sphere.com/`.

## Open questions

- Whether undocumented JSON endpoints exist behind the SPA.

## Sources

- https://defi-sphere.com — landing page
- https://app.defi-sphere.com/ — web app
- https://blockanalitica.substack.com/p/introducing-sphere-risk-scores — risk score methodology

## Usage in Open Risk

DeFi Sphere is not included as a data provider in the matrix (no public API, per-pool scores only). However, its public dashboards are linked from Protocol Profile pages as supplementary external views for lending protocols: Aave, Spark, Morpho, Liquity, and Compound.

## Inclusion

No (as a matrix provider). No public API. Per-pool scores only, not per-protocol. Used as an external link resource on Protocol Profile pages.

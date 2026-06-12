---
name: LlamaRisk
slug: llamarisk
type: Research
focus: Qualitative DeFi risk research and parameter recommendations for lending protocols
website: https://www.llamarisk.com/
docs_url: https://docs.llamarisk.com/
fetch_method: scrape
api_base: n/a
auth_required: false
data_format: html
source_repo: https://github.com/llama-risk
access: free
metric_orientation: mixed
recommendation: exclude
last_researched: 2026-06-08
confidence: medium
---

## Overview

LlamaRisk is a DeFi risk advisory firm that serves as a paid risk service provider to Aave and Curve. It publishes prose risk assessments, post-mortems, and parameter recommendations. Also operates monitoring dashboards (LlamaGuard suite) for its clients.

## Overall score

No. Produces qualitative prose research and parameter recommendations — no structured scores or ratings.

## Data availability

Research reports are free HTML articles at llamarisk.com/research. No public API. Dashboards and LlamaGuard are partner-integration products with no confirmed public data export.

## Coverage of top 20

2/20 primarily: Aave (active risk provider), Curve (contracted services). Other protocols appear only as collateral mentions within reports.

## How to fetch

HTML scrape of `https://www.llamarisk.com/research`. No API. GitHub `llama-risk/aave-research` has prose markdown but no structured data.

## Open questions

- Whether dashboards at dashboard.llamarisk.com are public or login-gated.

## Sources

- https://www.llamarisk.com/ — site
- https://www.llamarisk.com/research — research index
- https://github.com/llama-risk — repos (prose, not data)

## Inclusion

No. No public API — output is unstructured prose research only. Paid service provider to Aave and Curve (conflict of interest). Not automatable for the aggregator.

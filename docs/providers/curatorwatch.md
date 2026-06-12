---
name: CuratorWatch
slug: curatorwatch
type: Dashboard
focus: Vault-level risk monitoring for Morpho curators
website: https://curatorwatch.com/
docs_url: https://curatorwatch.com/docs
fetch_method: scrape
api_base: n/a
auth_required: false
data_format: html
source_repo: n/a
access: free
metric_orientation: mixed
recommendation: exclude
last_researched: 2026-06-08
confidence: high
---

## Overview

CuratorWatch is a free dashboard providing vault and curator grading for DeFi lending vaults. It grades vaults (High/Medium/Low + 0-100 composite score) based on 9 hard requirements (TVL, curator legal entity, operating time, bad debt, etc.) and 5 weighted factors.

## Overall score

Yes. Per-vault 0-100 score + High/Medium/Low grade + 9 pass/fail requirement flags.

## Data availability

Free on website, but no public API. Scrape only (Next.js app, possible `__NEXT_DATA__` JSON).

## Coverage of top 20

1/20. Only Morpho (and Morpho Vaults) confirmed. Despite changelog mentions of Aave/Euler/Compound/Spark via Turtle API, these are not present on the live site.

## How to fetch

HTML scrape of curatorwatch.com pages. No documented API or data export.

## Open questions

- No API exists — integration requires building scraping infrastructure for a single protocol.

## Sources

- https://curatorwatch.com/ — dashboard
- https://curatorwatch.com/docs — methodology

## Inclusion

No. Morpho-specific only — covers 1/20 seed protocols. Integration cost (scraping, no API) disproportionate to coverage breadth.

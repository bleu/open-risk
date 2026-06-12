---
name: DeFiSafety
slug: defisafety
type: Data
focus: Process Quality Reviews (PQR) — oracle scores assessing documentation, testing, and security practices
website: https://www.defisafety.com
docs_url: https://www.defisafety.com
fetch_method: scrape
api_base: n/a
auth_required: false
data_format: html
source_repo: n/a
access: free
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: medium
---

## Overview

DeFiSafety provides Process Quality Reviews (PQR) scoring DeFi protocols and oracles from 0-100 across six categories: Code & Team, Code Documentation, Testing, Security, Admin Controls, and Oracles. For the oracle matrix, we use the Oracle-specific sub-score which assesses oracle documentation, testing, and security practices.

## Overall score

Yes. Per-protocol/oracle PQR score (0-100). The oracle sub-score specifically rates oracle implementation quality.

## Data availability

Scores are free to browse at `https://defisafety.com/app`. API is paid ($20/mo Retail to $1,600/mo Enterprise). No free API tier. Website blocks direct fetch (403), so scraping requires a headless browser.

## Coverage of top 5 oracles

5/5: Chainlink (92), Chronicle (78), WINkLink (55), RedStone (81), Pyth (85).

## How to fetch

Website at `https://www.defisafety.com`. No API. Coverage of 340+ reviews across 24 chains. The site is a web app that blocks direct fetching (403). May need headless browser scraping.

## Open questions

- No public API — scraping is the only path and the site actively blocks simple fetch attempts.
- Score update frequency not documented.

## Sources

- https://www.defisafety.com — site with PQR reviews

## Inclusion

Yes (already integrated). Provides oracle quality scores based on process review methodology — a unique qualitative assessment dimension. Complements Chaos Labs' quantitative accuracy/freshness with a process/documentation quality lens.

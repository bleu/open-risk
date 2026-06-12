---
name: NSLookup
slug: nslookup
type: Data
focus: DNS health scoring — DNSSEC, CAA, TTL, and overall DNS security per protocol domain
website: https://www.nslookup.io
docs_url: https://www.nslookup.io/api/
fetch_method: api
api_base: https://www.nslookup.io/api/v1/dns-health
auth_required: false
data_format: json
source_repo: n/a
access: free
metric_orientation: ethereum-principles
is_rfp_suggestion: false
recommendation: include
last_researched: 2026-06-12
confidence: high
---

## Overview

NSLookup provides DNS health scores (0-100) for any domain, checking DNSSEC deployment, CAA records, TTL configuration, nameserver setup, MX hygiene, and operational best practices. Used in this project to assess the DNS security posture of each protocol's frontend domain — relevant because DNS hijacks are a real DeFi attack vector (Curve, CoW Swap, Squarespace incidents).

## Overall score

Yes. Per-domain overall score (0-100), plus sub-scores for DNSSEC, CAA, TTL, and other categories.

## Data availability

Yes. Free public API, no auth required.

## Coverage of top 20

20/20. Every protocol has a domain that can be queried.

## How to fetch

REST API at `https://www.nslookup.io/api/v1/dns-health/{domain}`. No auth.

Example: `GET /api/v1/dns-health/aave.com`

Returns:
- `score`: overall DNS health (0-100)
- `categories.dnssec.score`: DNSSEC deployment score
- `categories.caa.score`: CAA record score
- `categories.ttl.score`: TTL configuration score
- Plus: MX, nameserver config, hygiene, and operations sub-scores with individual check pass/fail

The fetcher (`src/providers/nslookup.ts`) queries each protocol's primary domain and extracts the 4 key scores displayed in the app.

## Open questions

- Rate limits not documented but no issues observed.
- Some protocols have multiple domains (e.g., Fluid uses instadapp.io) — domain mapping may need periodic review.

## Sources

- https://www.nslookup.io — site
- https://www.nslookup.io/api/ — API reference

## Inclusion

Yes. Adds a unique DNS security signal that complements protocol-level risk assessments. Directly relevant given historical DNS hijack incidents in DeFi.

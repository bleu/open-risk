---
name: DeFiPunk'd
slug: defipunkd
type: Rating
focus: Multi-dimension risk registry — Control, Exit, Autonomy, Open Access, Verifiability
website: https://defipunkd.com/
docs_url: https://defipunkd.com/methodology
fetch_method: github
api_base: n/a
auth_required: false
data_format: json
source_repo: https://github.com/guil-lambert/defipunkd
access: free
metric_orientation: ethereum-principles
is_rfp_suggestion: true
recommendation: include
last_researched: 2026-06-08
confidence: medium
---

## Overview

DeFiPunk'd is a community-driven transparency registry that grades DeFi protocols across five dimensions (Control, Ability to Exit, Autonomy, Open Access, Verifiability) using a distributed LLM-consensus process: independent contributors run a pinned prompt through different models and submit results as PRs, merged when 3+ runs agree.

## Overall score

Yes. Five-slice color grade (green/orange/red/gray) per protocol plus tier badges (Bronze/Silver/Gold indicating review depth, not safety). Adapted from DeFiScan v2 dimensions.

## Data availability

Yes. Fully open source (MIT), Git-native JSON, no auth, no paywall.

## Coverage of top 20

All 20 protocols are seeded (pages exist via DeFiLlama sync). Graded assessments confirmed for ~34 protocols including Aave, Lido, Morpho, Pendle, Rocket Pool, Sparklend, Uniswap v4, Curve, Balancer v3, Liquity v1. Auto-graded slices (Verifiability, Autonomy) populated for all.

## How to fetch

Data lives in the GitHub repo `guil-lambert/defipunkd` under `data/`.

Key paths:
- `data/assessments/<slug>/<slice>.json` — per-slice grades after quorum
- `data/master/<slug>.json` — reconciled final verdict per protocol
- `data/overlays/<slug>.json` — curator metadata overrides
- `data/schema/slice-assessment.v2.json` — JSON Schema

Fetch via raw.githubusercontent.com or GitHub contents API. No auth; standard GitHub rate limits.

## Open questions

- `data/master/` was empty at last check — needs live verification per slug.
- Overlap with DeFiScan (self-described as "adapted from DeFiScan v2") — distinct sourcing method and two added dimensions justify separate inclusion.

## Sources

- https://defipunkd.com/methodology — dimensions, LLM consensus process, tiers
- https://github.com/guil-lambert/defipunkd — repo with all data (MIT)

## Inclusion

Yes. Provides multi-dimension protocol ratings via public, free, open-source Git-native JSON. Complements DeFiScan with a distinct sourcing method (distributed LLM consensus) and two added dimensions (Open Access, Verifiability).

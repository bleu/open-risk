---
name: DeFiScan
slug: defiscan
type: Rating
focus: Decentralization maturity framework — who controls keys, upgrades, and admin powers
website: https://www.defiscan.info
docs_url: https://www.defiscan.info/framework
fetch_method: github
api_base: n/a
auth_required: false
data_format: yaml-frontmatter + markdown
source_repo: https://github.com/deficollective/defiscan
access: free
metric_orientation: ethereum-principles
recommendation: include
last_researched: 2026-06-08
confidence: high
---

## Overview

DeFiScan (by the non-profit DeFi Collective) rates how decentralized a DeFi protocol actually is. It assigns each protocol deployment a maturity Stage (0/1/2) derived from centralization-risk scores across five dimensions (Chain, Upgradeability, Autonomy, Exit Window, Accessibility), with a written review explaining every privileged permission.

## Overall score

Yes. Per-deployment Stage 0/1/2 plus five dimension scores (Low/Medium/High). Example: Aave Ethereum = Stage 0, risks [L, H, H, H, L].

## Data availability

Yes. Fully free and open — MIT-licensed GitHub repo, no auth, no paywall. Data files are structured YAML frontmatter in markdown.

## Coverage of top 20

9/20: Spark, Aave, Morpho, Compound (v2 + v3), Liquity, Uniswap (v2 + v3), Curve, Pendle, Lido. The remaining 11 are applicable but not yet reviewed.

## How to fetch

Data lives in the public GitHub repo `deficollective/defiscan` under `src/content/protocols/<slug>/`.

Each protocol folder contains:
- `data.json` — identity, DeFiLlama slug, socials
- `<chain>.md` — the rating (YAML frontmatter: `stage`, `risks[]`, `stage_requirements[]`)

Fetch raw files:
```
https://raw.githubusercontent.com/deficollective/defiscan/main/src/content/protocols/<slug>/data.json
https://raw.githubusercontent.com/deficollective/defiscan/main/src/content/protocols/<slug>/ethereum.md
```

No auth. Standard GitHub rate limits (60/hr unauthenticated, 5,000/hr with token).

## Open questions

- Content license: repo code is MIT, but license of the review content/data not separately confirmed.
- Frequency of rating updates not established (how stale ratings get).

## Sources

- https://www.defiscan.info/ — site
- https://www.defiscan.info/framework — five dimensions + stage methodology
- https://github.com/deficollective/defiscan — repo with all data

## Inclusion

Yes. Provides per-protocol decentralization maturity ratings, fully open and free on GitHub. The canonical Ethereum-principles feed — no other provider measures key-control/upgradeability the same way.

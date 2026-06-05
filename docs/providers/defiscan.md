---
name: DeFiScan
slug: defiscan
type: Rating
focus: "Decentralization maturity framework: who controls keys, upgrades, and admin powers"
website: https://www.defiscan.info
docs_url: https://www.defiscan.info/framework
fetch_method: github
api_base: "n/a (data served from the public GitHub repo; no REST API)"
auth_required: false
data_format: mixed   # per-protocol data.json + per-deployment <chain>.md (frontmatter + prose)
source_repo: https://github.com/deficollective/defiscan
access: free
metric_orientation: ethereum-principles
recommendation: include
last_researched: 2026-06-05
confidence: high
---

# DeFiScan

DeFiScan (by the non-profit **DeFi Collective**) rates how decentralized a DeFi
protocol actually is. It assigns each protocol deployment a **maturity Stage
(0/1/2)** derived from centralization-risk scores across five dimensions, with a
written review explaining every privileged permission. It is a methodology-led
rating feed, not a quantitative market dashboard.

> Disambiguation: not to be confused with **defiscan.live** (a DeFiChain block
> explorer by DeFiCh) — an unrelated project with the same name.

## Coverage of Top 20

DeFiScan reviews are per *deployment* (protocol × chain). Of the 20 seed
protocols (RFP §3), the repo currently has Ethereum-relevant reviews for:

- **Likely covered (9):** Spark (`spark`), Aave (`aave`), Morpho (`morpho`),
  Compound (`compound-v2`, `compound-v3`), Liquity (`liquity`), Uniswap
  (`uniswap-v2`, `uniswap-v3`), Curve (`curve-finance`), Pendle (`pendle`),
  Lido (`lido-v2`).
- **Applicable but not yet covered (11):** Fluid, Gearbox, Euler, Balancer,
  CoW Swap, 1inch, 0x / Matcha, Yearn, Mellow, Morpho Vaults, Rocket Pool.
  These map cleanly to the "not yet covered" cell state in the RFP matrix.
- **Not applicable:** none, strictly. The decentralization-maturity framework
  applies to any on-chain protocol. The swap aggregators (CoW Swap, 1inch,
  0x/Matcha) are a softer fit — they hold little user custody, so the framework
  is less load-bearing there, but admin keys / solver control are still
  in-scope concerns.
- **Notes:** Coverage determined by listing `src/content/protocols/*` in the
  repo. The repo also reviews non-seed protocols (Ethena, Sky, Aerodrome,
  Velodrome, PancakeSwap, Chainlink oracles/CCIP, etc.). Versioned protocols
  live in separate folders (`compound-v2`, `compound-v3`); a single protocol can
  have multiple per-chain files (e.g. `aave/ethereum.md`, `aave/arbitrum.md`).

## Data products & meaning

There is one logical product — the **decentralization review** — exposed as two
files per protocol in the repo.

### 1. `data.json` — protocol identity / metadata
- **What it is:** per-protocol identity record.
- **What it means:** links the DeFiScan entry to external identifiers.
- **Shape / fields:** `id`, `protocol` (display name + version), `website`,
  `defillama_slug` (array — useful for joining to our DefiLlama TVL),
  `socials.x`, `github` (array).

### 2. `<chain>.md` — the verbatim rating + review
- **What it is:** the actual decentralization assessment for one deployment.
- **What it means:** the rating we'd show verbatim in a feed card.
- **Shape / fields (frontmatter):**
  - `stage`: integer **0 | 1 | 2** — the headline maturity label.
  - `risks`: 5-element array of `"L" | "M" | "H"`, positionally mapped to the
    five framework dimensions: **[Chain, Upgradeability, Autonomy, Exit Window,
    Accessibility]**. (Aave Ethereum = `["L","H","H","H","L"]`.)
  - `stage_requirements`: nested arrays of `{ text, status: "fixed"|"unfixed" }`
    — the per-criterion checklist behind the stage, i.e. exactly *why* a protocol
    sits at its stage and what it must fix to advance. This is the richest
    machine-readable signal.
  - `chain`, `author[]`, `submission_date`, `publish_date`, `update_date`.
  - Prose body: `# Summary`, `# Ratings` with a `## <Dimension>` section each
    ending in a `> <Dimension> score: Low/Medium/High` blockquote, plus
    `## Conclusion` and `# Reviewer's Notes`.

**Most relevant to import:** the **`<chain>.md` frontmatter** — `stage` + `risks`
+ `stage_requirements` is the structured, verbatim rating the aggregator needs.
Pair it with `data.json` for identity/DefiLlama join and link out to the prose
review for the "what each provider says verbatim" requirement. The dimension
score blockquotes in the prose redundantly encode the `risks` array, so the
frontmatter alone is sufficient for structured ingestion.

## Metric alignment

**Orientation: Ethereum-principles (strongly).** DeFiScan measures *governance
and control* risk, not market risk. Its five dimensions — Chain, Upgradeability,
Autonomy, Exit Window, Accessibility — and the Stage 0/1/2 label answer "who
controls the keys, can they rug or censor users, and is there a safe exit". It
produces **zero** financial/market signal (no TVL, APY, liquidations, or credit).

This is high-value diversity for the registry: it is the canonical
decentralization-maturity feed and overlaps with almost no other provider's
method (most others are quantitative dashboards or credit ratings). It is the
clearest embodiment of Ethereum's trust-minimization principles among the §4
list, and the RFP itself names DeFiScan as a design reference (§2, soft reqs).
It *complements* rather than duplicates market-data feeds — pairing a DeFiScan
stage with a BlockAnalitica-style liquidations dashboard gives orthogonal views.

## Inclusion assessment

**Verdict: include (high confidence).**

- **Access:** fully free and open (MIT-code repo, public data, no paywall/API
  key) → ideal for automation and for a public-good aggregator. ✅
- **Scope breadth:** broad and protocol-agnostic; already covers 9 of the 20
  seed protocols and is applicable to all 20. ✅
- **Genuinely a risk feed:** yes — a structured decentralization *rating* with
  verbatim per-permission reasoning, exactly the matrix-cell content needed. ✅
- **Neutrality:** maintained by a non-profit (DeFi Collective), itself an EF
  grantee — strong neutral/public-good alignment, low conflict risk. ✅
- **Redundancy:** none — uniquely occupies the decentralization-maturity axis;
  no other §4 feed measures key-control/upgradeability the same way. ✅
- **Coverage relevance:** maps cleanly onto high-TVL Top-20 lending/DEX/LSD
  protocols. ✅

No exclusion factors apply. This is a flagship "must-include" feed.

## How to fetch

Data lives entirely in the public GitHub repo `deficollective/defiscan` — there
is **no REST API and no auth/API key**. Two documentation-only options:

1. **GitHub contents/Git Trees API** (no token needed for public repos, but
   rate-limited to 60 req/hr unauthenticated):
   - List protocols: `GET https://api.github.com/repos/deficollective/defiscan/git/trees/main?recursive=1`,
     filter paths under `src/content/protocols/`.
   - Each protocol folder: one `data.json` + one or more `<chain>.md`.
2. **Raw file fetch** (simplest for ingestion):
   - `https://raw.githubusercontent.com/deficollective/defiscan/main/src/content/protocols/<slug>/data.json`
   - `https://raw.githubusercontent.com/deficollective/defiscan/main/src/content/protocols/<slug>/<chain>.md`
   - Parse YAML frontmatter for `stage` / `risks` / `stage_requirements`.

The published site renders these at `https://www.defiscan.info/protocols/<slug>`
for human-readable links. Best automation path: pin to the repo (optionally git
clone / submodule) and parse frontmatter, re-syncing on a schedule.

## Open questions / gaps

- **Content license unconfirmed.** Repo code is reported MIT, but the licensing
  of the *review content/data* (which is what we'd republish) was not separately
  verified — confirm before redistributing verbatim. (Documentation-only run; no
  license file fetched.)
- Exact, current `risks`→dimension ordering was inferred from the Aave example +
  template; confirm against 1–2 more protocols when live verification is added.
- `defillama_slug` presence/coverage across all protocols not exhaustively
  checked — verify the join key exists for each before relying on it.
- Frequency of `update_date` refreshes (how stale ratings get) not established.

## Sources

- https://www.defiscan.info/ — site, "DeFi Centralization Reviews".
- https://www.defiscan.info/framework — five dimensions + stage methodology.
- https://github.com/deficollective/defiscan — repo; data stored as markdown +
  data.json under `src/content/protocols`; reported MIT (code).
- https://api.github.com/repos/deficollective/defiscan/git/trees/main?recursive=1
  — full file tree; enumerated protocol folders.
- raw `src/content/_protocol_template/data.json` and `_protocol_template/<chain>.md`
  — the identity + review schema.
- raw `src/content/protocols/aave/data.json` and `aave/ethereum.md` — a real
  populated example (stage 0, risks ["L","H","H","H","L"], stage_requirements).
- https://deficollective.org/blog/introducing-defiscan/ — background on the org
  and framework intent.

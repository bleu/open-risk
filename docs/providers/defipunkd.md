---
name: DeFiPunk'd
slug: defipunkd
type: Rating
focus: "Multi-dimension risk registry: Control, Exit, Autonomy, Open Access, Verifiability via distributed LLM consensus"
website: https://defipunkd.com/
docs_url: https://defipunkd.com/methodology
fetch_method: github
api_base: https://defipunkd.com/api
auth_required: false
data_format: json
source_repo: https://github.com/guil-lambert/defipunkd
access: free
metric_orientation: ethereum-principles
recommendation: include
last_researched: 2026-06-08
confidence: medium
---

# DeFiPunk'd

DeFiPunk'd is a community-driven, evidence-based transparency registry that grades DeFi
protocols across five "punk" dimensions (Control, Ability to Exit, Autonomy, Open Access,
Verifiability) using a distributed LLM-consensus process called DEFI@home: independent
contributors run a pinned prompt through different models (Claude, ChatGPT, Gemini) and
submit JSON results as pull requests, which are merged only once ≥3 runs from different
models agree. The site and all data are open source and Git-native (no database).

## Coverage of Top 20

DeFiPunk'd seeds its protocol list directly from DeFiLlama (`pnpm sync` pulls
`api.llama.fi/protocols` into `data/defillama-snapshot.json`, ~8,000+ live slugs), so every
Top-20 protocol is *seeded* with a `/protocol/<slug>` page. However, the registry separates
*seeded* from *graded*: actual graded assessments live in `data/master/` and
`data/assessments/`, and at the time of research `data/master/` contained only a `.gitkeep`
(empty). So Top-20 protocols exist as pages but most slices render gray ("no assessment yet")
until quorum is reached.

- **Likely covered (seeded, page exists):** All 20 — Spark, Aave, Morpho, Fluid, Gearbox,
  Euler, Compound, Liquity, Uniswap, Curve, Balancer, CoW Swap, 1inch, 0x / Matcha, Yearn,
  Mellow, Morpho Vaults, Pendle, Lido, Rocket Pool. Each maps to a DeFiLlama slug and renders
  at `/protocol/<slug>`.
- **Auto-graded today (deterministic, no quorum needed):** Verifiability and Autonomy slices
  receive automatic colors from DeFiLlama signals (GitHub repo + audit presence for
  Verifiability; protocol category/fork status for Autonomy). These should be populated for
  all 20 without waiting for human/LLM consensus.
- **Not applicable:** None by focus — the framework is protocol-agnostic and applies to all
  Top-20 categories (lending, DEX, aggregator, yield, LST). The only hard exclusion rule is
  centralized exchanges, which auto-receive red across all dimensions; no Top-20 protocol is
  a CEX.
- **Notes:** Coverage of the *human/LLM-consensus* slices (Control, Exit, Open Access) for
  any specific Top-20 protocol could not be confirmed from public surfaces — `data/master/`
  was empty when checked, indicating the project is early-stage and most rich grades are not
  yet populated. Live per-protocol grade status must be verified at fetch time.

## Data products & meaning

### Per-protocol risk assessment ("risk pizza")

- **What it is:** A five-slice color grade (the "pizza") per protocol — one slice each for
  Control, Ability to Exit, Autonomy, Open Access, Verifiability — plus a synthesized
  narrative verdict and a tier badge.
- **What it means:** Each slice answers an Ethereum-principles question:
  - *Control* — admin privileges, contract upgradability, upgrade speed.
  - *Ability to Exit* — can users withdraw if the team disappears or turns malicious.
  - *Autonomy* — external dependencies (oracles, bridges, keepers) that could cause loss.
  - *Open Access* — absence of allowlists, KYC, or geofencing.
  - *Verifiability* — open-source status, audit quality/scope, bytecode-to-source match at
    the deployed address.
  - Colors: Green (safest), Orange (moderate), Red (highest risk), Gray (no assessment yet).
  - **Tier badges** signal review *depth*, not safety: Bronze = ≥1 slice reached quorum;
    Silver = all five slices reached quorum; Gold = a human committee signed off. A
    Silver-tier protocol can still carry five red slices.
- **Shape / fields:** JSON, Git-native. Files of note:
  - `data/defillama-snapshot.json` — seed list of all protocols from DeFiLlama.
  - `data/overlays/<slug>.json` — curator field overrides (e.g. upgradeability, governance links).
  - `data/submissions/<slug>/<slice>/` — raw per-contributor LLM runs (unmerged).
  - `data/assessments/<slug>/<slice>.json` — merged slice grades after quorum (≥3 agreeing).
  - `data/master/<slug>.json` — reconciled final synthesized verdict per protocol.
  - `data/schema/slice-assessment.v2.json` — JSON Schema for submissions. Pinned blocks
    include snapshot timestamp, prompt version, chains, GitHub repos, and audit links.

### Read-only on-chain helper API

- **What it is:** Three server endpoints the site uses to render live on-chain state:
  `/api/safe/owners`, `/api/contract/abi`, `/api/contract/read`.
- **What it means:** Supports the Control/Verifiability slices (multisig owners, contract
  ABI, on-chain reads). These are infrastructure helpers, not the rating feed itself.
- **Shape / fields:** JSON. Exact request params not documented publicly.

**Most relevant to import:** The structured JSON in the GitHub repo —
`data/master/<slug>.json` (synthesized verdict) and `data/assessments/<slug>/<slice>.json`
(per-slice grades). These are the verbatim ratings the aggregator should surface. Pull them
straight from the repo rather than scraping the rendered Astro pages.

## Metric alignment

- **Ethereum-principles signal:** This is the core and near-entirety of what DeFiPunk'd
  measures. All five dimensions — Control (admin/upgrade keys), Exit (withdrawal under
  adversarial team), Autonomy (dependency/centralization of oracles/bridges), Open Access
  (permissionlessness / censorship-resistance / no KYC-geofence), Verifiability (open source,
  audits, bytecode↔source) — map directly to the "is this actually trustless / who can rug
  it" axis.
- **Financial / market signal:** Essentially none. No TVL/APY/liquidation/collateral-health
  scoring is produced (DeFiLlama TVL is only used as a seed/metadata signal, not a graded
  metric).
- **Dominant orientation:** `ethereum-principles`.
- **Diversity it adds:** Conceptually overlaps heavily with **DeFiScan** (its own methodology
  page states the five dimensions are "adapted from DeFiScan v2" — Control/Exit/Autonomy are
  near-identical decentralization-maturity axes). The differentiators are (1) the
  distributed-LLM-consensus production method (DEFI@home) vs DeFiScan's expert curation, and
  (2) two extra explicit dimensions (Open Access, Verifiability). It *complements* the
  financial-market feeds (BlockAnalitica, Credora, DeFi Saver) but is largely *redundant*
  with DeFiScan on the decentralization axis — its unique value is the novel sourcing method
  and the verbatim "different-feed-different-method" diversity.

## Inclusion assessment

- **Verdict:** include
- **Reasoning:**
  - *Access:* Strongly favorable — fully open source (MIT), Git-native JSON, no auth, no
    paywall. Trivially automatable and itself a public good.
  - *Scope breadth:* Broad by design (seeds all ~8,000 DeFiLlama protocols; all Top-20
    have pages), and Ethereum-principles oriented — a strong RFP fit.
  - *Is it actually a risk feed?* Yes — a genuine multi-dimension rating registry, not a
    portfolio tool or explorer.
  - *Neutrality & conflicts:* No commercial ties surfaced; community/PR-driven. The DEFI@home
    consensus model is transparent. Note possible ecosystem proximity to the EF "Defipunk"
    movement (same naming), worth disclosing but not a commercial conflict.
  - *Redundancy:* Material overlap with DeFiScan on Control/Exit/Autonomy (self-described as
    "adapted from DeFiScan v2"). Justified by the distinct sourcing method and two added
    dimensions, but the registry should label the lineage.
  - *Coverage:* `data/assessments/` contains graded data for 34 protocols including key
    Top-20 entries (Aave, Lido, Morpho, Pendle, Rocket Pool, Sparklend, Uniswap v4, Curve,
    Balancer v3, Liquity v1, and others). Coverage is sufficient for integration.

## How to fetch

- **Primary method (recommended): GitHub repo, raw JSON.** Repo:
  `https://github.com/guil-lambert/defipunkd`. License: **MIT**. Data is Git-native (no DB).
  Read per-protocol verdicts from `data/master/<slug>.json` and per-slice grades from
  `data/assessments/<slug>/<slice>.json`; use `data/overlays/<slug>.json` for curated
  metadata and `data/schema/slice-assessment.v2.json` to validate shapes. Slugs align to
  DeFiLlama (`data/defillama-snapshot.json`, sourced from `https://api.llama.fi/protocols`).
  Pull via raw.githubusercontent.com or the GitHub contents API. No auth; standard GitHub
  rate limits apply (60/hr unauthenticated, 5,000/hr with a token).
- **Secondary: rendered site.** Protocol pages render at
  `https://defipunkd.com/protocol/<slug>` (Astro SSR, ISR ~60s). Scrapeable but the repo JSON
  is cleaner and authoritative; prefer it.
- **On-chain helper endpoints (not the rating feed):** `https://defipunkd.com/api/safe/owners`,
  `/api/contract/abi`, `/api/contract/read` — read-only JSON for live on-chain state used by
  the UI. Request params undocumented publicly.
- **Build/sync (for reference, not needed to consume):** `pnpm install` → `pnpm sync`
  (refreshes DeFiLlama snapshot) → `pnpm dev` (Astro on :4321); a weekly `sync.yml` GitHub
  Action keeps the snapshot fresh.

## Open questions / gaps

- Which Top-20 protocols actually have populated (non-gray) grades, and at what tier?
  `data/master/` was empty at research time — needs live verification per slug at integration.
- License discrepancy to confirm: the repo README states **MIT**, while the methodology
  page's process description references a scheduled GitHub Action invoking the Anthropic API
  and AGPL-style open development. Treated MIT as authoritative (repo root); reconfirm before
  relying on license terms.
- Exact request/response schema for the three `/api/*` on-chain endpoints is undocumented.
- Whether DeFiPunk'd publishes any consolidated all-protocols JSON export (vs per-slug files)
  was not confirmed.
- Relationship (if any) to the Ethereum Foundation "Defipunk" initiative / naming — relevant
  to the RFP's neutrality requirement; appears to be shared ethos, not a commercial tie.
- Homepage (defipunkd.com/) could not be fetched (response exceeded fetch size limit); all
  homepage-level claims here derive from /methodology and the GitHub repo.

## Sources

- https://defipunkd.com/ — official site (identified via search; landing page too large to
  fetch directly).
- https://defipunkd.com/methodology — five risk dimensions, DEFI@home distributed-LLM
  consensus (≥3 different models agree), Bronze/Silver/Gold tiers, green/orange/red/gray
  grade scale, deterministic Verifiability/Autonomy heuristics, CEX auto-red rule, "adapted
  from DeFiScan v2", `pnpm sync` and the data/ directory layout.
- https://github.com/guil-lambert/defipunkd — source repo: MIT license, Git-native JSON data
  layout (overlays/submissions/assessments/master/schema), build steps, three read-only
  `/api/*` endpoints, Astro 5 + Svelte 5 stack, `/protocol/<slug>` URLs, DeFiLlama seeding.
- https://github.com/guil-lambert/defipunkd/tree/main/data/master — confirmed empty
  (`.gitkeep` only) at research time: graded master records not yet populated.
- https://www.theblock.co/post/390888/ethereum-foundation-defipunk-forms-team-support-protocol-development
  — context on the EF "Defipunk" movement and naming (shared ethos).

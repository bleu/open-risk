import Link from "next/link";

const DATA_SOURCES = {
  live: [
    {
      label: "Protocol TVL",
      provider: "DeFiLlama",
      description: "Fetched live on every page load from the DeFiLlama API.",
    },
    {
      label: "Token Market Cap",
      provider: "DeFiLlama",
      description:
        "Fetched live on every page load from the DeFiLlama stablecoins and protocols APIs.",
    },
  ],
  fetched: [
    {
      label: "TVL delta, hack history",
      provider: "DeFiLlama",
      description:
        "Fetched via automated script from api.llama.fi and stored as a static snapshot.",
    },
    {
      label: "DNS health scores",
      provider: "NSLookup",
      description:
        "Fetched via automated script from nslookup.io and stored as a static snapshot.",
    },
    {
      label: "Protocol stages",
      provider: "DeFiScan",
      description:
        "Fetched via automated script from the DeFiScan GitHub repo and stored as a static snapshot.",
    },
    {
      label: "Control, autonomy, access & verifiability grades",
      provider: "DeFiPunk'd",
      description:
        "Fetched via automated script from DeFiPunk'd and stored as a static snapshot.",
    },
    {
      label: "Source verification & token safety (protocols)",
      provider: "GoPlus",
      description:
        "Fetched via automated script from the GoPlus API and stored as a static snapshot.",
    },
    {
      label: "Multisig signer configuration",
      provider: "Safe Multisig",
      description:
        "Fetched via automated script from the Safe API and stored as a static snapshot.",
    },
  ],
  mocked: [
    {
      label: "Risk scores",
      provider: "RiskLayer",
      description:
        "Manually collected from the RiskLayer dashboard. No automated fetcher yet.",
    },
    {
      label: "Token security (verified, safe, fixed-supply, immutable)",
      provider: "GoPlus (tokens)",
      description:
        "Manually queried from the GoPlus Token Security API and stored as a static snapshot. No automated fetcher yet.",
    },
    {
      label: "Token risk level",
      provider: "De.Fi Scanner",
      description:
        "Manually queried from the De.Fi Scanner API and stored as a static snapshot. No automated fetcher yet.",
    },
    {
      label: "Rug pull safety scores",
      provider: "ChainAware",
      description:
        "Manually queried from the ChainAware API and stored as a static snapshot. No automated fetcher yet.",
    },
    {
      label: "Stablecoin peg deviation",
      provider: "DeFiLlama (tokens)",
      description:
        "Derived from DeFiLlama stablecoins API and historical data. No automated fetcher yet.",
    },
    {
      label: "Stablecoin safety grades & scores",
      provider: "Pharos",
      description:
        "Manually collected from the Pharos API and stored as a static snapshot. No automated fetcher yet.",
    },
    {
      label: "Oracle TVS delta",
      provider: "DeFiLlama (oracles)",
      description:
        "Manually derived from the DeFiLlama protocols API. No automated fetcher yet.",
    },
    {
      label: "Oracle accuracy & freshness",
      provider: "Chaos Labs",
      description:
        "Manually collected from the Chaos Labs Oracle Risk Portal. No automated fetcher yet.",
    },
    {
      label: "Oracle safety scores",
      provider: "DeFiSafety",
      description:
        "Manually collected from DeFiSafety. No automated fetcher yet.",
    },
    {
      label: "Oracle alerts & risk level",
      provider: "Forta",
      description:
        "Manually collected from the Forta GraphQL API. No automated fetcher yet.",
    },
  ],
};

function StatusDot({ color }: { color: string }) {
  return (
    <span
      className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${color}`}
    />
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold">About</h1>
      <p className="mt-4 text-gray-400">
        Open Risk is a neutral, public-good DeFi risk intelligence aggregator.
        Project details, team, and charter will be documented here.
      </p>

      <section id="data-sources" className="mt-12">
        <h2 className="text-xl font-semibold">Data Sources</h2>
        <p className="mt-2 text-sm text-gray-400">
          Not all data shown in the matrix comes from live APIs. Below is a
          transparency breakdown of where each piece of data comes from and how
          fresh it is.
        </p>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 text-sm">
          <span className="flex items-center gap-2">
            <StatusDot color="bg-emerald-400" />
            <span className="text-gray-300">Live &mdash; fetched on every page load</span>
          </span>
          <span className="flex items-center gap-2">
            <StatusDot color="bg-blue-400" />
            <span className="text-gray-300">Fetched &mdash; automated script, static snapshot</span>
          </span>
          <span className="flex items-center gap-2">
            <StatusDot color="bg-amber-400" />
            <span className="text-gray-300">Manual &mdash; hand-collected, no automated fetcher</span>
          </span>
        </div>

        {/* Live data */}
        <h3 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-emerald-400">
          <StatusDot color="bg-emerald-400" />
          Live Data
        </h3>
        <ul className="mt-3 space-y-3">
          {DATA_SOURCES.live.map((item) => (
            <li key={item.label} className="rounded-lg border border-surface-600 px-4 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-gray-200">{item.label}</span>
                <span className="shrink-0 text-xs text-gray-500">{item.provider}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>

        {/* Fetched data */}
        <h3 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-blue-400">
          <StatusDot color="bg-blue-400" />
          Automated Fetchers (Static Snapshots)
        </h3>
        <ul className="mt-3 space-y-3">
          {DATA_SOURCES.fetched.map((item) => (
            <li key={item.label} className="rounded-lg border border-surface-600 px-4 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-gray-200">{item.label}</span>
                <span className="shrink-0 text-xs text-gray-500">{item.provider}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>

        {/* Mocked / manual data */}
        <h3 className="mt-8 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-amber-400">
          <StatusDot color="bg-amber-400" />
          Manually Collected (No Automated Fetcher)
        </h3>
        <ul className="mt-3 space-y-3">
          {DATA_SOURCES.mocked.map((item) => (
            <li key={item.label} className="rounded-lg border border-surface-600 px-4 py-3">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-sm font-medium text-gray-200">{item.label}</span>
                <span className="shrink-0 text-xs text-gray-500">{item.provider}</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{item.description}</p>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-center text-xs text-gray-600">
        We are actively building automated fetchers for all providers. Want to
        help?{" "}
        <Link
          href="https://github.com/bleu/open-risk"
          className="text-blue-400 hover:underline"
          target="_blank"
        >
          Contribute on GitHub
        </Link>
        .
      </p>
    </main>
  );
}

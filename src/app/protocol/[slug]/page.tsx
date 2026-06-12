import { notFound } from "next/navigation";
import Link from "next/link";
import { PROTOCOLS } from "@/content/protocols";
import { PROVIDERS } from "@/content/providers";
import { evaluations } from "@/content/evaluations";
import { PROTOCOL_EMBEDS } from "@/content/protocol-embeds";
import { RatingCell } from "@/ui/rating-cell";
import { formatTvl, formatProtocolType } from "@/utils/format";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProtocolProfile({ params }: Props) {
  const { slug } = await params;
  const protocol = PROTOCOLS.find((p) => p.id === slug);
  if (!protocol) notFound();

  const embeds = PROTOCOL_EMBEDS[protocol.id] ?? [];

  // Collect providers that have at least one non-null evaluation for this protocol
  const activeProviders = PROVIDERS.filter((provider) => {
    const providerEvals = evaluations[provider.id]?.[protocol.id];
    if (!providerEvals) return false;
    return provider.metrics.some((m) => providerEvals[m.id] != null);
  });

  return (
    <main className="mx-auto max-w-[1600px] px-6 py-6">
      {/* Back link */}
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-400 transition-colors hover:text-gray-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
            clipRule="evenodd"
          />
        </svg>
        Back to Matrix
      </Link>

      {/* Protocol header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-100">{protocol.name}</h1>
        <div className="mt-2 flex items-center gap-4 text-sm text-gray-400">
          <span>{formatProtocolType(protocol.type)}</span>
          <span className="text-surface-500">|</span>
          <span className="font-mono">{formatTvl(protocol.tvl)} TVL</span>
          <span className="text-surface-500">|</span>
          <span>
            {activeProviders.length}{" "}
            {activeProviders.length === 1 ? "feed" : "feeds"}
          </span>
        </div>
      </div>

      {/* Provider cards */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Provider Evaluations
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeProviders.map((provider) => {
            const providerEvals =
              evaluations[provider.id]?.[protocol.id] ?? {};
            return (
              <div
                key={provider.id}
                className="rounded-lg border border-surface-600 bg-surface-800 p-4"
              >
                <h3 className="mb-3 text-sm font-semibold text-gray-300">
                  {provider.name}
                </h3>
                <div className="space-y-2">
                  {provider.metrics.map((metric) => {
                    const value = providerEvals[metric.id] ?? null;
                    if (metric.ratingType === "live-tvl") {
                      return (
                        <div key={metric.id}>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {metric.label}
                            </span>
                            <span className="font-mono text-sm text-gray-300">
                              {formatTvl(protocol.tvl)}
                            </span>
                          </div>
                          {metric.description && (
                            <p className="mt-0.5 text-[11px] leading-tight text-gray-500">
                              {metric.description}
                            </p>
                          )}
                        </div>
                      );
                    }
                    return (
                      <div key={metric.id}>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {metric.label}
                          </span>
                          <RatingCell
                            value={value}
                            ratingType={metric.ratingType}
                          />
                        </div>
                        {metric.description && (
                          <p className="mt-0.5 text-[11px] leading-tight text-gray-500">
                            {metric.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* External links */}
      {embeds.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
            External Views
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {embeds.map((embed) => (
              <a
                key={embed.url}
                href={embed.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-surface-600 bg-surface-800 px-4 py-3 transition-colors hover:border-surface-500 hover:bg-surface-700"
              >
                <span className="text-sm text-gray-300">{embed.label}</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 shrink-0 text-gray-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.25 5.5a.75.75 0 0 0-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 0 0 .75-.75v-4a.75.75 0 0 1 1.5 0v4A2.25 2.25 0 0 1 12.75 17h-8.5A2.25 2.25 0 0 1 2 14.75v-8.5A2.25 2.25 0 0 1 4.25 4h5a.75.75 0 0 1 0 1.5h-5Zm7.97-2.03a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M18 3.75a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 1 0-1.5h5.5A2.25 2.25 0 0 1 19.5 3.75v5.5a.75.75 0 0 1-1.5 0v-5.5Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

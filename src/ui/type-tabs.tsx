import type { ProtocolType } from "@/types";

type FilterType = ProtocolType | "all";

const TABS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "lending", label: "Lending" },
  { value: "dex-amm", label: "DEX / AMM" },
  { value: "swap-aggregator", label: "Swap Aggregator" },
  { value: "yield-vault", label: "Yield / Vault" },
  { value: "liquid-staking", label: "Liquid Staking" },
];

interface TypeTabsProps {
  selected: FilterType;
  onChange: (value: FilterType) => void;
}

export function TypeTabs({ selected, onChange }: TypeTabsProps) {
  return (
    <div className="flex gap-1">
      {TABS.map((tab) => {
        const active = selected === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              active
                ? "bg-surface-600 text-white"
                : "text-gray-400 hover:bg-surface-700 hover:text-gray-200"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

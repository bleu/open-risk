import type { TokenType } from "@/types";

type FilterType = TokenType | "all";

const TABS: { value: FilterType; label: string }[] = [
  { value: "all", label: "All" },
  { value: "stablecoin", label: "Stablecoin" },
  { value: "defi", label: "DeFi" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "exchange", label: "Exchange" },
  { value: "rwa", label: "RWA" },
  { value: "meme", label: "Meme" },
];

interface TokenTypeTabsProps {
  selected: FilterType;
  onChange: (value: FilterType) => void;
}

export function TokenTypeTabs({ selected, onChange }: TokenTypeTabsProps) {
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

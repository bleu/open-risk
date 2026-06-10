export type EntityType = "protocols" | "tokens" | "oracles";

const TABS: { value: EntityType; label: string }[] = [
  { value: "protocols", label: "Protocols" },
  { value: "tokens", label: "Tokens" },
  { value: "oracles", label: "Oracles" },
];

interface EntityTabsProps {
  selected: EntityType;
  onChange: (value: EntityType) => void;
}

export function EntityTabs({ selected, onChange }: EntityTabsProps) {
  return (
    <div className="flex gap-1 border-b border-surface-600 bg-surface-900 px-6 py-2">
      {TABS.map((tab) => {
        const active = selected === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={`rounded-md px-4 py-1.5 text-sm font-semibold transition-colors ${
              active
                ? "bg-surface-600 text-white"
                : "text-gray-500 hover:bg-surface-700 hover:text-gray-300"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

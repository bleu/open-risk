interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        placeholder="Search protocols..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-64 rounded-md border border-surface-500 bg-surface-800 py-2 pl-10 pr-3 text-sm text-gray-200 placeholder-gray-500 outline-none transition-colors focus:border-gray-400"
      />
    </div>
  );
}

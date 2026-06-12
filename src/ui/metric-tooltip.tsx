interface MetricTooltipProps {
  description: string;
}

export function MetricTooltip({ description }: MetricTooltipProps) {
  return (
    <span className="group/tip relative inline-flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        className="h-3.5 w-3.5 shrink-0 text-gray-500 transition-colors group-hover/tip:text-gray-400"
      >
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 .75.75 0 0 1 1.06 1.06ZM10 8.75a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0v-4.5a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-1.5 w-max max-w-[240px] -translate-x-1/2 rounded-md border border-surface-500 bg-surface-700 px-2.5 py-1.5 text-xs font-normal text-gray-300 opacity-0 shadow-lg transition-opacity group-hover/tip:opacity-100">
        {description}
      </span>
    </span>
  );
}

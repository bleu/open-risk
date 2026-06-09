interface GradeBadgeProps {
  value: string;
}

const GRADE_STYLES: Record<string, string> = {
  green: "bg-grade-green/15 text-grade-green border-grade-green/30",
  orange: "bg-grade-orange/15 text-grade-orange border-grade-orange/30",
  red: "bg-grade-red/15 text-grade-red border-grade-red/30",
};

const GRADE_LABELS: Record<string, string> = {
  green: "Green",
  orange: "Orange",
  red: "Red",
};

export function GradeBadge({ value }: GradeBadgeProps) {
  const colorClass = GRADE_STYLES[value] ?? "bg-gray-500/15 text-gray-400 border-gray-500/30";
  const label = GRADE_LABELS[value] ?? value;

  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-xs font-medium ${colorClass}`}
    >
      {label}
    </span>
  );
}

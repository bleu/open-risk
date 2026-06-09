interface StageBadgeProps {
  value: string;
}

export function StageBadge({ value }: StageBadgeProps) {
  let colorClass: string;

  if (value === "Stage 2") {
    colorClass = "bg-stage-2/15 text-stage-2 border-stage-2/30";
  } else if (value === "Stage 1") {
    colorClass = "bg-stage-1/15 text-stage-1 border-stage-1/30";
  } else if (value === "Stage 0") {
    colorClass = "bg-stage-0/15 text-stage-0 border-stage-0/30";
  } else {
    colorClass = "bg-stage-other/15 text-stage-other border-stage-other/30";
  }

  return (
    <span
      className={`inline-block rounded border px-2 py-0.5 font-mono text-xs font-medium ${colorClass}`}
    >
      {value}
    </span>
  );
}

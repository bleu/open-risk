import type { EvaluationValue, RatingType } from "@/types";
import { StageBadge } from "./stage-badge";
import { GradeBadge } from "./grade-badge";

interface RatingCellProps {
  value: EvaluationValue;
  ratingType: RatingType;
}

export function RatingCell({ value, ratingType }: RatingCellProps) {
  if (value == null) {
    return <span className="text-gray-600">&mdash;</span>;
  }

  switch (ratingType) {
    case "stage":
      return <StageBadge value={String(value)} />;
    case "grade":
      return <GradeBadge value={String(value)} />;
    case "numeric":
      return (
        <span className="font-mono text-sm text-gray-200">
          {value}
          <span className="text-gray-500">/10</span>
        </span>
      );
    case "letter":
      return (
        <span className="font-mono text-sm font-medium text-gray-200">
          {value}
        </span>
      );
    case "dns-score": {
      const n = Number(value);
      const color =
        n >= 80 ? "text-green-400" : n >= 50 ? "text-yellow-400" : "text-red-400";
      return (
        <span className={`font-mono text-sm ${color}`}>
          {value}
          <span className="text-gray-500">/100</span>
        </span>
      );
    }
    case "risk-level": {
      const riskColors: Record<string, string> = {
        Low: "text-green-400",
        Medium: "text-yellow-400",
        High: "text-red-400",
      };
      return (
        <span
          className={`text-sm font-medium ${riskColors[String(value)] ?? "text-gray-400"}`}
        >
          {value}
        </span>
      );
    }
    default:
      return <span className="text-sm text-gray-400">{String(value)}</span>;
  }
}

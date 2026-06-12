import type { EvaluationValue, RatingType } from "@/types";
import { StageBadge } from "./stage-badge";
import { GradeBadge } from "./grade-badge";
import { formatTvl } from "@/utils/format";

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
    case "warning-score": {
      const n = Number(value);
      const color =
        n <= 15 ? "text-green-400" : n <= 25 ? "text-yellow-400" : "text-red-400";
      return (
        <span className={`font-mono text-sm ${color}`}>
          {value}
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
    case "percentage": {
      const n = Number(value);
      const sign = n > 0 ? "+" : "";
      const color =
        n > 0 ? "text-green-400" : n < 0 ? "text-red-400" : "text-gray-400";
      return (
        <span className={`font-mono text-sm ${color}`}>
          {sign}{n.toFixed(1)}%
        </span>
      );
    }
    case "boolean": {
      const isTrue =
        value === 1 || value === "1" || value === "true";
      return (
        <span
          className={`text-sm font-medium ${isTrue ? "text-green-400" : "text-red-400"}`}
        >
          {isTrue ? "Yes" : "No"}
        </span>
      );
    }
    case "currency": {
      const n = Number(value);
      const color = n === 0 ? "text-green-400" : "text-gray-200";
      return (
        <span className={`font-mono text-sm ${color}`}>
          {formatTvl(n)}
        </span>
      );
    }
    case "count": {
      const n = Number(value);
      const color =
        n === 0
          ? "text-green-400"
          : n <= 2
            ? "text-yellow-400"
            : "text-red-400";
      return <span className={`font-mono text-sm ${color}`}>{n}</span>;
    }
    case "multisig": {
      const str = String(value);
      const parts = str.split("/").map(Number);
      let color = "text-gray-200";
      if (parts.length === 2 && parts[1] > 0) {
        color = parts[0] / parts[1] >= 0.5 ? "text-green-400" : "text-yellow-400";
      }
      return <span className={`font-mono text-sm ${color}`}>{str}</span>;
    }
    case "live-tvl":
    case "live-mcap":
      // Rendered inline in page.tsx with live entity data; fallback here.
      return <span className="font-mono text-sm text-gray-400">{String(value)}</span>;
    default:
      return <span className="text-sm text-gray-400">{String(value)}</span>;
  }
}

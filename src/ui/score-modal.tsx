"use client";

import { useEffect, useRef } from "react";
import type { Protocol, EvaluationMap } from "@/types";

interface ScoreModalProps {
  title: string;
  providerId: string;
  metricId: string;
  protocols: Protocol[];
  evaluations: EvaluationMap;
  onClose: () => void;
}

function scoreColor(n: number): string {
  if (n >= 80) return "bg-green-500/30 border-green-500/50";
  if (n >= 50) return "bg-yellow-500/30 border-yellow-500/50";
  return "bg-red-500/30 border-red-500/50";
}

function scoreTextColor(n: number): string {
  if (n >= 80) return "text-green-400";
  if (n >= 50) return "text-yellow-400";
  return "text-red-400";
}

export function ScoreModal({
  title,
  providerId,
  metricId,
  protocols,
  evaluations,
  onClose,
}: ScoreModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const withScores = protocols
    .map((p) => ({
      protocol: p,
      score: evaluations[providerId]?.[p.id]?.[metricId] ?? null,
    }))
    .filter((x) => x.score != null)
    .sort((a, b) => Number(b.score) - Number(a.score));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-surface-600 bg-surface-800 shadow-2xl">
        <div className="flex items-center justify-between border-b border-surface-600 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-100">{title}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-surface-600 hover:text-gray-200"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4">
          {withScores.length === 0 ? (
            <p className="text-center text-sm text-gray-500">No data available</p>
          ) : (
            <div className="space-y-2">
              {withScores.map(({ protocol, score }) => {
                const n = Number(score);
                const pct = n; // score is 0-100, maps directly to %
                return (
                  <div key={protocol.id} className="flex items-center gap-3">
                    <span className="w-28 shrink-0 truncate text-sm text-gray-300">
                      {protocol.name}
                    </span>
                    <div className="relative h-6 flex-1 rounded bg-surface-900">
                      <div
                        className={`absolute inset-y-0 left-0 rounded border ${scoreColor(n)}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span
                      className={`w-16 shrink-0 text-right font-mono text-sm ${scoreTextColor(n)}`}
                    >
                      {n}/100
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

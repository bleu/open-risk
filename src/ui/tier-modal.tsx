"use client";

import { useEffect, useRef } from "react";
import type { Protocol, EvaluationMap } from "@/types";

interface TierColumn {
  label: string;
  /** Values that map to this tier */
  match: (value: string | number | null | undefined) => boolean;
  headerClass: string;
  dotClass: string;
}

interface TierModalProps {
  title: string;
  providerId: string;
  metricId: string;
  protocols: Protocol[];
  evaluations: EvaluationMap;
  tiers: TierColumn[];
  onClose: () => void;
}

const STAGE_TIERS: TierColumn[] = [
  {
    label: "Stage 2",
    match: (v) => v === "Stage 2",
    headerClass: "text-stage-2 border-stage-2/30",
    dotClass: "bg-stage-2",
  },
  {
    label: "Stage 1",
    match: (v) => v === "Stage 1",
    headerClass: "text-stage-1 border-stage-1/30",
    dotClass: "bg-stage-1",
  },
  {
    label: "Stage 0",
    match: (v) => v === "Stage 0",
    headerClass: "text-stage-0 border-stage-0/30",
    dotClass: "bg-stage-0",
  },
];

const GRADE_TIERS: TierColumn[] = [
  {
    label: "Green",
    match: (v) => v === "green",
    headerClass: "text-grade-green border-grade-green/30",
    dotClass: "bg-grade-green",
  },
  {
    label: "Orange",
    match: (v) => v === "orange",
    headerClass: "text-grade-orange border-grade-orange/30",
    dotClass: "bg-grade-orange",
  },
  {
    label: "Red",
    match: (v) => v === "red",
    headerClass: "text-grade-red border-grade-red/30",
    dotClass: "bg-grade-red",
  },
];

export function getTiersForRatingType(ratingType: string): TierColumn[] {
  if (ratingType === "stage") return STAGE_TIERS;
  if (ratingType === "grade") return GRADE_TIERS;
  return [];
}

export function TierModal({
  title,
  providerId,
  metricId,
  protocols,
  evaluations,
  tiers,
  onClose,
}: TierModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const grouped = tiers.map((tier) => ({
    tier,
    protocols: protocols.filter((p) => {
      const value = evaluations[providerId]?.[p.id]?.[metricId] ?? null;
      return tier.match(value);
    }),
  }));

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-surface-600 bg-surface-800 shadow-2xl">
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

        <div className="grid grid-cols-3 gap-px bg-surface-600 p-px">
          {grouped.map(({ tier, protocols: tierProtocols }) => (
            <div key={tier.label} className="bg-surface-800 p-4">
              <div
                className={`mb-3 border-b pb-2 text-center text-sm font-semibold ${tier.headerClass}`}
              >
                {tier.label}
                <span className="ml-1.5 text-xs font-normal text-gray-500">
                  ({tierProtocols.length})
                </span>
              </div>
              {tierProtocols.length === 0 ? (
                <p className="text-center text-xs text-gray-600">None</p>
              ) : (
                <ul className="space-y-1.5">
                  {tierProtocols.map((p) => (
                    <li
                      key={p.id}
                      className="flex items-center gap-2 text-sm text-gray-300"
                    >
                      <span
                        className={`h-2 w-2 shrink-0 rounded-full ${tier.dotClass}`}
                      />
                      {p.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

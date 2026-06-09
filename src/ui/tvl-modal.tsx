"use client";

import { useEffect, useRef } from "react";
import type { Protocol } from "@/types";
import { formatTvl } from "@/utils/format";

interface TvlModalProps {
  protocols: Protocol[];
  onClose: () => void;
}

export function TvlModal({ protocols, onClose }: TvlModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const sorted = [...protocols].sort((a, b) => b.tvl - a.tvl);
  const maxTvl = sorted[0]?.tvl ?? 1;

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
          <h2 className="text-lg font-semibold text-gray-100">
            TVL by Protocol
          </h2>
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
          <div className="space-y-2">
            {sorted.map((protocol) => {
              const pct = (protocol.tvl / maxTvl) * 100;
              return (
                <div key={protocol.id} className="flex items-center gap-3">
                  <span className="w-28 shrink-0 truncate text-sm text-gray-300">
                    {protocol.name}
                  </span>
                  <div className="relative h-6 flex-1 rounded bg-surface-900">
                    <div
                      className="absolute inset-y-0 left-0 rounded bg-blue-500/30 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded border border-blue-500/50 bg-blue-500/20"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-20 shrink-0 text-right font-mono text-sm text-gray-400">
                    {formatTvl(protocol.tvl)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

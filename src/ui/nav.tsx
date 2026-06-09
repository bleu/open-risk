"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Matrix" },
  { href: "/methodology", label: "Methodology" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-surface-600 bg-surface-800">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center gap-8 px-6">
        <Link href="/" className="font-mono text-lg font-bold tracking-tight">
          Open Risk
        </Link>

        <div className="flex gap-1">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-surface-600 text-white"
                    : "text-gray-400 hover:bg-surface-700 hover:text-gray-200"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

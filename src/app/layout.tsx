import type { Metadata } from "next";
import { Nav } from "@/ui/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Open Risk",
  description:
    "Neutral DeFi risk intelligence aggregator — what every major risk feed says about a protocol, side-by-side.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        {children}
      </body>
    </html>
  );
}

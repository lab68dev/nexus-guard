import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusGuard — AI Governance Platform",
  description:
    "Multi-tenant AI Governance & API Proxying. Monitor, control, and enforce safety policies on every LLM call.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-ng-white text-ng-black font-archivo antialiased">
        {children}
      </body>
    </html>
  );
}

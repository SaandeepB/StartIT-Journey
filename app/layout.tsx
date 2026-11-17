import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "The Systems Connector",
    template: "%s · The Systems Connector",
  },
  description:
    "An 18-month rotational journey across business, marketing, analytics, and technology.",
  // Unlisted: never indexed, never cached by search engines.
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    nosnippet: true,
    noimageindex: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  referrer: "strict-origin-when-cross-origin",
  icons: { icon: "/icon.svg" },
  openGraph: { title: "The Systems Connector", type: "website" },
};

export const viewport: Viewport = {
  themeColor: "#070b14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}

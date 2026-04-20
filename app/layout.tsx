import type { Metadata } from "next";

import { SiteChrome } from "@/components/SiteChrome";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "mimicorp.systems",
    template: "%s | mimicorp.systems"
  },
  description:
    "Mimicorp builds operational systems across land, business, media, and research."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

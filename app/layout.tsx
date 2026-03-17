import type { Metadata } from "next";
import { EB_Garamond, Inter, Inter_Tight } from "next/font/google";

import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-primary"
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-secondary"
});

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-accent"
});

export const metadata: Metadata = {
  title: "mimicorp.systems",
  description: "A continuous node composition for Mimicorp Systems."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interTight.variable} ${inter.variable} ${garamond.variable} bg-background text-text antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

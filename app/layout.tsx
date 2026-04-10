import Image from "next/image";
import type { Metadata } from "next";
import { EB_Garamond, Inter, Inter_Tight } from "next/font/google";

import fruitfulBrainLogo from "@/assets/fruitfulbrain.png";
import mLogo from "@/assets/logo_wb.png";

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
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">{children}</div>
          <footer className="relative z-10 border-t border-white/10 bg-black/20 px-6 py-6 backdrop-blur-sm">
            <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-center gap-4 text-center">
              <div className="flex flex-wrap items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/58">
                <a href="/#more" className="transition-colors hover:text-white">
                  More
                </a>
                <a href="/second-cutting" className="transition-colors hover:text-white">
                  Second Cutting
                </a>
                <a
                  href="https://instagram.com/cajunleprochaun"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram
                </a>
                <a
                  href="/research/staging-the-state.html"
                  className="transition-colors hover:text-white"
                >
                  Prospectus
                </a>
              </div>
              <div className="flex items-center justify-center gap-5">
                <Image
                  src={mLogo}
                  alt="Mimicorp M logo"
                  className="h-8 w-auto object-contain opacity-85"
                  priority
                />
                <Image
                  src={fruitfulBrainLogo}
                  alt="Fruitful Brain logo"
                  className="h-10 w-auto object-contain opacity-85"
                />
              </div>
              <p className="font-body text-[11px] uppercase tracking-[0.28em] text-white/60">
                Copyright 2026 Mimicorp Systems
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

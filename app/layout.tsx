import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "mimicorp labs",
  description: "Mimicorp labs public site.",
  icons: {
    icon: "/assets/images/mimicorp_logo.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

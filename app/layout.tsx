import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mimicorp Books",
  description: "Emotionally intelligent interactive webbooks from Mimicorp.",
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

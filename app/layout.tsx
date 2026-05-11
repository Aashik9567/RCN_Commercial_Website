import type { Metadata } from "next";
import {
  DM_Sans,
  DM_Mono,
  Noto_Sans_Devanagari,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { business } from "@/data/business";

const monoFont = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const headingSerif = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

const nepaliFont = Noto_Sans_Devanagari({
  variable: "--font-nepali",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: business.company.name,
    template: `%s | ${business.company.name}`,
  },
  description:
    "Raghunathpur Cable Network (RCN) is a Nepal-based fiber internet and cable TV provider established in 2010, serving Sabaila-12, Raghunathpur and 25+ surrounding areas.",
  keywords: [
    "fiber internet",
    "cable network",
    "Nepal ISP",
    "Raghunathpur",
    "Sabaila",
    "broadband",
  ],
  metadataBase: new URL("https://raghunathpurcable.com.np"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${headingSerif.variable} ${bodyFont.variable} ${monoFont.variable} ${nepaliFont.variable} antialiased`}
    >
      <body suppressHydrationWarning className="min-h-dvh">
        <div className="rcn-bg" aria-hidden="true" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
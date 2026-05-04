import type { Metadata } from "next";
import {
  DM_Sans,
  Noto_Sans_Devanagari,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";
import Providers from "./providers";

import { business } from "@/data/business";

const headingFont = Plus_Jakarta_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const nepaliFont = Noto_Sans_Devanagari({
  variable: "--font-nepali",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: business.company.name,
  description:
    "Raghunathpur Cable Network (RCN) is a Nepal-based fiber internet and cable TV provider established in 2010, serving Sabaila-12, Raghunathpur and 25+ surrounding areas.",
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
      data-scroll-behavior="smooth"
      className={`${headingFont.variable} ${bodyFont.variable} ${nepaliFont.variable} antialiased`}>
      <body suppressHydrationWarning className="min-h-dvh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

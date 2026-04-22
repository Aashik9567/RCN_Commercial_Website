import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raghunathpur Cable Network",
  description:
    "Raghunathpur Cable Network delivers high-speed fiber internet with transparent plans, quick installation, and 24/7 support.",
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
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}>
      <body
        suppressHydrationWarning
        className="min-h-dvh font-sans text-gray-100">
        <AntdRegistry>
          <Providers>
            <div className="relative z-10">{children}</div>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}

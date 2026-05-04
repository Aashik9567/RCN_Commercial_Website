"use client";

import * as React from "react";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}

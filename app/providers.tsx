"use client";

import * as React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

function AntdThemeBridge({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();
  const isDark =
    resolvedTheme === "dark" ||
    (resolvedTheme == null &&
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"));

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
      }}>
      {children}
    </ConfigProvider>
  );
}

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <AntdThemeBridge>{children}</AntdThemeBridge>
    </ThemeProvider>
  );
}

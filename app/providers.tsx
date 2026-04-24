"use client";

import * as React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";
import { useTheme } from "next-themes";

import { ThemeProvider } from "@/components/theme/ThemeProvider";

function AntdThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { resolvedTheme } = useTheme();
  const algorithm =
    resolvedTheme === "light"
      ? antdTheme.defaultAlgorithm
      : antdTheme.darkAlgorithm;

  return (
    <ConfigProvider
      theme={{
        algorithm,
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
      <AntdThemeProvider>{children}</AntdThemeProvider>
    </ThemeProvider>
  );
}

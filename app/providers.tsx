"use client";

import * as React from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConfigProvider
      theme={{
        algorithm: antdTheme.darkAlgorithm,
      }}>
      {children}
    </ConfigProvider>
  );
}

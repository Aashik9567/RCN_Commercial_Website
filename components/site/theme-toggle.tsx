"use client";

import * as React from "react";
import { Dropdown } from "antd";
import type { MenuProps } from "antd";
import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

type ThemeMode = "light" | "dark" | "system";

function ThemeIcon({ mode }: { mode: ThemeMode }) {
  if (mode === "light") return <Sun className="h-4 w-4" />;
  if (mode === "dark") return <Moon className="h-4 w-4" />;
  return <Laptop className="h-4 w-4" />;
}

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const currentMode: ThemeMode =
    mounted && (theme === "light" || theme === "dark" || theme === "system")
      ? theme
      : "system";

  const items: MenuProps["items"] = [
    {
      key: "light",
      label: (
        <span className="inline-flex items-center gap-2">
          <Sun className="h-4 w-4" /> Light
        </span>
      ),
    },
    {
      key: "dark",
      label: (
        <span className="inline-flex items-center gap-2">
          <Moon className="h-4 w-4" /> Dark
        </span>
      ),
    },
    {
      key: "system",
      label: (
        <span className="inline-flex items-center gap-2">
          <Laptop className="h-4 w-4" /> System
        </span>
      ),
    },
  ];

  return (
    <Dropdown
      trigger={["click"]}
      placement="bottomRight"
      menu={{
        items,
        selectable: true,
        selectedKeys: [currentMode],
        onClick: ({ key }) => setTheme(key as ThemeMode),
      }}>
      <button
        type="button"
        aria-label="Toggle theme"
        className={[
          "inline-flex h-9 w-9 items-center justify-center rounded-xl border",
          "border-gray-200/70 bg-white/60 text-gray-700 backdrop-blur-xl",
          "transition-colors hover:bg-white/80",
          "dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:bg-white/10",
          className,
        ]
          .filter(Boolean)
          .join(" ")}>
        <ThemeIcon mode={currentMode} />
      </button>
    </Dropdown>
  );
}

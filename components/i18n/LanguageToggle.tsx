"use client";

import * as React from "react";

import { useLanguage } from "@/components/i18n/LanguageProvider";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--surface))] p-1 shadow-sm">
      <LangButton active={lang === "en"} onClick={() => setLang("en")}>
        EN
      </LangButton>
      <LangButton active={lang === "np"} onClick={() => setLang("np")}>
        NP
      </LangButton>
    </div>
  );
}

function LangButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "h-9 rounded-lg px-3 text-xs font-semibold transition " +
        (active
          ? "bg-[rgb(var(--primary))] text-white"
          : "text-[rgb(var(--text-muted))] hover:text-[rgb(var(--text))]")
      }>
      {children}
    </button>
  );
}

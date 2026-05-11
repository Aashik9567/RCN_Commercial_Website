"use client";

import * as React from "react";

import type { RcnLang } from "@/data/business";

const STORAGE_KEY = "rcn-lang";

type LanguageContextValue = {
  lang: RcnLang;
  setLang: (lang: RcnLang) => void;
  toggleLang: () => void;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function detectBrowserDefault(): RcnLang {
  if (typeof navigator === "undefined") return "en";
  const lang = navigator.language?.toLowerCase() ?? "";
  const langs = (navigator.languages ?? []).map((l) => l.toLowerCase());
  const isNepali =
    lang.startsWith("ne") || langs.some((l) => l.startsWith("ne"));
  return isNepali ? "np" : "en";
}

function normalizeStored(value: string | null): RcnLang | null {
  if (!value) return null;
  if (value === "en" || value === "np") return value;
  return null;
}

export function LanguageProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [lang, setLang] = React.useState<RcnLang>("en");

  React.useEffect(() => {
    const stored = normalizeStored(localStorage.getItem(STORAGE_KEY));
    const next = stored ?? detectBrowserDefault();
    setLang(next);
  }, []);

  React.useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore write errors (e.g., privacy mode)
    }

    const html = document.documentElement;
    html.dataset.lang = lang;
    html.lang = lang === "np" ? "ne" : "en";
  }, [lang]);

  const value = React.useMemo<LanguageContextValue>(() => {
    return {
      lang,
      setLang,
      toggleLang: () => setLang((l) => (l === "en" ? "np" : "en")),
    };
  }, [lang]);

  return <LanguageContext value={value}>{children}</LanguageContext>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

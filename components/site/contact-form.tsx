"use client";

import * as React from "react";

const PLAN_OPTIONS = [
  { label: "Basic (50 Mbps)", value: "basic" },
  { label: "Standard (100 Mbps)", value: "standard" },
  { label: "Premium (200 Mbps)", value: "premium" },
] as const;

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {children}
    </div>
  );
}

const inputClassName =
  "mt-2 h-12 w-full rounded-2xl border border-gray-200/70 bg-white/80 px-4 " +
  "text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm backdrop-blur-xl " +
  "outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/8 dark:bg-white/6 dark:focus:border-indigo-600";

const textareaClassName =
  "mt-2 w-full rounded-2xl border border-gray-200/70 bg-white/80 px-4 py-3 " +
  "text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 shadow-sm backdrop-blur-xl " +
  "outline-none transition-colors focus:border-indigo-300 focus:ring-2 focus:ring-indigo-500/20 dark:border-white/8 dark:bg-white/6 dark:focus:border-indigo-600";

export function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "success">("idle");
  const resetTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setStatus("success");
    event.currentTarget.reset();

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 5000);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {status === "success" && (
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-300">
          Thanks — we’ll contact you shortly.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>Full name</FieldLabel>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Your name"
            className={inputClassName}
          />
        </label>

        <label className="block">
          <FieldLabel>Phone</FieldLabel>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+977 …"
            className={inputClassName}
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>Email</FieldLabel>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClassName}
          />
        </label>

        <label className="block">
          <FieldLabel>Area / Landmark</FieldLabel>
          <input
            name="area"
            autoComplete="street-address"
            placeholder="Ward, tole, landmark…"
            className={inputClassName}
          />
        </label>
      </div>

      <label className="block">
        <FieldLabel>Interested plan</FieldLabel>
        <select name="interest" defaultValue="" className={inputClassName}>
          <option value="" disabled>
            Select a plan
          </option>
          {PLAN_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>Message</FieldLabel>
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us your address details and preferred installation time…"
          className={textareaClassName}
        />
      </label>

      <button
        type="submit"
        className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-gray-900 px-6 text-sm font-semibold text-white transition-colors hover:bg-gray-800 active:scale-[0.98] dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
        Request a Callback
      </button>
    </form>
  );
}

"use client";

import * as React from "react";

import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-sm font-medium text-[rgb(var(--text))]">
      {children}
    </div>
  );
}

const inputClassName =
  "mt-2 h-12 w-full rounded-2xl border px-4 shadow-sm outline-none transition " +
  "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-soft))] " +
  "focus:border-[rgb(var(--green-300))] focus:ring-2 focus:ring-[rgb(var(--primary))]/20";

const textareaClassName =
  "mt-2 w-full rounded-2xl border px-4 py-3 shadow-sm outline-none transition " +
  "border-[rgb(var(--border))] bg-[rgb(var(--surface))] text-[rgb(var(--text))] placeholder:text-[rgb(var(--text-soft))] " +
  "focus:border-[rgb(var(--green-300))] focus:ring-2 focus:ring-[rgb(var(--primary))]/20";

export function ContactForm() {
  const { lang } = useLanguage();
  const [status, setStatus] = React.useState<"idle" | "draft-opened">("idle");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);

    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const area = String(fd.get("area") ?? "").trim();
    const interest = String(fd.get("interest") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();

    const planLabel = business.plans.find((p) => p.id === interest)?.name[lang];

    const subject = `${business.company.shortName} inquiry`;
    const body = [
      `Name: ${name}`,
      phone ? `Phone: ${phone}` : null,
      email ? `Email: ${email}` : null,
      area ? `Area/Landmark: ${area}` : null,
      planLabel ? `Interested plan: ${planLabel}` : null,
      "",
      message ? `Message:\n${message}` : "Message:",
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${encodeURIComponent(business.contact.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setStatus("draft-opened");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {status === "draft-opened" ? (
        <div className="rounded-2xl border border-[rgb(var(--green-200))] bg-[rgb(var(--green-50))] p-3 text-sm text-[rgb(var(--green-900))]">
          Email draft opened. If it didn’t open, email us at{" "}
          {business.contact.email}.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <FieldLabel>Full name</FieldLabel>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder=""
            className={inputClassName}
          />
        </label>

        <label className="block">
          <FieldLabel>Phone</FieldLabel>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder=""
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
            placeholder=""
            className={inputClassName}
          />
        </label>

        <label className="block">
          <FieldLabel>Area / Landmark</FieldLabel>
          <input
            name="area"
            autoComplete="street-address"
            placeholder=""
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
          {business.plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name[lang]} ({p.speedMbps} Mbps)
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <FieldLabel>Message</FieldLabel>
        <textarea
          name="message"
          rows={4}
          placeholder=""
          className={textareaClassName}
        />
      </label>

      <button
        type="submit"
        className="rcn-btn-primary h-12 w-full rounded-2xl active:scale-[0.98]">
        Email us
      </button>
    </form>
  );
}

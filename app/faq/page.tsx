"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteShell } from "@/components/site/site-shell";
import {
  ChevronDown,
  Wifi,
  CreditCard,
  Wrench,
  HeadphonesIcon,
  Zap,
  Shield,
  Clock,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import type { Metadata } from "next";

const FAQ_CATEGORIES = [
  {
    id: "getting-started",
    label: "Getting Started",
    icon: Zap,
    color: "rgb(var(--primary))",
    questions: [
      {
        q: "How do I get connected to RCN fiber internet?",
        a: "Getting connected is simple. Contact us via phone (+977 9801663644), WhatsApp, or visit our office in Sabaila-12. Share your ward/tole/landmark and we'll confirm availability, schedule a site visit, and complete installation — typically within 1–3 business days.",
      },
      {
        q: "What areas does RCN currently serve?",
        a: "RCN provides fiber internet and cable TV to Sabaila-12, Raghunathpur and 25+ surrounding wards and villages. Coverage is expanding regularly. Contact us to confirm service availability at your specific location.",
      },
      {
        q: "Is there a contract or lock-in period?",
        a: "No long-term contracts. All our plans are on a monthly subscription basis. You can upgrade, downgrade, or cancel anytime without penalties.",
      },
      {
        q: "What documents are required for new connection?",
        a: "You need a valid citizenship ID (Nagarikta) or any government-issued photo ID. For business connections, company registration documents are also required.",
      },
    ],
  },
  {
    id: "plans-billing",
    label: "Plans & Billing",
    icon: CreditCard,
    color: "#d4a853",
    questions: [
      {
        q: "What internet plans are available?",
        a: "We offer three main plans: Basic (50 Mbps at NPR 499/mo), Standard (100 Mbps at NPR 699/mo — most popular), and Premium (200 Mbps at NPR 999/mo). All plans include unlimited data, free installation, and 24/7 support. Annual plans save you 15%.",
      },
      {
        q: "When is the monthly bill due and how can I pay?",
        a: "Bills are generated on your connection anniversary date each month. You can pay via eSewa, Khalti, bank transfer, or cash at our Sabaila-12 office. We'll send you a reminder 5 days before the due date.",
      },
      {
        q: "Can I upgrade or downgrade my plan?",
        a: "Yes, anytime. Upgrades take effect immediately; downgrades apply from your next billing cycle. Call or WhatsApp us at +977 9801663644 to make the change.",
      },
      {
        q: "Is there a setup or installation fee?",
        a: "Installation is completely free for all residential plans. For complex commercial setups requiring extended cabling, a nominal fee may apply — we'll inform you upfront before any work begins.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    icon: Wrench,
    color: "#06b6d4",
    questions: [
      {
        q: "What speeds can I realistically expect?",
        a: "Our fiber network delivers consistent speeds very close to your subscribed plan. Basic (50 Mbps) is ideal for HD streaming and browsing for 3–5 devices. Standard (100 Mbps) handles 4K streaming and work-from-home for 6–10 devices. Premium (200 Mbps) is perfect for power users, gamers, and home offices.",
      },
      {
        q: "Do you provide a router? Can I use my own?",
        a: "We provide a compatible router as part of the standard installation. You're welcome to use your own router — our technician will configure it for our network at no extra charge.",
      },
      {
        q: "What should I do if my internet is slow or down?",
        a: "First, restart your router (unplug for 30 seconds, plug back in). If the issue persists, call our 24/7 support line at +977 9801663644. We aim to resolve connectivity issues within 4 hours for urgent cases and 24 hours for general issues.",
      },
      {
        q: "Is there a data cap or fair usage policy?",
        a: "No data caps. All RCN plans come with truly unlimited data. We do not throttle speeds or impose FUP limits regardless of your usage.",
      },
    ],
  },
  {
    id: "support",
    label: "Support",
    icon: HeadphonesIcon,
    color: "#86efac",
    questions: [
      {
        q: "What are your customer support hours?",
        a: "Our support team is available 24 hours a day, 7 days a week — including public holidays. Call or WhatsApp +977 9801663644 or email raghunathpurcable2010@gmail.com.",
      },
      {
        q: "How long does installation take after signing up?",
        a: "For most locations within our primary service area, installation is completed within 1–3 business days. Remote or newly covered areas may take up to 5 business days.",
      },
      {
        q: "Do you offer cable TV along with internet?",
        a: "Yes! RCN offers bundled cable TV and fiber internet packages. We carry 100+ channels including national and regional Nepali channels, news, sports, and entertainment. Ask our team for current bundle pricing.",
      },
      {
        q: "How do I report a network outage?",
        a: "Call +977 9801663644 immediately. Our NOC (Network Operations Center) monitors the network around the clock and we'll dispatch a technician if needed. You'll receive a follow-up confirmation once the issue is resolved.",
      },
    ],
  },
];

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
      className={`rcn-card overflow-hidden transition-all duration-300 ${
        isOpen
          ? "border-[rgb(var(--primary))/50] shadow-[0_0_24px_rgb(var(--primary)/0.12)]"
          : "rcn-card--hoverable"
      }`}
      style={{
        borderColor: isOpen ? "rgb(var(--primary) / 0.45)" : undefined,
      }}>
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={isOpen}>
        <span
          className="font-(family-name:--font-heading) text-base font-semibold leading-snug"
          style={{ color: "rgb(var(--text))" }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="mt-0.5 shrink-0"
          style={{ color: "rgb(var(--primary))" }}>
          <ChevronDown className="h-5 w-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}>
            <div
              className="border-t px-6 pb-5 pt-4 text-sm leading-relaxed"
              style={{
                borderColor: "rgb(var(--primary) / 0.15)",
                color: "rgb(var(--text-muted))",
              }}>
              <div
                className="mr-2 mt-0.5 inline-block h-1 w-1 shrink-0 rounded-full"
                style={{ background: "rgb(var(--primary))" }}
              />
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("getting-started");
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const activeData = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <SiteShell>
      <div className="rcn-container container-section">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center">
          <span className="rcn-badge mb-4 inline-flex">
            <span
              className="rcn-pulse-dot h-1.5 w-1.5 rounded-full"
              style={{ background: "rgb(var(--primary))" }}
            />
            FAQ
          </span>
          <h1
            className="font-(family-name:--font-heading) text-4xl font-bold leading-tight sm:text-5xl"
            style={{ color: "rgb(var(--text))" }}>
            Quick answers,{" "}
            <em style={{ color: "rgb(var(--primary))" }}>clear</em> decisions
          </h1>
          <p
            className="mx-auto mt-4 max-w-xl text-base leading-relaxed"
            style={{ color: "rgb(var(--text-soft))" }}>
            Everything you need to know before getting connected. Still have
            questions? We're here 24/7.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mb-8 flex flex-wrap justify-center gap-3">
          {FAQ_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="rcn-card rcn-card-sm inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  borderColor: isActive
                    ? "rgb(var(--primary) / 0.6)"
                    : undefined,
                  background: isActive
                    ? "rgb(var(--primary) / 0.12)"
                    : undefined,
                  color: isActive
                    ? "rgb(var(--primary))"
                    : "rgb(var(--text-muted))",
                  fontWeight: isActive ? 600 : 400,
                }}>
                <Icon className="h-4 w-4" />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Questions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-3xl space-y-3">
            <div className="mb-5 flex items-center gap-3">
              {(() => {
                const Icon = activeData.icon;
                return (
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      background: `${activeData.color}22`,
                      color: activeData.color,
                    }}>
                    <Icon className="h-5 w-5" />
                  </span>
                );
              })()}
              <h2
                className="font-(family-name:--font-heading) text-xl font-semibold"
                style={{ color: "rgb(var(--text))" }}>
                {activeData.label}
              </h2>
              <span
                className="rcn-card rcn-card-sm ml-auto text-xs"
                style={{ color: "rgb(var(--text-soft))" }}>
                {activeData.questions.length} questions
              </span>
            </div>

            {activeData.questions.map((item, idx) => {
              const key = `${activeCategory}-${idx}`;
              return (
                <AccordionItem
                  key={key}
                  question={item.q}
                  answer={item.a}
                  isOpen={!!openItems[key]}
                  onToggle={() => toggleItem(key)}
                  index={idx}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="rcn-card rcn-card-lg mx-auto mt-16 max-w-3xl text-center"
          style={{ borderColor: "rgb(var(--primary) / 0.2)" }}>
          <div
            className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ background: "rgb(var(--primary) / 0.12)" }}>
            <MessageCircle
              className="h-6 w-6"
              style={{ color: "rgb(var(--primary))" }}
            />
          </div>
          <h3
            className="font-(family-name:--font-heading) text-xl font-bold"
            style={{ color: "rgb(var(--text))" }}>
            Still have questions?
          </h3>
          <p
            className="mt-2 text-sm"
            style={{ color: "rgb(var(--text-soft))" }}>
            Our team is available 24/7 — call, WhatsApp, or email us anytime.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="rcn-btn-primary">
              Contact Support <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+9779801663644" className="rcn-btn-secondary">
              +977 9801663644
            </a>
          </div>
        </motion.div>
      </div>
    </SiteShell>
  );
}

"use client";

import * as React from "react";
import { Collapse } from "antd";
import type { CollapseProps } from "antd";
import { MessageCircle } from "lucide-react";
import { Container } from "./container";
import { Reveal } from "./reveal";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "How fast is installation?",
    children:
      "After plan confirmation, we typically schedule installation quickly based on slot availability in your area.",
  },
  {
    key: "2",
    label: "Do you provide router setup?",
    children:
      "Yes. We help set up your router and Wi‑Fi so you can connect all your devices smoothly.",
  },
  {
    key: "3",
    label: "Can I upgrade my plan later?",
    children:
      "Absolutely. You can upgrade to a higher speed plan anytime—contact support to switch.",
  },
  {
    key: "4",
    label: "What if I need help at night?",
    children:
      "Our support is available 24/7 to assist with connectivity issues and troubleshooting.",
  },
  {
    key: "5",
    label: "Do you support business connections?",
    children:
      "Yes—reach out for business-grade plans, multiple-location setups, and tailored support options.",
  },
  {
    key: "6",
    label: "How do I check coverage in my area?",
    children:
      "Use the ‘Check Availability’ button or contact us—share your address/landmark and we’ll confirm coverage.",
  },
];

export function FAQ({ withHeader = true }: { withHeader?: boolean } = {}) {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <Container>
        {withHeader && (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                <MessageCircle className="h-4 w-4" />
                FAQ
              </div>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Answers to your{" "}
                <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  common questions
                </span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-(--text-muted)">
                Everything you need to know before getting connected to RCN
                fiber internet.
              </p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <div
            className={[
              "mx-auto max-w-3xl rounded-2xl border border-(--border-card) bg-(--bg-card) p-2 shadow-md backdrop-blur-xl",
              withHeader ? "mt-12" : "mt-0",
            ].join(" ")}>
            <Collapse items={items} accordion />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

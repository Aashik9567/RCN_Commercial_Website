"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";

import { Container } from "./container";
import { Reveal } from "./reveal";

import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { business } from "@/data/business";
import { useLanguage } from "@/components/i18n/LanguageProvider";
import { t } from "@/lib/i18n";

export function FAQ({ withHeader = true }: { withHeader?: boolean } = {}) {
  const { lang } = useLanguage();

  if (business.faq.length === 0) {
    // TODO: add real data to business.faq
    return null;
  }

  return (
    <section id="faq" className="container-section">
      <Container>
        {withHeader && (
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <div className="rcn-badge mx-auto">
                <MessageCircle className="h-4 w-4 text-[color:rgb(var(--primary))]" />
                <span className="uppercase tracking-widest">
                  {t(lang, "sectionFaq")}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[color:rgb(var(--text))] sm:text-4xl">
                {t(lang, "sectionFaq")}
              </h2>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.1}>
          <Card
            noHover
            className={[
              "mx-auto max-w-3xl overflow-visible p-2",
              withHeader ? "mt-12" : "mt-0",
            ].join(" ")}>
            <Accordion type="single" collapsible className="grid gap-2">
              {business.faq.map((item, idx) => (
                <AccordionItem key={idx} value={`faq-${idx}`}>
                  <AccordionTrigger>{item.question[lang]}</AccordionTrigger>
                  <AccordionContent>{item.answer[lang]}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </Reveal>
      </Container>
    </section>
  );
}

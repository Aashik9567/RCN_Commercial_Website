"use client";

import * as React from "react";
import { Avatar, Rate } from "antd";
import { Container } from "./container";
import { Reveal } from "./reveal";

type Testimonial = {
  name: string;
  title: string;
  quote: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ananya S.",
    title: "Work-from-home",
    quote:
      "Super stable connection—video calls are smooth and uploads are fast. Support responds quickly too.",
    rating: 5,
  },
  {
    name: "Rahul M.",
    title: "Gamer",
    quote:
      "Ping is consistently low. Streaming + gaming at the same time is finally possible at home.",
    rating: 5,
  },
  {
    name: "Soma D.",
    title: "Family",
    quote:
      "We upgraded to the Standard plan—4K streams don’t buffer and the Wi‑Fi coverage improved.",
    rating: 5,
  },
  {
    name: "Amit K.",
    title: "Small business",
    quote:
      "Reliable internet is essential for our shop. RCN has been consistent and transparent on billing.",
    rating: 5,
  },
  {
    name: "Priya R.",
    title: "Student",
    quote:
      "Online classes and downloads are fast. Installation was done quickly without any hassle.",
    rating: 5,
  },
  {
    name: "Subhankar B.",
    title: "Streamer",
    quote:
      "Great upload stability—my streams are smoother and I don’t get random drops anymore.",
    rating: 5,
  },
];

function initials(name: string) {
  const parts = name.replace(/\./g, "").split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group rounded-2xl border border-gray-200/60 bg-linear-to-br from-white/80 to-gray-50/50 p-6 shadow-md backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg dark:border-gray-800/60 dark:from-gray-900/50 dark:to-gray-900/30 dark:hover:border-indigo-600">
      <div className="flex items-center gap-3">
        <Avatar
          size={44}
          className="shrink-0 bg-linear-to-br from-indigo-400 to-purple-400">
          {initials(t.name)}
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">
            {t.name}
          </div>
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {t.title}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-1">
        <Rate disabled defaultValue={t.rating} />
      </div>

      <p className="mt-5 text-sm leading-7 text-gray-700 dark:text-gray-300">
        <span className="text-lg text-indigo-500">"</span>
        {t.quote}
        <span className="text-lg text-indigo-500">"</span>
      </p>
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-20">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-block rounded-full bg-indigo-50 px-4 py-1 text-sm font-semibold text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
              Testimonials
            </div>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Loved by thousands
              </span>
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Real users, real results. See what customers are saying about
              their RCN experience.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, idx) => (
            <Reveal key={t.name} delay={idx * 0.04}>
              <TestimonialCard t={t} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

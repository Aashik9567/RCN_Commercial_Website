"use client";

import Image from "next/image";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Link, Quote } from "lucide-react";

import { Container } from "@/components/landing/container";
import { FeaturedCard, GhostCard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const MESSAGE = `"At Raghunathpur Cable Network, our mission has always been simple:
bring the world closer to every household in our community.
When we started in 2010 with a handful of connections and a dream,
we never imagined we'd serve over ten thousand families today.

Technology is not just infrastructure — it is opportunity.
Every child who submits homework online, every entrepreneur who
video-calls a client, every family watching a loved one's face on
a screen — that is why we built this network, and why we keep
pushing it further, faster, and stronger.

We are not just an internet provider. We are your neighbor, your
partner, and your connection to the world."`;

const SIGNATURE_NAME = "Fulgen Kumar Mahato";
const SIGNATURE_TITLE = "Founder & Chairperson, Raghunathpur Cable Network";

export function ChairpersonMessage() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="chairperson"
      className="relative overflow-hidden py-24 sm:py-32">
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/4 h-125 w-125 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-125 w-125 rounded-full bg-[rgb(var(--cyan))]/10 blur-3xl" />
      </motion.div>

      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center">
          <GhostCard
            pill
            className="inline-flex items-center gap-2 px-4 py-2"
            noHover>
            <Award className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[rgb(var(--primary))]">
              Message from the Chairperson
            </span>
          </GhostCard>
        </motion.div>

        <div className="grid items-center gap-14 lg:grid-cols-[400px_1fr]">
          <motion.div
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.215, 0.61, 0.355, 1],
            }}>
            <div className="relative">
              <motion.div
                className="absolute -inset-3 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgb(var(--primary)), rgb(var(--cyan)), rgb(var(--gold-bright)), rgb(var(--primary)))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-1.5 rounded-full bg-[rgb(var(--bg))]" />

              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[rgb(var(--primary))]/15 shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-[rgb(var(--primary))]/22 to-[rgb(var(--cyan))]/18">
                  <Image
                    src="/favicon.ico"
                    alt="Raghunathpur Cable Network Logo"
                    width={256}
                    height={256}
                    className="h-64 w-64 rounded-full"
                    priority
                  />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-4 bottom-4">
                <GhostCard
                  className="flex items-center gap-2 px-3 py-2.5"
                  noHover>
                  <Award className="h-4 w-4 text-[rgb(var(--gold))]" />
                  <div>
                    <div className="text-xs font-semibold text-[rgb(var(--text))]">
                      Founded 2010
                    </div>
                    <div className="text-[10px] text-[rgb(var(--text-muted))]">
                      14 Years of Trust
                    </div>
                  </div>
                </GhostCard>
              </motion.div>
            </div>

            <div className="text-center">
              <div className="text-xl font-black text-[rgb(var(--text))]">
                {SIGNATURE_NAME}
              </div>
              <div className="mt-1 text-sm font-medium text-[rgb(var(--primary))]">
                {SIGNATURE_TITLE}
              </div>
              <div className="mx-auto mt-4 h-0.5 w-20 rounded-full bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))]" />
            </div>

            <motion.a
              href="#"
              aria-label="Chairperson LinkedIn"
              className={cn(
                "flex w-full items-center justify-center gap-2",
                "h-11 rounded-xl",
                "bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))]",
                "text-sm font-semibold text-white",
                "shadow-[0_4px_20px_rgb(var(--cyan)_/_0.25)]",
                "transition-all duration-300",
                "hover:shadow-[0_6px_30px_rgb(var(--cyan)_/_0.40)]",
              )}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}>
              <Link className="h-4 w-4" />
              Connect on LinkedIn
            </motion.a>
          </motion.div>

          <FeaturedCard
            from="rgb(var(--primary) / 0.09)"
            to="rgb(var(--cyan) / 0.06)"
            noHover
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="p-8 sm:p-10">
            <Quote className="mb-4 h-12 w-12 text-[rgb(var(--primary))]/25" />

            <div className="space-y-5">
              {MESSAGE.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-7 text-[rgb(var(--text-muted))]"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                  {para.trim()}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10 flex items-center gap-4 border-t border-[rgb(var(--primary))]/12 pt-8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}>
              <div className="h-0.5 w-16 bg-linear-to-r from-[rgb(var(--primary))] to-[rgb(var(--cyan))]" />
              <div>
                <div className="font-black text-[rgb(var(--text))]">
                  {SIGNATURE_NAME}
                </div>
                <div className="text-xs text-[rgb(var(--text-soft))]">
                  {SIGNATURE_TITLE}
                </div>
              </div>
            </motion.div>
          </FeaturedCard>
        </div>
      </Container>
    </section>
  );
}

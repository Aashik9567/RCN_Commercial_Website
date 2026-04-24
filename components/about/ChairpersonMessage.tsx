"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Award, Link, Quote } from "lucide-react";

import { Container } from "@/components/landing/container";


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
        <div className="absolute left-0 top-1/4 h-125 w-125 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-125 w-125 rounded-full bg-violet-500/10 blur-3xl" />
      </motion.div>


      <Container className="relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/25 bg-violet-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-violet-700 backdrop-blur-xl dark:text-violet-300">
            <Award className="h-3.5 w-3.5" />
            Message from the Chairperson
          </div>
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
                    "conic-gradient(from 0deg, rgba(0,229,255,1), rgba(167,139,250,1), rgba(255,78,205,1), rgba(0,229,255,1))",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute -inset-1.5 rounded-full bg-white dark:bg-black" />

              <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-white shadow-2xl dark:border-black">
                {/* Replace this placeholder with an image when available:
                  <Image
                    src="/images/chairperson.jpg"
                    alt={SIGNATURE_NAME}
                    fill
                    className="object-cover object-top"
                    priority
                  />
                */}
                <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-cyan-500/30 to-violet-600/30">
                  <img
              src="/favicon.ico"
              alt="Raghunathpur Cable Network Logo"
              className="h-64 w-64 rounded-full"
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
                className="absolute -right-4 bottom-4 flex items-center gap-2 rounded-2xl border border-white/20 bg-white/90 px-3 py-2.5 shadow-xl backdrop-blur-xl dark:bg-black/70">
                <Award className="h-4 w-4 text-amber-500" />
                <div>
                  <div className="text-xs font-bold text-gray-900 dark:text-white">
                    Founded 2010
                  </div>
                  <div className="text-[10px] text-gray-600 dark:text-white/40">
                    14 Years of Trust
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="text-center">
              <div className="text-xl font-black text-gray-900 dark:text-white">
                {SIGNATURE_NAME}
              </div>
              <div className="mt-1 text-sm font-medium text-cyan-700 dark:text-cyan-300">
                {SIGNATURE_TITLE}
              </div>
              <div className="mx-auto mt-4 h-0.5 w-20 rounded-full bg-linear-to-r from-cyan-500 to-violet-500" />
            </div>

            <motion.a
              href="#"
              aria-label="Chairperson LinkedIn"
              className="flex items-center gap-2 rounded-xl border border-gray-200/80 bg-white/70 px-4 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur-xl transition-colors hover:border-cyan-500/30 hover:text-cyan-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:text-cyan-300"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}>
              <Link className="h-4 w-4" />
              Connect on LinkedIn
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.15,
              ease: [0.215, 0.61, 0.355, 1],
            }}
            className="relative rounded-3xl border border-gray-200/80 bg-white/70 p-8 backdrop-blur-xl sm:p-10 dark:border-white/8 dark:bg-white/4">
            <div className="pointer-events-none absolute inset-0 rounded-3xl bg-linear-to-br from-cyan-500/3 via-transparent to-violet-500/3" />

            <Quote className="mb-4 h-12 w-12 text-cyan-500/30 dark:text-cyan-400/20" />

            <div className="space-y-5">
              {MESSAGE.split("\n\n").map((para, i) => (
                <motion.p
                  key={i}
                  className="text-base leading-8 text-gray-800 dark:text-white/70 sm:text-lg"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}>
                  {para.trim()}
                </motion.p>
              ))}
            </div>

            <motion.div
              className="mt-10 flex items-center gap-4 border-t border-gray-200/60 pt-8 dark:border-white/8"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7 }}>
              <div className="h-0.5 w-16 bg-linear-to-r from-cyan-500 to-violet-500" />
              <div>
                <div className="font-black text-gray-900 dark:text-white">
                  {SIGNATURE_NAME}
                </div>
                <div className="text-sm text-gray-600 dark:text-white/40">
                  {SIGNATURE_TITLE}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

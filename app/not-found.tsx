"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFoundScene = dynamic(
  () => import("@/components/three/not-found-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-10 w-10 animate-pulse rounded-full bg-indigo-500/20" />
      </div>
    ),
  },
);

export default function NotFound() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl items-center px-6 py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-indigo-700 dark:text-indigo-300">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              404
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 text-5xl font-black tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Page Not Found
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-5 max-w-xl text-lg leading-8 text-gray-600 dark:text-white/55">
              The page you’re looking for doesn’t exist (or moved). Use the
              button below to return home.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}>
                <Link
                  href="/"
                  className="inline-flex h-12 items-center justify-center rounded-2xl bg-linear-to-r from-indigo-600 to-purple-600 px-8 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-shadow hover:shadow-indigo-500/30">
                  Go back home
                </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="relative h-90 w-full overflow-hidden rounded-3xl border border-gray-200/60 bg-white/60 shadow-lg shadow-indigo-500/10 backdrop-blur dark:border-white/10 dark:bg-white/5 dark:shadow-none sm:h-105">
            <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-cyan-500/5 via-transparent to-violet-500/5" />
            <NotFoundScene />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

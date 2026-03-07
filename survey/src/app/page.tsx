"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import MathifyLogo from "@/components/MathifyLogo";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-secondary">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mx-auto w-full max-w-[640px] px-5 py-12"
      >
        {/* Card */}
        <div className="rounded-2xl bg-white border border-border shadow-sm p-8 sm:p-12">
          <MathifyLogo size="md" />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground leading-tight">
              國高中數學學習現況調查
            </h1>
            <p className="mt-4 text-foreground-secondary leading-relaxed">
              您好！我們正在研究國高中生的數學學習需求，希望透過您的寶貴意見，
              幫助打造更好的學習資源。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-col gap-3"
          >
            {/* Info tags */}
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary bg-background-secondary rounded-full px-3 py-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="8" cy="8" r="7" />
                  <path d="M8 4v4l3 2" />
                </svg>
                約 5 分鐘
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary bg-background-secondary rounded-full px-3 py-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M13 7a5 5 0 1 0-2 4" />
                  <path d="M8 5v3l2 1" />
                </svg>
                18 道題目
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground-secondary bg-background-secondary rounded-full px-3 py-1.5">
                <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="10" height="10" rx="2" />
                  <path d="M7 7h2m-1-1v2" />
                </svg>
                匿名填答
              </span>
            </div>

            {/* Start button */}
            <Link href="/survey">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-4 w-full rounded-full bg-accent px-6 py-3.5 text-base font-medium text-white hover:bg-accent-hover transition-colors shadow-sm"
              >
                開始填寫
              </motion.button>
            </Link>

            <p className="text-center text-xs text-foreground-secondary mt-2">
              本問卷僅供學術研究使用，不會收集任何可識別個人身份的資訊。
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import MathifyLogo from "./MathifyLogo";

export default function ThankYouPage() {
  const [email, setEmail] = useState("");
  const [waitlistState, setWaitlistState] = useState<
    "idle" | "submitting" | "done" | "error"
  >("idle");

  const handleJoinWaitlist = async () => {
    if (!email.trim() || !email.includes("@")) return;
    setWaitlistState("submitting");

    const { error } = await supabase.from("waitlist").insert({
      email: email.trim(),
      source: "survey_thankyou",
    });

    if (error) {
      console.error("Waitlist error:", error);
      setWaitlistState("error");
      return;
    }
    setWaitlistState("done");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center py-12 px-4"
    >
      {/* Success icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10 mb-6"
      >
        <svg
          className="h-8 w-8 text-success"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-semibold text-foreground mb-3"
      >
        感謝您的填答！
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-foreground-secondary mb-8 max-w-md leading-relaxed"
      >
        您的寶貴意見將幫助我們打造更好的數學學習工具，讓每個孩子都能輕鬆學好數學。
      </motion.p>

      {/* Waitlist CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md rounded-xl border-2 border-accent/20 bg-highlight p-6 mb-6"
      >
        {waitlistState === "done" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-2 py-2"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success/10">
              <svg
                className="h-5 w-5 text-success"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-foreground">
              已加入候補名單！
            </p>
            <p className="text-xs text-foreground-secondary">
              我們會在 App 上線時第一時間通知您
            </p>
          </motion.div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg
                className="h-5 w-5 text-accent"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <h3 className="text-base font-semibold text-foreground">
                搶先體驗 Mathify
              </h3>
            </div>
            <p className="text-sm text-foreground-secondary mb-4">
              留下 Email，App 上線時我們會優先通知您！
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleJoinWaitlist()}
                placeholder="your@email.com"
                className="flex-1 rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleJoinWaitlist}
                disabled={
                  waitlistState === "submitting" || !email.trim() || !email.includes("@")
                }
                className="shrink-0 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-50"
              >
                {waitlistState === "submitting" ? "加入中..." : "加入候補"}
              </motion.button>
            </div>
            {waitlistState === "error" && (
              <p className="mt-2 text-xs text-orange-text">
                發生錯誤，請稍後再試。
              </p>
            )}
          </>
        )}
      </motion.div>

      {/* Mathify intro card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="w-full max-w-md rounded-xl border border-border bg-background-secondary p-6 text-left"
      >
        <div className="mb-4">
          <MathifyLogo size="sm" />
        </div>
        <p className="text-sm text-foreground-secondary leading-relaxed mb-4">
          <strong className="text-foreground">Mathify</strong> 是一個 AI 驅動的數學學習平台，
          讓孩子拍照上傳不會的數學題，AI 會用圖形和動畫一步步講解，
          並根據弱點自動推薦練習。
        </p>
        <a
          href="https://mathify.io"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover transition-colors"
        >
          了解更多
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}

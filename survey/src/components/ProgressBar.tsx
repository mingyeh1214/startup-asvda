"use client";

import { motion } from "framer-motion";
import { SECTION_TITLES } from "@/types/survey";
import { TOTAL_SECTIONS } from "@/lib/questions";

interface ProgressBarProps {
  currentSection: number;
}

export default function ProgressBar({ currentSection }: ProgressBarProps) {
  const progress = (currentSection / TOTAL_SECTIONS) * 100;

  return (
    <div className="w-full mb-8">
      {/* Section breadcrumbs */}
      <div className="flex items-center justify-between mb-3 overflow-x-auto gap-1 pb-1">
        {Array.from({ length: TOTAL_SECTIONS }, (_, i) => i + 1).map((section) => {
          const isActive = section === currentSection;
          const isCompleted = section < currentSection;

          return (
            <div
              key={section}
              className={`flex items-center gap-1.5 text-xs whitespace-nowrap transition-colors ${
                isActive
                  ? "text-accent font-medium"
                  : isCompleted
                  ? "text-success font-medium"
                  : "text-foreground-secondary"
              }`}
            >
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-medium ${
                  isActive
                    ? "bg-accent text-white"
                    : isCompleted
                    ? "bg-success text-white"
                    : "bg-background-secondary text-foreground-secondary"
                }`}
              >
                {isCompleted ? "✓" : section}
              </span>
              <span className="hidden sm:inline">{SECTION_TITLES[section]}</span>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-background-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

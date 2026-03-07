"use client";

import { motion } from "framer-motion";

export default function MathifyLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeMap = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  };

  return (
    <motion.div
      className="flex items-center gap-2"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-white font-bold text-lg">
        M
      </div>
      <span className={`font-semibold text-foreground tracking-tight ${sizeMap[size]}`}>
        Mathify
      </span>
    </motion.div>
  );
}

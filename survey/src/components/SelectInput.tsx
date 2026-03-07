"use client";

import { motion } from "framer-motion";

interface SelectInputProps {
  questionId: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SelectInput({
  questionId,
  options,
  value,
  onChange,
  placeholder = "請選擇...",
}: SelectInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <select
        id={questionId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-border bg-white px-4 py-3 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors appearance-none cursor-pointer ${
          value ? "text-foreground" : "text-foreground-secondary"
        }`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' stroke='%23787774' fill='none' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 12px center",
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </motion.div>
  );
}

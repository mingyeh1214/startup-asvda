"use client";

import { motion } from "framer-motion";

interface TextInputProps {
  questionId: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function TextInput({
  questionId,
  value,
  onChange,
  placeholder = "請輸入您的回答...",
  multiline = true,
}: TextInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {multiline ? (
        <textarea
          id={questionId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none resize-none transition-colors"
        />
      ) : (
        <input
          type="text"
          id={questionId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
        />
      )}
    </motion.div>
  );
}

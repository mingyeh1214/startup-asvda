"use client";

import { motion } from "framer-motion";

interface ContactInputProps {
  email: string;
  lineId: string;
  onEmailChange: (value: string) => void;
  onLineIdChange: (value: string) => void;
}

export default function ContactInput({
  email,
  lineId,
  onEmailChange,
  onLineIdChange,
}: ContactInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4"
    >
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="contact-email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="your@email.com"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
        />
      </div>
      <div>
        <label htmlFor="contact-line" className="block text-sm font-medium text-foreground mb-1.5">
          Line ID
        </label>
        <input
          type="text"
          id="contact-line"
          value={lineId}
          onChange={(e) => onLineIdChange(e.target.value)}
          placeholder="您的 Line ID"
          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-foreground-secondary focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-colors"
        />
      </div>
      <p className="text-xs text-foreground-secondary">
        我們只會用於通知您免費體驗的資訊，不會分享給第三方。
      </p>
    </motion.div>
  );
}

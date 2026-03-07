"use client";

import { motion } from "framer-motion";

interface RadioGroupProps {
  questionId: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function RadioGroup({
  questionId,
  options,
  value,
  onChange,
  allowOther,
  otherValue = "",
  onOtherChange,
}: RadioGroupProps) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((option, index) => {
        const isSelected = value === option;
        return (
          <motion.button
            key={option}
            type="button"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={{ scale: 1.01, y: -1 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onChange(option)}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition-all ${
              isSelected
                ? "border-accent bg-highlight border-l-[3px] border-l-accent"
                : "border-border bg-white hover:bg-highlight/50 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 shrink-0 ${
                isSelected ? "border-accent" : "border-border"
              }`}
            >
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-2 w-2 rounded-full bg-accent"
                />
              )}
            </div>
            <span className="text-sm text-foreground">{option}</span>
          </motion.button>
        );
      })}

      {allowOther && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: options.length * 0.03 }}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg border transition-all ${
            value === "__other__"
              ? "border-accent bg-highlight border-l-[3px] border-l-accent"
              : "border-border bg-white hover:bg-highlight/50"
          }`}
        >
          <button
            type="button"
            onClick={() => onChange("__other__")}
            className="flex items-center gap-3 shrink-0"
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                value === "__other__" ? "border-accent" : "border-border"
              }`}
            >
              {value === "__other__" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-2 w-2 rounded-full bg-accent"
                />
              )}
            </div>
            <span className="text-sm text-foreground">其他</span>
          </button>
          {value === "__other__" && (
            <input
              type="text"
              value={otherValue}
              onChange={(e) => onOtherChange?.(e.target.value)}
              placeholder="請填寫..."
              autoFocus
              className="flex-1 text-sm bg-transparent border-b border-border focus:border-accent outline-none py-1 text-foreground placeholder:text-foreground-secondary"
            />
          )}
        </motion.div>
      )}
    </div>
  );
}

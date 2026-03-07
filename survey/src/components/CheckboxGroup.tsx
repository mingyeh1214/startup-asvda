"use client";

import { motion } from "framer-motion";

interface CheckboxGroupProps {
  questionId: string;
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  maxSelections?: number;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
}

export default function CheckboxGroup({
  questionId,
  options,
  values,
  onChange,
  maxSelections,
  allowOther,
  otherValue = "",
  onOtherChange,
}: CheckboxGroupProps) {
  const handleToggle = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter((v) => v !== option));
    } else {
      if (maxSelections && values.filter((v) => v !== "__other__").length >= maxSelections) return;
      onChange([...values, option]);
    }
  };

  const isAtMax = maxSelections
    ? values.filter((v) => v !== "__other__").length >= maxSelections
    : false;

  return (
    <div className="flex flex-col gap-2">
      {maxSelections && (
        <p className="text-xs text-foreground-secondary mb-1">
          已選 {values.filter((v) => v !== "__other__").length} / {maxSelections} 項
        </p>
      )}
      {options.map((option, index) => {
        const isSelected = values.includes(option);
        const isDisabled = !isSelected && isAtMax;

        return (
          <motion.button
            key={option}
            type="button"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.03 }}
            whileHover={isDisabled ? {} : { scale: 1.01, y: -1 }}
            whileTap={isDisabled ? {} : { scale: 0.99 }}
            onClick={() => !isDisabled && handleToggle(option)}
            className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg border transition-all ${
              isSelected
                ? "border-accent bg-highlight border-l-[3px] border-l-accent"
                : isDisabled
                ? "border-border bg-background-secondary opacity-50 cursor-not-allowed"
                : "border-border bg-white hover:bg-highlight/50 hover:shadow-sm"
            }`}
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded shrink-0 border-2 ${
                isSelected ? "border-accent bg-accent" : "border-border"
              }`}
            >
              {isSelected && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 6L5 8L9 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
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
            values.includes("__other__")
              ? "border-accent bg-highlight border-l-[3px] border-l-accent"
              : isAtMax
              ? "border-border bg-background-secondary opacity-50 cursor-not-allowed"
              : "border-border bg-white hover:bg-highlight/50"
          }`}
        >
          <button
            type="button"
            onClick={() => !isAtMax && handleToggle("__other__")}
            disabled={isAtMax && !values.includes("__other__")}
            className="flex items-center gap-3 shrink-0"
          >
            <div
              className={`flex h-4 w-4 items-center justify-center rounded border-2 ${
                values.includes("__other__") ? "border-accent bg-accent" : "border-border"
              }`}
            >
              {values.includes("__other__") && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="h-3 w-3 text-white"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M3 6L5 8L9 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              )}
            </div>
            <span className="text-sm text-foreground">其他</span>
          </button>
          {values.includes("__other__") && (
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

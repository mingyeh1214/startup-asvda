"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SurveyAnswers, SurveySubmission } from "@/types/survey";
import { questions, getQuestionsBySection, TOTAL_SECTIONS } from "@/lib/questions";
import { supabase } from "@/lib/supabase";
import ProgressBar from "./ProgressBar";
import QuestionStep from "./QuestionStep";
import { shouldShowQuestion } from "./QuestionStep";
import ThankYouPage from "./ThankYouPage";
import MathifyLogo from "./MathifyLogo";

type FormState = "filling" | "submitting" | "done" | "error";

export default function SurveyForm() {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState<SurveyAnswers>({});
  const [otherValues, setOtherValues] = useState<Record<string, string>>({});
  const [contactEmail, setContactEmail] = useState("");
  const [contactLine, setContactLine] = useState("");
  const [formState, setFormState] = useState<FormState>("filling");
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [validationError, setValidationError] = useState<string | null>(null);
  const startTime = useRef(Date.now());
  const topRef = useRef<HTMLDivElement>(null);

  const sectionQuestions = getQuestionsBySection();

  const handleAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      setValidationError(null);
    },
    []
  );

  const handleOtherChange = useCallback(
    (questionId: string, value: string) => {
      setOtherValues((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  // Check if Q1 is "以上皆非" — not our target
  const isNotTarget = answers["Q1"] === "以上皆非";

  // Validate current section's required questions
  const validateSection = (): boolean => {
    const currentQuestions = sectionQuestions.get(currentSection) || [];
    for (const q of currentQuestions) {
      if (!shouldShowQuestion(q, answers)) continue;
      if (!q.required) continue;

      const answer = answers[q.id];

      if (q.type === "radio" || q.type === "select") {
        if (!answer) {
          setValidationError(`請回答 ${q.id}`);
          return false;
        }
      }
      if (q.type === "checkbox") {
        if (!answer || (answer as string[]).length === 0) {
          setValidationError(`請回答 ${q.id}`);
          return false;
        }
      }
    }
    setValidationError(null);
    return true;
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNext = () => {
    if (!validateSection()) return;

    if (isNotTarget && currentSection === 1) {
      // Skip to thank you with a message
      setFormState("done");
      return;
    }

    if (currentSection < TOTAL_SECTIONS) {
      setDirection(1);
      setCurrentSection((prev) => prev + 1);
      scrollToTop();
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentSection > 1) {
      setDirection(-1);
      setCurrentSection((prev) => prev - 1);
      scrollToTop();
    }
  };

  const handleSubmit = async () => {
    setFormState("submitting");
    const completionTime = Math.round((Date.now() - startTime.current) / 1000);

    // Build final answers with "other" values resolved
    const finalAnswers: SurveyAnswers = { ...answers };
    for (const [qId, val] of Object.entries(finalAnswers)) {
      if (val === "__other__" && otherValues[qId]) {
        finalAnswers[qId] = `其他：${otherValues[qId]}`;
      }
      if (Array.isArray(val) && val.includes("__other__") && otherValues[qId]) {
        finalAnswers[qId] = val.map((v) =>
          v === "__other__" ? `其他：${otherValues[qId]}` : v
        );
      }
    }

    const submission: SurveySubmission = {
      survey_type: "parent",
      answers: finalAnswers,
      contact_email: contactEmail || null,
      contact_line: contactLine || null,
      willing_to_try: answers["Q16"] === "有，請通知我",
      user_agent: navigator.userAgent,
      completion_time_seconds: completionTime,
    };

    const { error } = await supabase
      .from("survey_responses")
      .insert(submission);

    if (error) {
      console.error("Submit error:", error);
      setFormState("error");
      return;
    }

    setFormState("done");
  };

  const currentQuestions = sectionQuestions.get(currentSection) || [];
  const isLastSection = currentSection === TOTAL_SECTIONS;

  // Slide animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
    }),
  };

  if (formState === "done") {
    return (
      <div className="mx-auto w-full max-w-[640px] px-5 py-8">
        {isNotTarget ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">
              感謝您的時間！
            </h2>
            <p className="text-foreground-secondary">
              本問卷主要針對國高中生家長，感謝您的關注。
            </p>
          </motion.div>
        ) : (
          <ThankYouPage />
        )}
      </div>
    );
  }

  return (
    <div ref={topRef} className="mx-auto w-full max-w-[640px] px-5 py-8">
      {/* Header */}
      <div className="mb-6">
        <MathifyLogo size="sm" />
      </div>

      {/* Progress */}
      <ProgressBar currentSection={currentSection} />

      {/* Section title */}
      <motion.div
        key={`section-title-${currentSection}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <span className="text-xs font-medium text-foreground-secondary uppercase tracking-wider">
          第 {currentSection} 部分 / 共 {TOTAL_SECTIONS} 部分
        </span>
        <h2 className="text-xl font-semibold text-foreground mt-1">
          {currentQuestions[0]?.sectionTitle}
        </h2>
      </motion.div>

      {/* Questions with slide animation */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentSection}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <QuestionStep
            questions={currentQuestions}
            answers={answers}
            otherValues={otherValues}
            contactEmail={contactEmail}
            contactLine={contactLine}
            onAnswer={handleAnswer}
            onOtherChange={handleOtherChange}
            onContactEmailChange={setContactEmail}
            onContactLineChange={setContactLine}
            allAnswers={answers}
          />
        </motion.div>
      </AnimatePresence>

      {/* Validation error */}
      {validationError && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-sm text-orange-text bg-orange-bg rounded-lg px-4 py-2"
        >
          {validationError}
        </motion.p>
      )}

      {/* Error state */}
      {formState === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2"
        >
          提交失敗，請稍後再試。
        </motion.p>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrev}
          disabled={currentSection === 1}
          className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
            currentSection === 1
              ? "text-foreground-secondary/40 cursor-not-allowed"
              : "text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
          }`}
        >
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 4l-4 4 4 4" />
          </svg>
          上一步
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          disabled={formState === "submitting"}
          className="flex items-center gap-2 rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent-hover transition-colors disabled:opacity-60"
        >
          {formState === "submitting" ? (
            <>
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 60" />
              </svg>
              提交中...
            </>
          ) : isLastSection ? (
            "提交問卷"
          ) : (
            <>
              下一步
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 4l4 4-4 4" />
              </svg>
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

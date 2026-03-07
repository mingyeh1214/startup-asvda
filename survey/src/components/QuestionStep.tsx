"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Question, SurveyAnswers } from "@/types/survey";
import RadioGroup from "./RadioGroup";
import CheckboxGroup from "./CheckboxGroup";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import ContactInput from "./ContactInput";

interface QuestionStepProps {
  questions: Question[];
  answers: SurveyAnswers;
  otherValues: Record<string, string>;
  contactEmail: string;
  contactLine: string;
  onAnswer: (questionId: string, value: string | string[]) => void;
  onOtherChange: (questionId: string, value: string) => void;
  onContactEmailChange: (value: string) => void;
  onContactLineChange: (value: string) => void;
  allAnswers: SurveyAnswers;
}

function shouldShowQuestion(question: Question, allAnswers: SurveyAnswers): boolean {
  if (!question.showWhen) return true;
  const { questionId, answers: triggerAnswers } = question.showWhen;
  const currentAnswer = allAnswers[questionId];
  if (!currentAnswer) return false;
  if (typeof currentAnswer === "string") {
    return triggerAnswers.includes(currentAnswer);
  }
  return triggerAnswers.some((a) => currentAnswer.includes(a));
}

export default function QuestionStep({
  questions,
  answers,
  otherValues,
  contactEmail,
  contactLine,
  onAnswer,
  onOtherChange,
  onContactEmailChange,
  onContactLineChange,
  allAnswers,
}: QuestionStepProps) {
  const visibleQuestions = questions.filter((q) => shouldShowQuestion(q, allAnswers));

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {visibleQuestions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: index * 0.1 }}
          >
            {/* Question label */}
            <div className="mb-3">
              <div className="flex items-start gap-2">
                <span className="text-xs font-medium text-accent bg-highlight px-2 py-0.5 rounded mt-0.5">
                  {question.id}
                </span>
                <h3 className="text-base font-medium text-foreground leading-relaxed">
                  {question.question}
                  {question.required && (
                    <span className="text-orange-text ml-1">*</span>
                  )}
                </h3>
              </div>
              {question.description && (
                <div className="mt-3 rounded-lg bg-orange-bg border border-orange-text/20 px-4 py-3">
                  <p className="text-sm text-foreground leading-relaxed">
                    {question.description}
                  </p>
                </div>
              )}
            </div>

            {/* Question input */}
            {question.type === "radio" && question.options && (
              <RadioGroup
                questionId={question.id}
                options={question.options}
                value={(answers[question.id] as string) || ""}
                onChange={(value) => onAnswer(question.id, value)}
                allowOther={question.allowOther}
                otherValue={otherValues[question.id] || ""}
                onOtherChange={(value) => onOtherChange(question.id, value)}
              />
            )}

            {question.type === "checkbox" && question.options && (
              <CheckboxGroup
                questionId={question.id}
                options={question.options}
                values={(answers[question.id] as string[]) || []}
                onChange={(values) => onAnswer(question.id, values)}
                maxSelections={question.maxSelections}
                allowOther={question.allowOther}
                otherValue={otherValues[question.id] || ""}
                onOtherChange={(value) => onOtherChange(question.id, value)}
              />
            )}

            {question.type === "text" && (
              <TextInput
                questionId={question.id}
                value={(answers[question.id] as string) || ""}
                onChange={(value) => onAnswer(question.id, value)}
              />
            )}

            {question.type === "select" && question.options && (
              <SelectInput
                questionId={question.id}
                options={question.options}
                value={(answers[question.id] as string) || ""}
                onChange={(value) => onAnswer(question.id, value)}
              />
            )}

            {question.type === "contact" && (
              <ContactInput
                email={contactEmail}
                lineId={contactLine}
                onEmailChange={onContactEmailChange}
                onLineIdChange={onContactLineChange}
              />
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export { shouldShowQuestion };

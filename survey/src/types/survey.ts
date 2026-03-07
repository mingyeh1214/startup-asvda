export type QuestionType = "radio" | "checkbox" | "text" | "select" | "contact";

export interface Question {
  id: string;
  question: string;
  type: QuestionType;
  options?: string[];
  required: boolean;
  maxSelections?: number;
  showWhen?: {
    questionId: string;
    answers: string[];
  };
  section: number;
  sectionTitle: string;
  allowOther?: boolean;
  description?: string;
}

export interface SurveyAnswers {
  [questionId: string]: string | string[];
}

export interface ContactInfo {
  email: string;
  lineId: string;
}

export interface SurveySubmission {
  survey_type: "parent";
  answers: SurveyAnswers;
  contact_email: string | null;
  contact_line: string | null;
  willing_to_try: boolean;
  user_agent: string;
  completion_time_seconds: number;
}

export const SECTION_TITLES: Record<number, string> = {
  1: "基本資料",
  2: "學習行為",
  3: "痛點挖掘",
  4: "解方測試",
  5: "付費驗證",
  6: "行動承諾",
};

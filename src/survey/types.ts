// ─────────────────────────────────────────────────────────────────────────
// Survey schema
// One engine renders any survey defined against these types. A "survey" is a
// hand-picked, ordered list of questions (Model 1 — no branching in this POC).
// ─────────────────────────────────────────────────────────────────────────

export type QuestionType =
  | 'single' // single choice (radio)
  | 'multiple' // multiple choice (checkboxes, optional cap)
  | 'yesno' // yes / no
  | 'rating' // 1–N scale: numeric OR labelled (Likert)
  | 'short-text' // single-line free text
  | 'long-text' // multi-line free text
  | 'numeric' // number entry with optional unit
  | 'dropdown'; // select menu (good for long option lists)

export interface Option {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  helpText?: string;
  required?: boolean;

  // single | multiple | dropdown
  options?: Option[];
  placeholder?: string; // dropdown / text / numeric

  // multiple
  maxSelections?: number;

  // rating — if `options` is set, renders as a labelled Likert scale;
  // otherwise renders as a numeric 1..points scale with end labels.
  points?: number;
  lowLabel?: string;
  highLabel?: string;

  // text
  maxLength?: number;

  // numeric
  min?: number;
  max?: number;
  unitLabel?: string;
}

export interface InvitationHighlight {
  icon: 'clock' | 'shield' | 'gift';
  title: string;
  text: string;
}

export interface Survey {
  id: string;
  title: string; // student-facing title
  introHeading?: string; // bold headline in the invitation modal
  introText: string; // modal advert copy
  highlights?: InvitationHighlight[]; // bulleted reasons in the invitation
  reason: string; // why the research matters
  estimatedTime?: string; // e.g. "about 60 seconds"
  prizeDraw?: {
    enabled: boolean;
    blurb: string; // shown in the invitation modal
  };
  thankYou: string; // completion message
  questions: Question[];
}

// Answers are keyed by question id. Multiple-choice stores an array.
export type AnswerValue = string | string[];
export type Answers = Record<string, AnswerValue>;

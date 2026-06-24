import type { AnswerValue, Question } from './types';

const isBlank = (v: AnswerValue | undefined): boolean =>
  v === undefined ||
  v === '' ||
  (Array.isArray(v) && v.length === 0);

// Returns an error message for the given answer, or null if valid.
export function validateAnswer(
  question: Question,
  value: AnswerValue | undefined,
): string | null {
  if (isBlank(value)) {
    return question.required ? 'This question is required.' : null;
  }

  switch (question.type) {
    case 'multiple': {
      const arr = value as string[];
      if (question.maxSelections && arr.length > question.maxSelections) {
        return `Please select up to ${question.maxSelections}.`;
      }
      return null;
    }
    case 'numeric': {
      const n = Number(value as string);
      if (Number.isNaN(n)) return 'Please enter a number.';
      if (question.min !== undefined && n < question.min)
        return `Please enter ${question.min} or more.`;
      if (question.max !== undefined && n > question.max)
        return `Please enter ${question.max} or less.`;
      return null;
    }
    default:
      return null;
  }
}

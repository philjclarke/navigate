import type { AnswerValue, Question } from '../../survey/types';

export interface QuestionInputProps {
  question: Question;
  value: AnswerValue | undefined;
  onChange: (value: AnswerValue) => void;
  invalid?: boolean; // wires aria-invalid + visual error state
  describedBy?: string; // id of help/error text for aria-describedby
}

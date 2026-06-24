import { useEffect, useRef, useState } from 'react';
import type { AnswerValue, Survey } from '../survey/types';
import { validateAnswer } from '../survey/validation';
import { QuestionRenderer } from '../components/questions/QuestionRenderer';
import { ProgressBar } from '../components/ProgressBar';
import { Button } from '../components/Button';
import { IconArrowLeft, IconArrowRight, IconClose } from '../components/Icon';
import { ScreenLayout } from './Shell';

// Wizard-style survey: one question per screen, progress bar, back/next,
// mandatory/optional validation (spec §2.2). The current index is controlled
// by the parent so Back from later stages can resume here.
export function SurveyWizard({
  survey,
  index,
  answers,
  onAnswer,
  onNext,
  onBack,
  onExit,
}: {
  survey: Survey;
  index: number;
  answers: Record<string, AnswerValue>;
  onAnswer: (id: string, value: AnswerValue) => void;
  onNext: () => void;
  onBack: () => void;
  onExit: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const total = survey.questions.length;
  const q = survey.questions[index];
  const isLast = index === total - 1;

  // Move focus to the question on each step (a11y) and clear stale errors.
  useEffect(() => {
    setError(null);
    headingRef.current?.focus();
  }, [index]);

  const goNext = () => {
    const err = validateAnswer(q, answers[q.id]);
    if (err) {
      setError(err);
      return;
    }
    onNext();
  };

  const helpId = q.helpText ? `${q.id}-help` : undefined;
  const errId = error ? `${q.id}-error` : undefined;
  const describedBy = [helpId, errId].filter(Boolean).join(' ') || undefined;

  return (
    <ScreenLayout
      header={
        <div>
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-1 text-sm text-muted hover:text-ink rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              <IconArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-sm font-medium text-ink">
              Question {index + 1} of {total}
            </span>
            <button
              type="button"
              aria-label="Exit survey"
              onClick={onExit}
              className="text-muted hover:text-ink p-1 -mr-1 rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>
          <ProgressBar current={index + 1} total={total} />
        </div>
      }
      footer={
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={onBack} className="flex-1">
            <IconArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={goNext} className="flex-1">
            {isLast ? 'Continue' : 'Next'}
            <IconArrowRight className="w-4 h-4" />
          </Button>
        </div>
      }
    >
      <fieldset className="border-0 p-0 m-0">
        <legend className="contents">
          <h2
            ref={headingRef}
            tabIndex={-1}
            className="text-lg font-semibold text-ink leading-snug outline-none"
          >
            {q.text}
            {q.required && <span className="text-danger ml-1" aria-hidden="true">*</span>}
          </h2>
        </legend>

        {error ? (
          <p id={errId} role="alert" className="mt-1 text-sm font-medium text-danger">
            {error}
          </p>
        ) : (
          <p className="mt-1 text-xs font-medium text-muted">
            {q.required ? 'Required' : 'Optional'}
          </p>
        )}

        {q.helpText && (
          <p id={helpId} className="mt-2 text-sm text-muted leading-relaxed">
            {q.helpText}
          </p>
        )}

        <div className="mt-4">
          <QuestionRenderer
            question={q}
            value={answers[q.id]}
            onChange={(v) => {
              onAnswer(q.id, v);
              if (error) setError(null);
            }}
            invalid={!!error}
            describedBy={describedBy}
          />
        </div>
      </fieldset>
    </ScreenLayout>
  );
}

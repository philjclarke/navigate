import type { QuestionInputProps } from './types';

// Two presentations from one type:
//  • labelled (Likert) — when the question supplies `options`
//  • numeric 1..points — when it doesn't (uses low/high end labels)
export function Rating({ question, value, onChange, invalid, describedBy }: Props) {
  if (question.options && question.options.length > 0) {
    return (
      <LabelledScale
        question={question}
        value={value}
        onChange={onChange}
        invalid={invalid}
        describedBy={describedBy}
      />
    );
  }
  return (
    <NumericScale
      question={question}
      value={value}
      onChange={onChange}
      invalid={invalid}
      describedBy={describedBy}
    />
  );
}

type Props = QuestionInputProps;

// Labelled vertical scale — long labels read well on a phone.
function LabelledScale({ question, value, onChange, invalid, describedBy }: Props) {
  const opts = question.options ?? [];
  return (
    <div
      role="radiogroup"
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="flex flex-col gap-2.5"
    >
      {opts.map((opt, i) => {
        const isSelected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.value)}
            className={[
              'flex items-center gap-3 w-full text-left px-4 py-3 rounded-card border transition cursor-pointer',
              'focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring',
              isSelected
                ? 'border-brand bg-brand-soft'
                : 'border-edge bg-surface hover:border-brand-ring',
            ].join(' ')}
          >
            <span
              className={[
                'flex items-center justify-center shrink-0 w-7 h-7 rounded-full border-2 text-xs font-semibold transition',
                isSelected ? 'bg-brand border-brand text-white' : 'border-edge text-muted',
              ].join(' ')}
            >
              {i + 1}
            </span>
            <span className="text-[15px] leading-snug text-ink">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// Numeric 1..N scale — horizontal pills with end labels.
function NumericScale({ question, value, onChange, invalid, describedBy }: Props) {
  const points = question.points ?? 5;
  const nums = Array.from({ length: points }, (_, i) => String(i + 1));
  return (
    <div aria-invalid={invalid || undefined} aria-describedby={describedBy}>
      <div role="radiogroup" className="flex gap-2">
        {nums.map((n) => {
          const isSelected = value === n;
          return (
            <button
              key={n}
              type="button"
              role="radio"
              aria-checked={isSelected}
              aria-label={n}
              onClick={() => onChange(n)}
              className={[
                'flex-1 aspect-square min-h-12 rounded-card border text-lg font-semibold transition cursor-pointer',
                'focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring',
                isSelected
                  ? 'border-brand bg-brand text-white'
                  : 'border-edge bg-surface text-ink hover:border-brand-ring',
              ].join(' ')}
            >
              {n}
            </button>
          );
        })}
      </div>
      {(question.lowLabel || question.highLabel) && (
        <div className="flex justify-between mt-2 text-xs text-muted">
          <span>{question.lowLabel}</span>
          <span>{question.highLabel}</span>
        </div>
      )}
    </div>
  );
}

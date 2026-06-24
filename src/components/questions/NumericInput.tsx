import type { QuestionInputProps } from './types';

// Number entry with optional unit label and stepper buttons (big tap targets).
export function NumericInput({ question, value, onChange, invalid, describedBy }: QuestionInputProps) {
  const raw = (value as string) ?? '';
  const min = question.min;
  const max = question.max;

  const step = (delta: number) => {
    const current = raw === '' ? (min ?? 0) : Number(raw);
    let next = current + delta;
    if (min !== undefined) next = Math.max(min, next);
    if (max !== undefined) next = Math.min(max, next);
    onChange(String(next));
  };

  return (
    <div className="flex items-stretch gap-2">
      <button
        type="button"
        aria-label="Decrease"
        onClick={() => step(-1)}
        className="shrink-0 w-12 rounded-card border border-edge bg-surface text-2xl text-ink leading-none cursor-pointer hover:border-brand-ring focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
      >
        −
      </button>
      <div className="flex-1 flex items-center rounded-card border bg-surface px-4 transition focus-within:ring-3 focus-within:ring-brand-ring"
        style={{ borderColor: invalid ? 'var(--danger)' : 'var(--border)' }}
      >
        <input
          inputMode="numeric"
          pattern="[0-9]*"
          value={raw}
          onChange={(e) => onChange(e.target.value.replace(/[^0-9]/g, ''))}
          placeholder={question.placeholder}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className="w-full bg-transparent py-3 text-[15px] text-ink placeholder:text-muted/70 focus:outline-none"
        />
        {question.unitLabel && (
          <span className="ml-2 shrink-0 text-sm text-muted">{question.unitLabel}</span>
        )}
      </div>
      <button
        type="button"
        aria-label="Increase"
        onClick={() => step(1)}
        className="shrink-0 w-12 rounded-card border border-edge bg-surface text-2xl text-ink leading-none cursor-pointer hover:border-brand-ring focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
      >
        +
      </button>
    </div>
  );
}

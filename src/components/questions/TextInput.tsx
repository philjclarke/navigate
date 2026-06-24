import type { QuestionInputProps } from './types';

// Short (single-line) and long (multi-line) free text, with optional counter.
export function TextInput({
  question,
  value,
  onChange,
  invalid,
  describedBy,
  multiline = false,
}: QuestionInputProps & { multiline?: boolean }) {
  const text = (value as string) ?? '';
  const max = question.maxLength;

  const shared =
    'w-full rounded-card border bg-surface px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 ' +
    'transition focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring ' +
    (invalid ? 'border-danger' : 'border-edge focus:border-brand');

  return (
    <div>
      {multiline ? (
        <textarea
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={max}
          rows={5}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={shared + ' resize-y min-h-32'}
        />
      ) : (
        <input
          type="text"
          value={text}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={max}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
          className={shared}
        />
      )}
      {max && (
        <div className="mt-1.5 text-right text-xs text-muted">
          {text.length} / {max}
        </div>
      )}
    </div>
  );
}

import type { QuestionInputProps } from './types';

// Native select — best for long option lists and accessible by default on mobile.
export function Dropdown({ question, value, onChange, invalid, describedBy }: QuestionInputProps) {
  const opts = question.options ?? [];
  return (
    <div className="relative">
      <select
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        className={[
          'w-full appearance-none rounded-card border bg-surface px-4 py-3 pr-10 text-[15px] text-ink',
          'transition focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring',
          invalid ? 'border-danger' : 'border-edge focus:border-brand',
          value ? '' : 'text-muted',
        ].join(' ')}
      >
        <option value="" disabled>
          {question.placeholder ?? 'Please select…'}
        </option>
        {opts.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-ink">
            {opt.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

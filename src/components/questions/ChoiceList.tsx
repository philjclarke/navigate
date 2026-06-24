import type { Option } from '../../survey/types';
import type { QuestionInputProps } from './types';
import { IconCheck } from '../Icon';

// Renders single-choice (radio behaviour) or multiple-choice (checkbox
// behaviour) as a vertical list of large, tappable cards — ideal for mobile.
type Props = QuestionInputProps & {
  multiple?: boolean;
  options: Option[];
};

export function ChoiceList({
  options,
  value,
  onChange,
  multiple = false,
  question,
  invalid,
  describedBy,
}: Props) {
  const selected: string[] = multiple
    ? ((value as string[]) ?? [])
    : value
      ? [value as string]
      : [];

  const atCap =
    multiple &&
    question.maxSelections !== undefined &&
    selected.length >= question.maxSelections;

  const toggle = (val: string) => {
    if (!multiple) {
      onChange(val);
      return;
    }
    const has = selected.includes(val);
    if (has) {
      onChange(selected.filter((v) => v !== val));
    } else if (!atCap) {
      onChange([...selected, val]);
    }
  };

  return (
    <div
      role={multiple ? 'group' : 'radiogroup'}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      className="flex flex-col gap-2.5"
    >
      {options.map((opt) => {
        const isSelected = selected.includes(opt.value);
        const disabled = !isSelected && atCap;
        return (
          <button
            key={opt.value}
            type="button"
            role={multiple ? 'checkbox' : 'radio'}
            aria-checked={isSelected}
            disabled={disabled}
            onClick={() => toggle(opt.value)}
            className={[
              'flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-card border transition',
              'focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring',
              isSelected
                ? 'border-brand bg-brand-soft text-ink'
                : 'border-edge bg-surface text-ink hover:border-brand-ring',
              disabled ? 'opacity-45 cursor-not-allowed' : 'cursor-pointer',
            ].join(' ')}
          >
            <span
              className={[
                'flex items-center justify-center shrink-0 w-6 h-6 border-2 transition',
                multiple ? 'rounded-md' : 'rounded-full',
                isSelected ? 'bg-brand border-brand text-white' : 'border-edge text-transparent',
              ].join(' ')}
            >
              {multiple ? (
                <IconCheck className="w-4 h-4" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-white" />
              )}
            </span>
            <span className="text-[15px] leading-snug">{opt.label}</span>
          </button>
        );
      })}
      {atCap && (
        <p className="text-xs text-muted mt-0.5">
          You can select up to {question.maxSelections}.
        </p>
      )}
    </div>
  );
}

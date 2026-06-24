import type { ReactNode } from 'react';
import type { Survey } from '../survey/types';
import { Button } from '../components/Button';
import { IconCheckCircle, IconShield, IconGift } from '../components/Icon';
import { ScreenLayout } from './Shell';

// Completion / thank-you screen (spec §2.2, §4.4).
export function ThankYou({
  survey,
  enteredPrizeDraw,
  onFinish,
}: {
  survey: Survey;
  enteredPrizeDraw: boolean;
  onFinish: () => void;
}) {
  return (
    <ScreenLayout
      footer={
        <div className="flex flex-col gap-3">
          <Button onClick={onFinish}>Finish</Button>
          <button
            type="button"
            onClick={onFinish}
            className="text-sm text-muted hover:text-ink rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
          >
            Return to my dashboard
          </button>
        </div>
      }
    >
      <div className="text-center pt-4">
        <span className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-soft text-brand">
          <IconCheckCircle className="w-9 h-9" />
          {/* Decorative sparkles (matches the supplied thank-you mockup) */}
          <Sparkle className="-top-1 -left-2 w-3 h-3" />
          <Sparkle className="-top-2 right-0 w-2.5 h-2.5" />
          <Sparkle className="top-1 -right-3 w-3 h-3" />
          <Sparkle className="-bottom-1 -left-3 w-2.5 h-2.5" />
          <Sparkle className="bottom-0 -right-2 w-2 h-2" />
        </span>
        <h2 className="mt-4 text-2xl font-bold text-ink">Thank you!</h2>
        <p className="mt-2 text-[15px] text-muted leading-relaxed">{survey.thankYou}</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Note icon={<IconShield className="w-5 h-5" />}>
          Your responses are confidential and will only be used for research purposes.
        </Note>
        {enteredPrizeDraw && (
          <Note icon={<IconGift className="w-5 h-5" />} highlight>
            You've been entered into the prize draw. If you win, we'll be in touch using the
            contact details you provided.
          </Note>
        )}
      </div>
    </ScreenLayout>
  );
}

function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`absolute text-brand-ring ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l2.2 6.6L21 11l-6.8 2.4L12 20l-2.2-6.6L3 11l6.8-2.4z"
        fill="currentColor"
      />
    </svg>
  );
}

function Note({
  icon,
  children,
  highlight = false,
}: {
  icon: ReactNode;
  children: ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        'flex items-start gap-3 rounded-card p-4 text-sm leading-relaxed',
        highlight ? 'bg-brand-soft text-ink' : 'bg-surface-muted text-muted',
      ].join(' ')}
    >
      <span className="shrink-0 text-brand mt-0.5">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

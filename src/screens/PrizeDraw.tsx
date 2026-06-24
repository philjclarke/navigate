import { useState } from 'react';
import { Button } from '../components/Button';
import {
  IconGift,
  IconMail,
  IconPhone,
  IconShield,
  IconArrowRight,
  IconArrowLeft,
  IconClose,
} from '../components/Icon';
import { ProgressBar } from '../components/ProgressBar';
import { ScreenLayout } from './Shell';

export interface PrizeContact {
  email?: string;
  mobile?: string;
}

// Optional prize-draw contact screen (spec §2.5). Shown after the questions
// and before the thank-you. Contact details are kept separate from answers.
export function PrizeDraw({
  totalSteps,
  onBack,
  onExit,
  onContinue,
  onSkip,
}: {
  totalSteps: number;
  onBack: () => void;
  onExit: () => void;
  onContinue: (contact: PrizeContact) => void;
  onSkip: () => void;
}) {
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const field =
    'w-full rounded-card border border-edge bg-surface pl-11 pr-4 py-3 text-[15px] text-ink ' +
    'placeholder:text-muted/70 transition focus:outline-none focus:border-brand focus-visible:ring-3 focus-visible:ring-brand-ring';

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
            <button
              type="button"
              aria-label="Exit survey"
              onClick={onExit}
              className="text-muted hover:text-ink p-1 -mr-1 rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              <IconClose className="w-5 h-5" />
            </button>
          </div>
          <ProgressBar current={totalSteps} total={totalSteps} />
        </div>
      }
      footer={
        <div className="flex flex-col gap-3">
          <Button onClick={() => onContinue({ email: email || undefined, mobile: mobile || undefined })}>
            Continue
            <IconArrowRight className="w-4 h-4" />
          </Button>
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-muted hover:text-ink rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
          >
            No thanks, I don't want to enter
          </button>
        </div>
      }
    >
      <div className="text-center">
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-soft text-brand">
          <IconGift className="w-6 h-6" />
        </span>
        <h2 className="mt-3 text-lg font-semibold text-ink">Prize draw entry (optional)</h2>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          This survey includes a prize draw. If you'd like to be contacted if you win, please
          provide an email address or mobile number.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <label className="block">
          <span className="text-sm font-medium text-ink">Email address (optional)</span>
          <div className="relative mt-1.5">
            <IconMail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className={field}
            />
          </div>
        </label>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-edge" />
          OR
          <span className="h-px flex-1 bg-edge" />
        </div>

        <label className="block">
          <span className="text-sm font-medium text-ink">Mobile number (optional)</span>
          <div className="relative mt-1.5">
            <IconPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter your mobile number"
              className={field}
            />
          </div>
        </label>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-card bg-surface-muted p-3 text-xs text-muted leading-relaxed">
        <IconShield className="w-4 h-4 shrink-0 mt-0.5 text-brand" />
        Your details will only be used for contacting the winner and will not be linked to your
        answers.
      </p>
    </ScreenLayout>
  );
}

import type { InvitationHighlight, Survey } from '../survey/types';
import { ResearchIllustration } from '../components/Illustration';
import {
  IconClock,
  IconShield,
  IconGift,
  IconClose,
  IconMegaphone,
  IconArrowRight,
  IconLock,
} from '../components/Icon';

// Login-triggered invitation (spec §2.1) — replicates the supplied
// "intro screen.jpg": landscape illustrated modal with three actions.
// Always presented as a centered modal (the supplied design), independent of
// the survey shell mode. Reflows to a single column on mobile.
export function Invitation({
  survey,
  onTakePart,
  onRemind,
  onDecline,
  contained = false,
}: {
  survey: Survey;
  onTakePart: () => void;
  onRemind: () => void;
  onDecline: () => void;
  contained?: boolean;
}) {
  return (
    <div
      className={`${contained ? 'absolute' : 'fixed'} inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:p-6`}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${survey.title} — invitation`}
        className="relative w-full max-w-3xl max-h-[calc(100%-1rem)] overflow-y-auto bg-surface rounded-sheet shadow-2xl"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onDecline}
          className="absolute right-4 top-4 z-10 text-muted hover:text-ink p-1 rounded focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
        >
          <IconClose className="w-5 h-5" />
        </button>

        {/* Top: content + illustration */}
        <div className="px-6 pt-7 sm:px-8 sm:pt-8">
          <div className="grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <span className="flex items-center justify-center w-11 h-11 rounded-full bg-brand-soft text-brand">
                <IconMegaphone className="w-6 h-6" />
              </span>

              <h1 className="mt-4 text-2xl font-extrabold leading-tight text-[#143a44]">
                {survey.introHeading ?? survey.title}
              </h1>
              <p className="mt-2 text-[15px] text-muted leading-relaxed">{survey.introText}</p>

              <ul className="mt-5 flex flex-col gap-4">
                {(survey.highlights ?? []).map((h) => (
                  <Highlight key={h.title} highlight={h} />
                ))}
              </ul>
            </div>

            <div className="hidden md:block">
              <ResearchIllustration className="w-full h-auto" />
            </div>
          </div>
        </div>

        {/* Action bar */}
        <div className="mt-7 bg-surface-muted px-6 py-5 sm:px-8">
          <p className="text-center text-sm font-semibold text-ink">Would you like to take part?</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            <button
              type="button"
              onClick={onTakePart}
              className="inline-flex items-center justify-center gap-2 rounded-[5px] bg-brand px-5 py-3 text-[15px] font-semibold text-white transition hover:bg-brand-hover cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              Take part now
              <IconArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onRemind}
              className="inline-flex items-center justify-center gap-2 rounded-[5px] border border-brand bg-surface px-5 py-3 text-[15px] font-semibold text-brand transition hover:bg-brand-soft cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              <IconClock className="w-4 h-4" />
              Remind me next time
            </button>
            <button
              type="button"
              onClick={onDecline}
              className="inline-flex items-center justify-center rounded-[5px] border border-edge bg-surface px-5 py-3 text-[15px] font-semibold text-ink transition hover:border-brand-ring cursor-pointer focus:outline-none focus-visible:ring-3 focus-visible:ring-brand-ring"
            >
              No thanks
            </button>
          </div>
        </div>

        {/* Footer note */}
        <p className="flex items-center justify-center gap-1.5 px-6 py-4 text-center text-xs text-muted">
          <IconLock className="w-3.5 h-3.5" />
          Participation is voluntary. You can choose not to take part.
        </p>
      </div>
    </div>
  );
}

const ICONS = { clock: IconClock, shield: IconShield, gift: IconGift };

function Highlight({ highlight }: { highlight: InvitationHighlight }) {
  const Icon = ICONS[highlight.icon];
  const isGift = highlight.icon === 'gift';
  return (
    <li className="flex items-start gap-3">
      <span
        className="flex items-center justify-center shrink-0 w-9 h-9 rounded-full"
        style={
          isGift
            ? { background: '#fff3df', color: 'var(--warning)' }
            : { background: 'var(--brand-soft)', color: 'var(--brand)' }
        }
      >
        <Icon className="w-5 h-5" />
      </span>
      <span className="leading-snug">
        <span className="block text-sm font-semibold text-ink">{highlight.title}</span>
        <span className="block text-sm text-muted">{highlight.text}</span>
      </span>
    </li>
  );
}

import { useEffect, useState } from 'react';
import { demoSurvey } from './survey/demoSurvey';
import { SurveyFlow, type CloseReason } from './screens/SurveyFlow';
import { DesktopFrame } from './screens/DesktopFrame';
import { Button } from './components/Button';
import { IconMegaphone, IconClock, IconGift, IconCheckCircle } from './components/Icon';
import type { ShellMode } from './screens/Shell';

export default function App() {
  const [open, setOpen] = useState(true);
  const [mode, setMode] = useState<ShellMode>('fullscreen');
  const [status, setStatus] = useState<CloseReason | null>(null);
  const isDesktop = useIsDesktop();

  const handleClose = (reason: CloseReason) => {
    setOpen(false);
    setStatus(reason);
  };

  const launch = () => {
    setStatus(null);
    setOpen(true);
  };

  const survey = open && (
    <SurveyFlow survey={demoSurvey} mode={mode} contained={isDesktop} onClose={handleClose} />
  );

  return (
    <div className="flex h-screen flex-col">
      <DemoToolbar mode={mode} setMode={setMode} onRelaunch={launch} open={open} />

      <div className="min-h-0 flex-1">
        {isDesktop ? (
          <DesktopFrame overlay={survey}>
            {status !== 'declined' && (
              <RelaunchPanel survey={demoSurvey} status={status} open={open} onLaunch={launch} />
            )}
            <img
              src="/mock/homepage-content.jpg"
              alt="Student homepage"
              className={`w-full rounded-lg bg-white shadow-sm ${status !== 'declined' ? 'mt-5' : ''}`}
            />
          </DesktopFrame>
        ) : (
          <div className="h-full overflow-auto">
            <MobileDashboard survey={demoSurvey} status={status} open={open} onLaunch={launch} />
            {survey}
          </div>
        )}
      </div>
    </div>
  );
}

// Re-render layout when crossing the desktop breakpoint (Tailwind lg = 1024px).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return isDesktop;
}

// ── Relaunch / call-to-action panel (sits above the homepage content) ───────
function RelaunchPanel({
  survey,
  status,
  open,
  onLaunch,
}: {
  survey: typeof demoSurvey;
  status: CloseReason | null;
  open: boolean;
  onLaunch: () => void;
}) {
  const completed = status === 'completed';
  return (
    <section className="flex flex-col gap-4 rounded-xl border border-brand/25 bg-surface p-5 shadow-sm sm:flex-row sm:items-center">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
        {completed ? <IconCheckCircle className="h-7 w-7" /> : <IconMegaphone className="h-6 w-6" />}
      </span>

      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold text-ink">
          {completed ? 'Thanks for completing the survey' : survey.title}
        </h2>
        <p className="mt-0.5 text-sm text-muted">
          {completed
            ? 'Your responses have been recorded. You can take it again to preview the flow.'
            : 'We’d like your views to help shape how students are supported.'}
        </p>
        {!completed && (
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted">
            {survey.estimatedTime && (
              <span className="inline-flex items-center gap-1">
                <IconClock className="h-3.5 w-3.5 text-brand" />
                Takes {survey.estimatedTime}
              </span>
            )}
            {survey.prizeDraw?.enabled && (
              <span className="inline-flex items-center gap-1">
                <IconGift className="h-3.5 w-3.5 text-brand" />
                Enter the prize draw to win £100
              </span>
            )}
          </div>
        )}
      </div>

      <Button onClick={onLaunch} className="shrink-0" disabled={open}>
        {completed ? 'Take it again' : 'Take the survey'}
      </Button>
    </section>
  );
}

// ── Prototype-only demo chrome (not part of the product) ───────────────────
function DemoToolbar({
  mode,
  setMode,
  onRelaunch,
  open,
}: {
  mode: ShellMode;
  setMode: (m: ShellMode) => void;
  onRelaunch: () => void;
  open: boolean;
}) {
  return (
    <div className="flex shrink-0 flex-wrap items-center gap-3 bg-[#15242b] px-4 py-2.5 text-white">
      <span className="text-xs font-semibold uppercase tracking-wide text-white/60">Prototype</span>
      <div className="flex rounded-lg bg-white/10 p-0.5 text-sm">
        {(['fullscreen', 'modal'] as ShellMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={[
              'rounded-md px-3 py-1 transition',
              mode === m ? 'bg-white text-[#15242b] font-semibold' : 'text-white/80 hover:text-white',
            ].join(' ')}
          >
            {m === 'fullscreen' ? 'Full screen' : 'Modal'}
          </button>
        ))}
      </div>
      <button
        onClick={onRelaunch}
        disabled={open}
        className="ml-auto rounded-md bg-white/10 px-3 py-1 text-sm hover:bg-white/20 disabled:opacity-40"
      >
        {open ? 'Survey open' : 'Relaunch invitation'}
      </button>
    </div>
  );
}

function MobileDashboard({
  survey,
  status,
  open,
  onLaunch,
}: {
  survey: typeof demoSurvey;
  status: CloseReason | null;
  open: boolean;
  onLaunch: () => void;
}) {
  return (
    <div className="mx-auto max-w-md">
      <img src="/mock/mobile-nav.jpg" alt="Navigate — Jason Gould" className="block w-full" />

      <div className="px-5 py-6">
        <h1 className="text-2xl font-bold text-ink">Welcome back Jason</h1>
        <p className="mt-1 text-muted">Here’s what’s happening on your dashboard today.</p>

        {status !== 'declined' && (
          <div className="mt-5">
            <RelaunchPanel survey={survey} status={status} open={open} onLaunch={onLaunch} />
          </div>
        )}

        <div className="mt-6 grid grid-cols-2 gap-3">
          {['My courses', 'Career hub', 'Timetable', 'Messages'].map((t) => (
            <div key={t} className="rounded-card border border-edge bg-surface p-4 text-sm font-medium text-ink">
              {t}
              <div className="mt-6 h-1.5 w-12 rounded-full bg-edge" />
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-card border border-edge bg-surface p-4">
          <div className="h-3 w-1/2 rounded bg-edge" />
          <div className="mt-3 h-2 w-full rounded bg-edge/70" />
          <div className="mt-2 h-2 w-5/6 rounded bg-edge/70" />
        </div>
      </div>
    </div>
  );
}

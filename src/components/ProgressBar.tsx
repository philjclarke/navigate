// Segmented progress bar (matches the supplied mockups) + percent label.
export function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progress: ${pct}% complete`}
      >
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={[
              'h-1.5 flex-1 rounded-full transition-colors',
              i < current ? 'bg-brand' : 'bg-edge',
            ].join(' ')}
          />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted">{pct}% complete</p>
    </div>
  );
}

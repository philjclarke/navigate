import type { ReactNode } from 'react';

// The two presentations we want to compare, sharing one survey engine:
//  • 'fullscreen' — fills its container (mobile-first default)
//  • 'modal'      — centered card over a dimmed backdrop (desktop feel)
export type ShellMode = 'modal' | 'fullscreen';

export function Shell({
  mode,
  children,
  ariaLabel,
  contained = false,
}: {
  mode: ShellMode;
  children: ReactNode;
  ariaLabel: string;
  // contained = positioned within a `relative` parent (the platform content
  // area) instead of the whole window — so the sidebar/top bar stay visible.
  contained?: boolean;
}) {
  const pos = contained ? 'absolute' : 'fixed';

  const card =
    mode === 'fullscreen'
      ? 'flex flex-col w-full h-full max-w-md mx-auto bg-surface'
      : 'flex flex-col w-full max-w-md max-h-[calc(100%-2rem)] bg-surface rounded-sheet shadow-2xl overflow-hidden';

  const overlay =
    mode === 'fullscreen'
      ? `${pos} inset-0 z-50 bg-surface`
      : `${pos} inset-0 z-50 flex items-center justify-center bg-black/40 p-4`;

  return (
    <div className={overlay}>
      <div role="dialog" aria-modal="true" aria-label={ariaLabel} className={card}>
        {children}
      </div>
    </div>
  );
}

// Shared internal layout: scrollable body between an optional sticky header
// and an optional sticky footer. Used by every screen so both shells behave
// identically.
export function ScreenLayout({
  header,
  footer,
  children,
}: {
  header?: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
}) {
  return (
    <>
      {header && <div className="shrink-0 px-5 pt-5 pb-3 border-b border-edge/60">{header}</div>}
      <div className="flex-1 overflow-y-auto px-5 py-5">{children}</div>
      {footer && <div className="shrink-0 px-5 py-4 border-t border-edge/60 bg-surface">{footer}</div>}
    </>
  );
}

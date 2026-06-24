import type { ReactNode } from 'react';

// Desktop mock of the Navigate student platform. The survey renders inside the
// content area (via `overlay`) so the sidebar and top bar stay visible.
// Chrome is built from the supplied design assets:
//  • left sidebar  — bg #09b2fe + side-navigation.jpg
//  • top bar       — bg #00B5A6 + top-bar-logo.jpg (left) / top-bar-account.jpg (right)
export function DesktopFrame({
  children,
  overlay,
}: {
  children: ReactNode; // content of the page (relaunch panel + homepage image)
  overlay?: ReactNode; // the survey, positioned within the content area
}) {
  return (
    <div className="flex h-full">
      {/* Left navigation rail */}
      <aside className="w-20 shrink-0 overflow-hidden" style={{ background: '#09b2fe' }}>
        <img src="/mock/side-navigation.jpg" alt="Navigation" className="block w-full" />
      </aside>

      {/* Right column: top bar + content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header
          className="flex shrink-0 items-center justify-between"
          style={{ background: '#00B5A6', height: 70 }}
        >
          <img src="/mock/top-bar-logo.jpg" alt="The Education Company" className="h-full" />
          <img src="/mock/top-bar-account.jpg" alt="Jason Gould — account" className="h-full" />
        </header>

        {/* Content area: scrollable page + absolutely-positioned survey overlay */}
        <main className="relative flex-1 overflow-hidden">
          <div className="h-full overflow-auto bg-[#eef2f4] p-6">
            <div className="mx-auto w-full max-w-[1120px]">{children}</div>
          </div>
          {overlay}
        </main>
      </div>
    </div>
  );
}

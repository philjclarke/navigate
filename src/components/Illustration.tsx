// Flat vector illustration matching the supplied intro mockup: a student at a
// laptop with a plant, a soft teal backdrop and floating "research" badges.
// Uses the brand tokens so it re-themes with the rest of the app.
export function ResearchIllustration({ className }: { className?: string }) {
  const brand = 'var(--brand)';
  const brandSoft = 'var(--brand-soft)';
  const brandHover = 'var(--brand-hover)';
  const ring = 'var(--brand-ring)';

  return (
    <svg
      className={className}
      viewBox="0 0 360 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Illustration of a student taking part in research on a laptop"
    >
      {/* Soft background blob */}
      <path
        d="M70 120c-20 40-10 95 35 120 50 28 150 26 195-15 38-35 36-110-5-150-46-45-130-45-180-12-22 15-32 35-45 57z"
        fill={brandSoft}
      />

      {/* Scattered decorative dots */}
      <circle cx="58" cy="92" r="4" fill={ring} opacity="0.7" />
      <circle cx="300" cy="70" r="5" fill={ring} opacity="0.6" />
      <circle cx="330" cy="170" r="4" fill={ring} opacity="0.6" />
      <circle cx="92" cy="60" r="3" fill={ring} opacity="0.5" />
      <circle cx="48" cy="200" r="3" fill={ring} opacity="0.5" />

      {/* Floating badge: bar chart */}
      <g transform="translate(74 96)">
        <rect width="56" height="48" rx="12" fill="#ffffff" stroke={brandSoft} strokeWidth="2" />
        <rect x="13" y="26" width="7" height="12" rx="2" fill={ring} />
        <rect x="25" y="18" width="7" height="20" rx="2" fill={brand} />
        <rect x="37" y="10" width="7" height="28" rx="2" fill={brandHover} />
      </g>

      {/* Floating badge: checkmark */}
      <g transform="translate(250 70)">
        <circle cx="22" cy="22" r="22" fill="#ffffff" stroke={brandSoft} strokeWidth="2" />
        <path d="M13 22l6 6 11-12" stroke={brand} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* Floating badge: people */}
      <g transform="translate(288 128)">
        <rect width="50" height="44" rx="12" fill="#ffffff" stroke={brandSoft} strokeWidth="2" />
        <circle cx="19" cy="18" r="6" fill={brand} />
        <circle cx="33" cy="20" r="5" fill={ring} />
        <path d="M9 36c1-7 6-10 10-10s9 3 10 10" fill={brand} />
        <path d="M26 36c1-5 4-8 7-8s6 3 7 8" fill={ring} />
      </g>

      {/* Plant */}
      <g transform="translate(296 168)">
        <path d="M14 44c-6-10-7-22-2-30M14 44c5-9 9-18 6-30M14 44c-9-6-15-14-15-24" stroke={brand} strokeWidth="3" strokeLinecap="round" />
        <path d="M6 44h22l-3 22H9z" fill={brandHover} />
      </g>

      {/* Desk */}
      <rect x="120" y="232" width="170" height="10" rx="3" fill="#d9b48a" />
      <rect x="120" y="242" width="170" height="6" rx="3" fill="#c79a6c" />

      {/* Person */}
      <g transform="translate(150 96)">
        {/* hair back */}
        <path d="M22 36c0-22 16-34 33-34s33 12 33 36c0 16-2 30-6 44H28C24 66 22 52 22 36z" fill="#3a2c2a" />
        {/* face */}
        <path d="M40 44c0-15 9-24 22-24s22 9 22 24c0 17-10 27-22 27S40 61 40 44z" fill="#f1c9a5" />
        {/* hair front */}
        <path d="M38 40c2-18 14-26 24-26s22 7 24 24c-8-10-16-12-24-12s-16 3-24 14z" fill="#3a2c2a" />
        {/* neck */}
        <rect x="54" y="64" width="16" height="16" rx="6" fill="#e7b78f" />
        {/* hoodie body */}
        <path d="M28 138c0-34 16-58 34-58s34 22 34 58c0 6-1 10-1 10H29s-1-4-1-10z" fill={brand} />
        {/* hood collar */}
        <path d="M46 80c4 10 11 14 16 14s12-4 16-14c6 3 10 8 12 14-10 8-18 11-28 11s-18-3-28-11c2-6 6-11 12-14z" fill={brandHover} />
        {/* arm */}
        <path d="M30 116c-10 6-15 16-14 30 12 2 26 2 40 0l-2-22z" fill={brandHover} />
      </g>

      {/* Laptop */}
      <g transform="translate(168 196)">
        <rect x="0" y="0" width="92" height="56" rx="6" fill="#e9eef0" stroke="#cdd7da" strokeWidth="2" />
        <rect x="8" y="8" width="76" height="40" rx="3" fill={brandSoft} />
        <rect x="-8" y="56" width="108" height="10" rx="4" fill="#cdd7da" />
      </g>
    </svg>
  );
}

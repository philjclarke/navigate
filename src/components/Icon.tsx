// Shared icon set, backed by Font Awesome (free solid). We render the FA glyph
// data as inline SVG ourselves — no React wrapper component — which keeps the
// same exported names + `className` sizing API, inherits currentColor, and
// avoids the react-fontawesome/duplicate-React hook pitfalls.
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faChevronLeft,
  faChevronRight,
  faXmark,
  faClock,
  faShieldHalved,
  faGift,
  faEnvelope,
  faMobileScreenButton,
  faCircleCheck,
  faBullhorn,
  faLock,
} from '@fortawesome/free-solid-svg-icons';

type Props = { className?: string };

function FaIcon({ icon, className }: { icon: IconDefinition; className?: string }) {
  const [width, height, , , path] = icon.icon;
  const paths = Array.isArray(path) ? path : [path];
  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

export const IconCheck = ({ className }: Props) => <FaIcon icon={faCheck} className={className} />;
export const IconArrowLeft = ({ className }: Props) => <FaIcon icon={faChevronLeft} className={className} />;
export const IconArrowRight = ({ className }: Props) => <FaIcon icon={faChevronRight} className={className} />;
export const IconClose = ({ className }: Props) => <FaIcon icon={faXmark} className={className} />;
export const IconClock = ({ className }: Props) => <FaIcon icon={faClock} className={className} />;
export const IconShield = ({ className }: Props) => <FaIcon icon={faShieldHalved} className={className} />;
export const IconGift = ({ className }: Props) => <FaIcon icon={faGift} className={className} />;
export const IconMail = ({ className }: Props) => <FaIcon icon={faEnvelope} className={className} />;
export const IconPhone = ({ className }: Props) => <FaIcon icon={faMobileScreenButton} className={className} />;
export const IconCheckCircle = ({ className }: Props) => <FaIcon icon={faCircleCheck} className={className} />;
export const IconLock = ({ className }: Props) => <FaIcon icon={faLock} className={className} />;
export const IconMegaphone = ({ className }: Props) => <FaIcon icon={faBullhorn} className={className} />;

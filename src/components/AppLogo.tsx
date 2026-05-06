// components/AppLogo.tsx
// SocDocLoc wordmark — padlock icon + optional text label.
// Brand concept: Society · Document · Locker — icon is a clean padlock.
// Renders using currentColor so it inherits text color from the parent.

interface AppLogoProps {
  size?: number
  showText?: boolean
  layout?: 'row' | 'column'
  iconColor?: 'inherit' | 'primary'
  className?: string
}

export function AppLogo({
  size      = 32,
  showText  = true,
  layout    = 'row',
  iconColor = 'inherit',
  className = '',
}: AppLogoProps) {
  const isColumn = layout === 'column'

  return (
    <div
      className={[
        'flex items-center',
        isColumn ? 'flex-col gap-3' : 'flex-row gap-2',
        className,
      ].join(' ')}
    >
      <LockerIcon
        size={size}
        color={iconColor === 'primary' ? 'var(--color-primary)' : 'currentColor'}
      />

      {showText && (
        <span
          className={[
            'font-semibold tracking-tight leading-none select-none',
            isColumn ? 'text-xl' : size >= 28 ? 'text-[17px]' : 'text-sm',
          ].join(' ')}
        >
          SocDocLoc
        </span>
      )}
    </div>
  )
}

interface LockerIconProps {
  size:  number
  color: string
}

function LockerIcon({ size, color }: LockerIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ color }}
    >
      {/* Shackle */}
      <path
        d="M13 17V11.5A5 5 0 0 1 23 11.5V17"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lock body */}
      <rect
        x="6.5" y="16.5" width="23" height="14" rx="3.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />

      {/* Document lines */}
      <line x1="9.5" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.35" />
      <line x1="9.5" y1="24" x2="14.5" y2="24" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.25" />

      {/* Keyhole */}
      <circle cx="22" cy="22" r="2.2" fill="currentColor" opacity="0.9" />
      <line x1="22" y1="24.1" x2="22" y2="27" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
    </svg>
  )
}

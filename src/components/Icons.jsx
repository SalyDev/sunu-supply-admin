const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
}

function Icon({ size = 16, children, ...props }) {
  return (
    <svg width={size} height={size} {...base} {...props}>
      {children}
    </svg>
  )
}

export const DashboardIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
  </Icon>
)

export const OrdersIcon = (p) => (
  <Icon {...p}>
    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
  </Icon>
)

export const TagIcon = (p) => (
  <Icon {...p}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </Icon>
)

export const UsersIcon = (p) => (
  <Icon {...p}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </Icon>
)

export const CartIcon = (p) => (
  <Icon {...p}>
    <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
  </Icon>
)

export const TrendIcon = (p) => (
  <Icon {...p}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
  </Icon>
)

export const DollarIcon = (p) => (
  <Icon {...p}>
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
  </Icon>
)

export const SearchIcon = (p) => (
  <Icon size={14} strokeWidth={2.5} stroke="#3F4F43" {...p}>
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
  </Icon>
)

export const ChevronRight = (p) => (
  <Icon size={14} strokeWidth={2.5} {...p}><path d="M9 18l6-6-6-6" /></Icon>
)

export const ChevronLeft = (p) => (
  <Icon size={14} strokeWidth={2.5} {...p}><path d="M15 18l-6-6 6-6" /></Icon>
)

export const ArrowLeft = (p) => (
  <Icon size={14} strokeWidth={2.5} {...p}><path d="M19 12H5M12 19l-7-7 7-7" /></Icon>
)

export const CheckIcon = (p) => (
  <Icon size={12} strokeWidth={3} {...p}><polyline points="20 6 9 17 4 12" /></Icon>
)

export const PrintIcon = (p) => (
  <Icon size={13} {...p}>
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </Icon>
)

export const PhoneIcon = (p) => (
  <Icon size={13} {...p}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 12a19.79 19.79 0 01-3.07-8.67A2 2 0 012.7 1.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.88 9.44a16 16 0 006.68 6.68l1.62-1.07a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
  </Icon>
)

export const PinIcon = (p) => (
  <Icon size={14} {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </Icon>
)

export function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none">
      <circle cx="46" cy="52" r="20" fill="#E2553B" />
      <path d="M46 32 C44 26 48 22 53 22" stroke="#9BD36A" strokeWidth="4" strokeLinecap="round" />
      <path d="M70 58 C66 36 80 22 98 20 C100 40 90 56 70 58 Z" fill="#9BD36A" />
      <path d="M12 60 H108 C108 88 86 106 60 106 C34 106 12 88 12 60 Z" fill="#F5F0E3" />
      <path d="M28 76 H92" stroke="#1F5E3B" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

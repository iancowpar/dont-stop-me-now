import type { SVGProps } from 'react'

type FunnelVariant = 'deep' | 'mid' | 'cream'

const palette: Record<FunnelVariant, { rim: string; body: string; floor: string; edge: string }> = {
  deep: { rim: '#5180E8', body: '#3960DC', floor: '#1F44B0', edge: '#1A3FA0' },
  mid: { rim: '#7AA0EE', body: '#5689E8', floor: '#2E5BC2', edge: '#2A55C2' },
  cream: { rim: '#FBF3DD', body: '#EFE4C2', floor: '#D6C492', edge: '#C9B987' },
}

interface FunnelProps extends SVGProps<SVGSVGElement> {
  width: number
  height: number
  variant: FunnelVariant
  /** how far the trapezoid sides angle in at the bottom, as fraction of width */
  taper?: number
  /** vertical extent of the top/bottom rim ellipses */
  rim?: number
}

/**
 * A 3D-ish bucket. Top rim is a full ellipse (so the back of the rim is visible
 * behind whatever sits inside), the body is a tapered trapezoid, and the floor
 * is a half-ellipse curving down at the bottom.
 */
export function Funnel({
  width,
  height,
  variant,
  taper = 0.12,
  rim = 14,
  ...rest
}: FunnelProps) {
  const c = palette[variant]
  const w = width
  const h = height
  const cx = w / 2
  const inset = w * taper

  const bodyPath = `M 0 ${rim} L ${w} ${rim} L ${w - inset} ${h - rim} L ${inset} ${h - rim} Z`
  const floorPath = `M ${inset} ${h - rim} A ${(w - inset * 2) / 2} ${rim} 0 0 0 ${w - inset} ${h - rim} L ${w - inset} ${h - rim} A ${(w - inset * 2) / 2} ${rim} 0 0 1 ${inset} ${h - rim} Z`
  const frontRimPath = `M 0 ${rim} A ${cx} ${rim} 0 0 0 ${w} ${rim}`
  const innerRimHighlight = `M ${w * 0.06} ${rim - 2} Q ${cx} ${rim * 0.3} ${w * 0.94} ${rim - 2}`

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      aria-hidden="true"
      {...rest}
    >
      {/* back of top rim ellipse (sits behind the body) */}
      <ellipse cx={cx} cy={rim} rx={cx} ry={rim} fill={c.edge} />
      {/* main body trapezoid */}
      <path d={bodyPath} fill={c.body} />
      {/* front of top rim — slight darker arc closing the ellipse forward */}
      <path d={frontRimPath} fill={c.rim} stroke={c.edge} strokeWidth={1} />
      {/* inner rim highlight (suggests the inside of the bucket) */}
      <path
        d={innerRimHighlight}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1}
      />
      {/* darker floor curve at bottom */}
      <path d={floorPath} fill={c.floor} />
      {/* outline accents for hand-drawn definition */}
      <path
        d={bodyPath}
        fill="none"
        stroke={c.edge}
        strokeWidth={1.25}
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface UpArrowProps extends SVGProps<SVGSVGElement> {
  size?: number
}

/**
 * A bold block-arrow pointing up, used between funnels to suggest flow.
 * Filled cream with a navy outline for contrast on the cream backdrop.
 */
export function UpArrow({ size = 36, ...rest }: UpArrowProps) {
  const w = size
  const h = size * 0.86
  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 36 32"
      aria-hidden="true"
      {...rest}
    >
      <path
        d="M 18 3 L 33 19 L 25 19 L 25 29 L 11 29 L 11 19 L 3 19 Z"
        fill="#F4EEDC"
        stroke="#0F2A5E"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />
    </svg>
  )
}

interface TimelineShaftProps extends SVGProps<SVGSVGElement> {
  height: number
}

/**
 * Vertical timeline shaft for the right column. An arrow head pointing up at
 * the top with a dashed line running down its length, evoking time accumulating
 * upward (Week 1 → Month 3).
 */
export function TimelineShaft({ height, ...rest }: TimelineShaftProps) {
  return (
    <svg
      width={14}
      height={height}
      viewBox={`0 0 14 ${height}`}
      aria-hidden="true"
      {...rest}
    >
      <path
        d={`M 7 4 L 13 12 L 8 12 L 8 ${height - 4} L 6 ${height - 4} L 6 12 L 1 12 Z`}
        fill="#0F2A5E"
        opacity={0.85}
      />
    </svg>
  )
}

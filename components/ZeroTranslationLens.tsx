import type { SVGProps } from 'react'

type LensVariant = 'deep' | 'mid' | 'cream'

const lensPalette: Record<LensVariant, { from: string; to: string; highlight: string }> = {
  deep: { from: '#4470DC', to: '#1A3FA0', highlight: 'rgba(255,255,255,0.32)' },
  mid: { from: '#6E94E6', to: '#2D58C3', highlight: 'rgba(255,255,255,0.32)' },
  cream: { from: '#F5EBCF', to: '#D9C892', highlight: 'rgba(255,255,255,0.55)' },
}

interface LensProps extends Omit<SVGProps<SVGSVGElement>, 'width' | 'height'> {
  id: string
  width: number
  height: number
  variant: LensVariant
}

/**
 * A biconvex compression lens. Two quadratic arcs meet at pointed ends;
 * a subtle highlight arc near the top suggests the glass surface.
 */
export function Lens({ id, width, height, variant, ...rest }: LensProps) {
  const { from, to, highlight } = lensPalette[variant]
  const cx = width / 2
  const cy = height / 2
  const lensPath = `M 0 ${cy} Q ${cx} 0 ${width} ${cy} Q ${cx} ${height} 0 ${cy} Z`
  const highlightPath = `M ${width * 0.16} ${height * 0.26} Q ${cx} ${height * 0.08} ${width * 0.84} ${height * 0.26}`
  const rimPath = `M ${width * 0.18} ${height * 0.78} Q ${cx} ${height * 0.96} ${width * 0.82} ${height * 0.78}`

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      {...rest}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={from} />
          <stop offset="1" stopColor={to} />
        </linearGradient>
      </defs>
      <path d={lensPath} fill={`url(#${id})`} />
      <path
        d={highlightPath}
        stroke={highlight}
        strokeWidth={1.6}
        fill="none"
        strokeLinecap="round"
      />
      <path
        d={rimPath}
        stroke="rgba(0,0,0,0.18)"
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface CompressionRaysProps extends SVGProps<SVGSVGElement> {
  /** width of the lower lens at this junction */
  lowerSpan: number
  /** width of the upper lens at this junction */
  upperSpan: number
  height?: number
}

/**
 * Two dashed lines converging from the wider lower lens up to the narrower
 * upper lens, suggesting a compression beam between optical elements.
 */
export function CompressionRays({
  lowerSpan,
  upperSpan,
  height = 18,
  ...rest
}: CompressionRaysProps) {
  const w = Math.max(lowerSpan, upperSpan)
  const lowerInset = (w - lowerSpan) / 2
  const upperInset = (w - upperSpan) / 2

  return (
    <svg
      width={w}
      height={height}
      viewBox={`0 0 ${w} ${height}`}
      aria-hidden="true"
      {...rest}
    >
      <line
        x1={lowerInset + lowerSpan * 0.12}
        y1={height}
        x2={upperInset + upperSpan * 0.12}
        y2={0}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="2 3"
        opacity={0.5}
      />
      <line
        x1={lowerInset + lowerSpan * 0.88}
        y1={height}
        x2={upperInset + upperSpan * 0.88}
        y2={0}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="2 3"
        opacity={0.5}
      />
      <line
        x1={w / 2}
        y1={2}
        x2={w / 2}
        y2={height - 2}
        stroke="currentColor"
        strokeWidth={1}
        strokeDasharray="1 3"
        opacity={0.35}
      />
    </svg>
  )
}

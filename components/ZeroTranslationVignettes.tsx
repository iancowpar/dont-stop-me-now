import type { SVGProps } from 'react'

type VignetteProps = SVGProps<SVGSVGElement>

/**
 * Layer 1 — Shared Foundation.
 * A folder fanning out via tree-connector lines to a stack of files. The
 * routing card lives in {@link RoutingCard} so it can be positioned outside
 * the bucket's right edge.
 */
export function LayerOneVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 220 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M 8 38 V 26 Q 8 18 16 18 H 40 L 52 30 H 90 Q 98 30 98 38 V 110 Q 98 118 90 118 H 16 Q 8 118 8 110 Z"
          fill="currentColor"
          fillOpacity={0.18}
        />
        <path d="M 8 46 H 98" />
      </g>

      <path
        d="M 98 70 H 122 M 122 38 V 102 M 122 38 H 146 M 122 70 H 146 M 122 102 H 146"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      />

      <g stroke="currentColor" strokeWidth={2} fill="currentColor" fillOpacity={0.22}>
        <rect x="146" y="26" width="48" height="26" rx="3" />
        <rect x="146" y="58" width="48" height="26" rx="3" />
        <rect x="146" y="90" width="48" height="26" rx="3" />
      </g>

      <g stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" opacity={0.85}>
        <line x1="154" y1="36" x2="186" y2="36" />
        <line x1="154" y1="42" x2="178" y2="42" />
        <line x1="154" y1="68" x2="186" y2="68" />
        <line x1="154" y1="74" x2="180" y2="74" />
        <line x1="154" y1="100" x2="186" y2="100" />
        <line x1="154" y1="106" x2="174" y2="106" />
      </g>
    </svg>
  )
}

/**
 * The CLAUDE.md routing card — a paper-style card with a labeled header, a
 * subtitle, body lines, and a compass/star marker. Designed to sit on top of
 * (and overhang) the Layer 1 funnel so it reads as a separate artifact.
 */
export function RoutingCard(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 140 176"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <rect
        x="2"
        y="2"
        width="136"
        height="172"
        rx="6"
        fill="#F4EEDC"
        stroke="#0F2A5E"
        strokeWidth={2.4}
      />
      <rect x="14" y="14" width="86" height="14" rx="3" fill="#0F2A5E" />
      <text
        x="57"
        y="24.5"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={9}
        fontWeight={700}
        fill="#F4EEDC"
        letterSpacing="0.08em"
      >
        CLAUDE.md
      </text>
      <text
        x="70"
        y="50"
        textAnchor="middle"
        fontFamily="Cormorant Garamond, Georgia, serif"
        fontSize={15}
        fontWeight={600}
        fontStyle="italic"
        fill="#0F2A5E"
      >
        Routing Table
      </text>
      <line x1="14" y1="62" x2="126" y2="62" stroke="#0F2A5E" strokeOpacity={0.4} strokeWidth={1.2} />
      <line x1="14" y1="70" x2="108" y2="70" stroke="#0F2A5E" strokeOpacity={0.4} strokeWidth={1.2} />
      <line x1="14" y1="78" x2="120" y2="78" stroke="#0F2A5E" strokeOpacity={0.4} strokeWidth={1.2} />
      <circle cx="70" cy="118" r="22" fill="none" stroke="#0F2A5E" strokeWidth={2.2} />
      <path
        d="M 70 100 L 78 118 L 70 136 L 62 118 Z"
        fill="#0F2A5E"
        fillOpacity={0.85}
      />
      <circle cx="70" cy="118" r="2.4" fill="#F4EEDC" />
      <line x1="14" y1="156" x2="92" y2="156" stroke="#0F2A5E" strokeOpacity={0.35} strokeWidth={1.2} />
      <line x1="14" y1="164" x2="68" y2="164" stroke="#0F2A5E" strokeOpacity={0.35} strokeWidth={1.2} />
    </svg>
  )
}

/**
 * Layer 2 — Shared Language.
 * Two figures (head + shoulders) facing each other, each carrying an "AI"
 * speech bubble; a double-headed handoff arrow runs between them. 320×140.
 */
export function LayerTwoVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="40" cy="86" r="16" fill="currentColor" fillOpacity={0.25} />
        <path
          d="M 14 134 Q 14 110 40 110 Q 66 110 66 134"
          fill="currentColor"
          fillOpacity={0.25}
        />
        <path
          d="M 8 8 H 64 Q 72 8 72 16 V 38 Q 72 46 64 46 H 44 L 36 56 V 46 H 16 Q 8 46 8 38 V 16 Q 8 8 16 8 Z"
          fill="currentColor"
          fillOpacity={0.32}
        />
      </g>
      <text
        x="40"
        y="34"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={16}
        fontWeight={700}
        fill="currentColor"
      >
        AI
      </text>

      <g
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M 88 80 H 232" />
        <path d="M 96 72 L 88 80 L 96 88" />
        <path d="M 224 72 L 232 80 L 224 88" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="280" cy="86" r="16" fill="currentColor" fillOpacity={0.25} />
        <path
          d="M 254 134 Q 254 110 280 110 Q 306 110 306 134"
          fill="currentColor"
          fillOpacity={0.25}
        />
        <path
          d="M 256 8 H 312 Q 320 8 320 16 V 38 Q 320 46 312 46 H 292 L 284 56 V 46 H 264 Q 256 46 256 38 V 16 Q 256 8 264 8 Z"
          fill="currentColor"
          fillOpacity={0.32}
        />
      </g>
      <text
        x="288"
        y="34"
        textAnchor="middle"
        fontFamily="JetBrains Mono, monospace"
        fontSize={16}
        fontWeight={700}
        fill="currentColor"
      >
        AI
      </text>
    </svg>
  )
}

/**
 * Layer 3 — Shared Standards.
 * An open hand transitioning to a fist (discipline), beside a code window with
 * a green verifying checkmark badge. 320×140.
 */
export function LayerThreeVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity={0.2}
      >
        <path
          d="M 8 92 V 60 Q 8 52 16 52 Q 24 52 24 60 V 80
             M 24 60 V 44 Q 24 36 32 36 Q 40 36 40 44 V 80
             M 40 48 V 32 Q 40 24 48 24 Q 56 24 56 32 V 80
             M 56 44 V 50 Q 56 42 64 42 Q 72 42 72 50 V 92
             Q 72 118 48 124 H 32 Q 14 124 8 108 Z"
        />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        fill="none"
      >
        <path d="M 88 78 H 124" />
        <path d="M 116 70 L 124 78 L 116 86" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M 138 64 Q 138 46 168 46 Q 198 46 198 64 V 96 Q 198 120 170 124 H 152 Q 130 124 130 104 Z"
          fill="currentColor"
          fillOpacity={0.26}
        />
        <path
          d="M 148 64 H 188 M 148 78 H 188 M 148 92 H 188 M 148 106 H 188"
          stroke="currentColor"
          strokeOpacity={0.5}
          strokeWidth={1.5}
        />
      </g>

      <g transform="translate(220 22)">
        <rect
          x="0"
          y="0"
          width="92"
          height="74"
          rx="4"
          fill="currentColor"
          fillOpacity={0.2}
          stroke="currentColor"
          strokeWidth={2.2}
        />
        <line x1="0" y1="18" x2="92" y2="18" stroke="currentColor" strokeWidth={1.8} />
        <circle cx="10" cy="9" r="2.2" fill="currentColor" />
        <circle cx="18" cy="9" r="2.2" fill="currentColor" />
        <circle cx="26" cy="9" r="2.2" fill="currentColor" />
        <text
          x="46"
          y="54"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize={22}
          fontWeight={700}
          fill="currentColor"
        >
          {'</>'}
        </text>
        <circle
          cx="86"
          cy="72"
          r="14"
          fill="#5BD0A4"
          stroke="currentColor"
          strokeWidth={2.2}
        />
        <path
          d="M 79 72 L 84 77 L 92 67"
          stroke="#0F2A5E"
          strokeWidth={2.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

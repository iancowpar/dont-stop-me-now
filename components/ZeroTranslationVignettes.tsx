import type { SVGProps } from 'react'

type VignetteProps = SVGProps<SVGSVGElement>

/**
 * Layer 1 — Shared Foundation
 * A folder branching to a stack of files, plus a tilted "routing" card with a compass.
 */
export function LayerOneVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M6 22 V16 Q6 12 10 12 H22 L28 18 H46 Q50 18 50 22 V60 Q50 64 46 64 H10 Q6 64 6 60 Z"
          fill="currentColor"
          fillOpacity={0.18}
        />
        <path d="M6 26 H50" />
      </g>

      <path
        d="M50 38 H64 M64 22 V58 M64 22 H80 M64 38 H80 M64 54 H80"
        stroke="currentColor"
        strokeWidth={1.25}
        strokeLinecap="round"
        fill="none"
      />

      <g
        stroke="currentColor"
        strokeWidth={1.25}
        fill="currentColor"
        fillOpacity={0.16}
      >
        <rect x="80" y="14" width="28" height="16" rx="2" />
        <rect x="80" y="32" width="28" height="16" rx="2" />
        <rect x="80" y="50" width="28" height="16" rx="2" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={1}
        strokeLinecap="round"
        opacity={0.85}
      >
        <line x1="84" y1="20" x2="104" y2="20" />
        <line x1="84" y1="24" x2="100" y2="24" />
        <line x1="84" y1="38" x2="104" y2="38" />
        <line x1="84" y1="42" x2="98" y2="42" />
        <line x1="84" y1="56" x2="104" y2="56" />
        <line x1="84" y1="60" x2="96" y2="60" />
      </g>

      <g transform="translate(122 12) rotate(5)">
        <rect
          x="0"
          y="0"
          width="44"
          height="54"
          rx="3"
          fill="currentColor"
          fillOpacity={0.22}
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <line
          x1="6"
          y1="10"
          x2="38"
          y2="10"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <line
          x1="6"
          y1="16"
          x2="32"
          y2="16"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <line
          x1="6"
          y1="22"
          x2="35"
          y2="22"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <circle
          cx="22"
          cy="38"
          r="7"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <path
          d="M22 33 L25 38 L22 43 L19 38 Z"
          fill="currentColor"
          fillOpacity={0.7}
        />
      </g>
    </svg>
  )
}

/**
 * Layer 2 — Shared Language
 * Two figures facing each other, each with an "AI" speech bubble, joined by a handoff arrow.
 */
export function LayerTwoVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="22" cy="48" r="9" fill="currentColor" fillOpacity={0.2} />
        <path
          d="M8 74 Q8 60 22 60 Q36 60 36 74"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <path
          d="M6 8 H34 Q38 8 38 12 V24 Q38 28 34 28 H22 L18 34 V28 H10 Q6 28 6 24 Z"
          fill="currentColor"
          fillOpacity={0.28}
        />
      </g>
      <text
        x="22"
        y="22"
        textAnchor="middle"
        fontFamily="var(--font-jbmono), monospace"
        fontSize={10}
        fontWeight={700}
        fill="currentColor"
      >
        AI
      </text>

      <g
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M50 44 H 130" />
        <path d="M54 40 L 50 44 L 54 48" />
        <path d="M126 40 L 130 44 L 126 48" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <circle cx="158" cy="48" r="9" fill="currentColor" fillOpacity={0.2} />
        <path
          d="M144 74 Q144 60 158 60 Q172 60 172 74"
          fill="currentColor"
          fillOpacity={0.2}
        />
        <path
          d="M146 8 H174 Q178 8 178 12 V24 Q178 28 174 28 H166 L162 34 V28 H146 Q142 28 142 24 V12 Q142 8 146 8 Z"
          fill="currentColor"
          fillOpacity={0.28}
        />
      </g>
      <text
        x="160"
        y="22"
        textAnchor="middle"
        fontFamily="var(--font-jbmono), monospace"
        fontSize={10}
        fontWeight={700}
        fill="currentColor"
      >
        AI
      </text>
    </svg>
  )
}

/**
 * Layer 3 — Shared Standards
 * Open hand → fist (discipline) and a code window with a verifying checkmark badge.
 */
export function LayerThreeVignette(props: VignetteProps) {
  return (
    <svg
      viewBox="0 0 180 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <g
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="currentColor"
        fillOpacity={0.18}
      >
        <path
          d="M6 50 V36 Q6 32 10 32 Q14 32 14 36 V46
             M14 36 V28 Q14 24 18 24 Q22 24 22 28 V46
             M22 30 V22 Q22 18 26 18 Q30 18 30 22 V46
             M30 28 V32 Q30 28 34 28 Q38 28 38 32 V52
             Q38 64 26 68 H18 Q8 68 6 56 Z"
        />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        fill="none"
      >
        <path d="M48 44 H 68" />
        <path d="M64 40 L 68 44 L 64 48" />
      </g>

      <g
        stroke="currentColor"
        strokeWidth={1.4}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path
          d="M76 38 Q76 28 90 28 Q104 28 104 38 V54 Q104 66 90 70 H82 Q72 70 72 60 Z"
          fill="currentColor"
          fillOpacity={0.24}
        />
        <path
          d="M82 36 H 100 M82 44 H 100 M82 52 H 100 M82 60 H 100"
          stroke="currentColor"
          strokeOpacity={0.45}
          strokeWidth={1}
        />
      </g>

      <g transform="translate(116 12)">
        <rect
          x="0"
          y="0"
          width="56"
          height="44"
          rx="3"
          fill="currentColor"
          fillOpacity={0.18}
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <line
          x1="0"
          y1="11"
          x2="56"
          y2="11"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <circle cx="6" cy="5.5" r="1.4" fill="currentColor" />
        <circle cx="11" cy="5.5" r="1.4" fill="currentColor" />
        <circle cx="16" cy="5.5" r="1.4" fill="currentColor" />
        <text
          x="28"
          y="32"
          textAnchor="middle"
          fontFamily="var(--font-jbmono), monospace"
          fontSize={13}
          fontWeight={700}
          fill="currentColor"
        >
          {'</>'}
        </text>
        <circle
          cx="52"
          cy="42"
          r="9"
          fill="#5BD0A4"
          stroke="currentColor"
          strokeWidth={1.4}
        />
        <path
          d="M48 42 L 51 45 L 56 39"
          stroke="#0F2A5E"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  )
}

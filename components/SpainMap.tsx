'use client'
import { useState } from 'react'

// Geographic polygon paths for Spain's autonomous communities
// ViewBox: "0 0 680 560"
// Coordinate system: approximate geographic projection
// Peninsula: x:47-569, y:17-462 | Canarias inset: bottom-left | Baleares: right

const REGIONS: Record<string, {
  path: string
  label: string
  lx: number  // label x
  ly: number  // label y
  bx: number  // badge x
  by: number  // badge y
}> = {
  galicia: {
    path: 'M 47,68 L 104,17 L 148,46 L 148,75 L 130,88 L 116,114 L 80,120 L 52,96 Z',
    label: 'Galicia', lx: 92, ly: 76, bx: 92, by: 56,
  },
  asturias: {
    path: 'M 148,46 L 230,48 L 233,74 L 148,75 Z',
    label: 'Asturias', lx: 190, ly: 62, bx: 220, by: 50,
  },
  cantabria: {
    path: 'M 230,48 L 284,49 L 286,76 L 233,74 Z',
    label: 'Cantabria', lx: 258, ly: 63, bx: 278, by: 50,
  },
  'pais-vasco': {
    path: 'M 284,49 L 358,41 L 368,56 L 362,73 L 286,76 Z',
    label: 'País Vasco', lx: 325, ly: 60, bx: 354, by: 44,
  },
  navarra: {
    path: 'M 358,41 L 398,22 L 407,62 L 404,99 L 388,132 L 366,122 L 362,73 L 368,56 Z',
    label: 'Navarra', lx: 384, ly: 78, bx: 398, by: 26,
  },
  'la-rioja': {
    path: 'M 286,76 L 362,73 L 366,122 L 340,136 L 299,120 L 296,94 Z',
    label: 'La Rioja', lx: 328, ly: 103, bx: 360, by: 76,
  },
  aragon: {
    path: 'M 398,22 L 453,17 L 462,54 L 466,80 L 466,132 L 458,202 L 428,222 L 408,202 L 388,132 L 404,99 L 407,62 Z',
    label: 'Aragón', lx: 426, ly: 122, bx: 453, by: 21,
  },
  cataluna: {
    path: 'M 453,17 L 520,12 L 543,32 L 569,94 L 549,148 L 490,168 L 466,132 L 466,80 L 462,54 Z',
    label: 'Cataluña', lx: 510, ly: 82, bx: 554, by: 16,
  },
  'castilla-leon': {
    path: 'M 52,96 L 80,120 L 116,114 L 130,88 L 148,75 L 233,74 L 286,76 L 296,94 L 299,120 L 340,136 L 366,122 L 388,132 L 408,202 L 378,210 L 344,216 L 308,221 L 268,221 L 228,216 L 184,210 L 140,216 L 100,202 L 77,175 L 56,143 Z',
    label: 'Castilla y León', lx: 228, ly: 158, bx: 276, by: 142,
  },
  madrid: {
    path: 'M 308,221 L 344,216 L 378,210 L 384,245 L 374,271 L 350,276 L 325,266 L 304,245 Z',
    label: 'Madrid', lx: 344, ly: 246, bx: 376, by: 213,
  },
  'castilla-la-mancha': {
    path: 'M 228,216 L 268,221 L 308,221 L 304,245 L 325,266 L 350,276 L 374,271 L 384,245 L 408,202 L 428,222 L 438,266 L 428,296 L 400,332 L 370,346 L 330,355 L 294,355 L 258,345 L 234,325 L 220,295 L 220,271 L 224,245 Z',
    label: 'C.-La Mancha', lx: 320, ly: 288, bx: 360, by: 270,
  },
  extremadura: {
    path: 'M 56,143 L 100,202 L 140,216 L 184,210 L 184,242 L 174,290 L 163,328 L 140,353 L 103,369 L 72,359 L 52,329 L 47,279 L 47,229 Z',
    label: 'Extremadura', lx: 110, ly: 288, bx: 148, by: 270,
  },
  valencia: {
    path: 'M 428,222 L 458,202 L 466,132 L 490,168 L 549,148 L 548,172 L 530,222 L 510,272 L 490,322 L 468,356 L 448,366 L 428,332 L 433,296 L 438,266 Z',
    label: 'Valencia', lx: 492, ly: 254, bx: 524, by: 196,
  },
  murcia: {
    path: 'M 428,332 L 448,366 L 443,396 L 418,416 L 389,421 L 364,406 L 354,381 L 370,346 L 400,332 Z',
    label: 'Murcia', lx: 400, ly: 377, bx: 428, by: 333,
  },
  andalucia: {
    path: 'M 47,279 L 52,329 L 72,359 L 103,369 L 140,353 L 163,328 L 174,290 L 184,242 L 192,342 L 232,360 L 258,375 L 290,386 L 330,391 L 354,381 L 364,406 L 389,421 L 399,431 L 369,452 L 309,462 L 244,462 L 183,451 L 128,435 L 82,415 L 52,391 L 38,361 Z',
    label: 'Andalucía', lx: 222, ly: 415, bx: 262, by: 397,
  },
}

interface Props {
  onSelectComunidad?: (id: string, label: string) => void
  counts?: Record<string, number>
  selectedId?: string
}

export default function SpainMap({ onSelectComunidad, counts = {}, selectedId }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)
  const maxCount = Math.max(...Object.values(counts), 1)

  const getFill = (id: string) => {
    if (id === selectedId) return '#FF6B00'
    if (id === hovered)  return 'rgba(255,140,48,0.85)'
    const c = counts[id] || 0
    if (c === 0) return '#1C1C1C'
    const intensity = Math.min(c / maxCount, 1)
    const alpha = Math.round((0.18 + intensity * 0.62) * 255).toString(16).padStart(2, '0')
    return `#FF6B00${alpha}`
  }

  const getStroke = (id: string) =>
    id === selectedId || id === hovered ? '#FF6B00' : 'rgba(255,107,0,0.25)'

  const getTextFill = (id: string) =>
    id === selectedId ? '#fff' : id === hovered ? '#F5F5F0' : '#666'

  const renderBadge = (id: string, bx: number, by: number) => {
    const c = counts[id] || 0
    if (!c) return null
    return (
      <g style={{ pointerEvents: 'none' }}>
        <circle cx={bx} cy={by} r={10} fill="#FF6B00" />
        <text x={bx} y={by + 4} textAnchor="middle" fill="#fff" fontSize={7.5}
          fontFamily="Inter,sans-serif" fontWeight="700">
          {c > 99 ? '99+' : c}
        </text>
      </g>
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 680 560" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* ── Peninsula regions ─────────────────────────────────── */}
        {Object.entries(REGIONS).map(([id, r]) => (
          <g key={id} style={{ cursor: 'pointer' }}
            onClick={() => onSelectComunidad?.(id, r.label)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <path
              d={r.path}
              fill={getFill(id)}
              stroke={getStroke(id)}
              strokeWidth={id === selectedId || id === hovered ? 1.8 : 0.7}
              style={{ transition: 'fill 0.2s, stroke 0.2s, stroke-width 0.2s' }}
            />
            <text x={r.lx} y={r.ly} textAnchor="middle"
              fill={getTextFill(id)}
              fontSize={Math.min(9.5, 70 / r.label.length + 2)}
              fontFamily="Inter,sans-serif"
              fontWeight={id === selectedId ? '700' : '400'}
              style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.2s' }}
            >
              {r.label}
            </text>
            {renderBadge(id, r.bx, r.by)}
          </g>
        ))}

        {/* ── Baleares ──────────────────────────────────────────── */}
        <g style={{ cursor: 'pointer' }}
          onClick={() => onSelectComunidad?.('baleares', 'Baleares')}
          onMouseEnter={() => setHovered('baleares')}
          onMouseLeave={() => setHovered(null)}
        >
          {/* Mallorca */}
          <path d="M 558,202 L 614,196 L 626,216 L 610,238 L 564,234 Z"
            fill={getFill('baleares')} stroke={getStroke('baleares')} strokeWidth={0.7}
            style={{ transition: 'fill 0.2s' }} />
          {/* Menorca */}
          <path d="M 622,188 L 652,184 L 658,198 L 646,208 L 620,204 Z"
            fill={getFill('baleares')} stroke={getStroke('baleares')} strokeWidth={0.7}
            style={{ transition: 'fill 0.2s' }} />
          {/* Ibiza */}
          <path d="M 546,241 L 564,239 L 568,254 L 557,260 L 542,253 Z"
            fill={getFill('baleares')} stroke={getStroke('baleares')} strokeWidth={0.7}
            style={{ transition: 'fill 0.2s' }} />
          <text x={590} y={224} textAnchor="middle"
            fill={getTextFill('baleares')} fontSize={8.5}
            fontFamily="Inter,sans-serif" fontWeight={selectedId === 'baleares' ? '700' : '400'}
            style={{ pointerEvents: 'none', userSelect: 'none' }}>
            Baleares
          </text>
          {renderBadge('baleares', 624, 188)}
        </g>

        {/* ── Canarias inset box ─────────────────────────────────── */}
        <g>
          <rect x={26} y={483} width={170} height={66} rx={8}
            fill="rgba(255,107,0,0.02)" stroke="rgba(255,107,0,0.18)"
            strokeWidth={0.8} strokeDasharray="4,3" />
          <text x={111} y={497} textAnchor="middle"
            fill="#555" fontSize={7.5} fontFamily="Inter,sans-serif">
            CANARIAS
          </text>
          {/* Islands */}
          {[
            { d: 'M 38,510 L 62,506 L 68,520 L 58,532 L 36,528 Z', label: '' },   // Tenerife
            { d: 'M 74,504 L 96,500 L 100,514 L 91,524 L 72,520 Z', label: '' },   // Gran Canaria
            { d: 'M 104,498 L 122,496 L 126,508 L 119,516 L 102,513 Z', label: '' }, // Fuerteventura
            { d: 'M 130,494 L 148,492 L 151,502 L 146,509 L 128,506 Z', label: '' }, // Lanzarote
            { d: 'M 156,504 L 168,502 L 170,511 L 165,516 L 154,513 Z', label: '' }, // La Palma
          ].map((isl, i) => (
            <path key={i} d={isl.d}
              fill={getFill('canarias')}
              stroke={getStroke('canarias')} strokeWidth={0.6}
              style={{ cursor: 'pointer', transition: 'fill 0.2s' }}
              onClick={() => onSelectComunidad?.('canarias', 'Canarias')}
              onMouseEnter={() => setHovered('canarias')}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
          {renderBadge('canarias', 170, 488)}
        </g>

        {/* ── Legend ─────────────────────────────────────────────── */}
        <g transform="translate(340, 488)">
          <rect x={0} y={0} width={12} height={12} rx={2} fill="rgba(255,107,0,0.2)" stroke="rgba(255,107,0,0.3)" strokeWidth={0.6} />
          <text x={16} y={9.5} fill="#555" fontSize={8.5} fontFamily="Inter">Pocos</text>
          <rect x={58} y={0} width={12} height={12} rx={2} fill="rgba(255,107,0,0.65)" stroke="rgba(255,107,0,0.4)" strokeWidth={0.6} />
          <text x={74} y={9.5} fill="#555" fontSize={8.5} fontFamily="Inter">Muchos</text>
          <rect x={122} y={0} width={12} height={12} rx={2} fill="#FF6B00" />
          <text x={138} y={9.5} fill="#555" fontSize={8.5} fontFamily="Inter">Seleccionado</text>
        </g>
      </svg>
    </div>
  )
}

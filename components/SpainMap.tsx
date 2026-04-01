'use client'
import { useState } from 'react'
import { COMUNIDADES } from '@/lib/data'

// Simplified Spain SVG — comunidades autónomas with approximate positions
const COMUNIDAD_POSITIONS: Record<string, { x: number; y: number; width: number; height: number; label: string }> = {
  galicia:          { x: 10,  y: 10,  width: 70,  height: 60,  label: 'Galicia' },
  asturias:         { x: 85,  y: 10,  width: 60,  height: 30,  label: 'Asturias' },
  cantabria:        { x: 148, y: 10,  width: 40,  height: 28,  label: 'Cantabria' },
  'pais-vasco':     { x: 190, y: 10,  width: 50,  height: 35,  label: 'País Vasco' },
  navarra:          { x: 242, y: 10,  width: 40,  height: 50,  label: 'Navarra' },
  'la-rioja':       { x: 190, y: 47,  width: 50,  height: 30,  label: 'La Rioja' },
  aragon:           { x: 242, y: 62,  width: 70,  height: 90,  label: 'Aragón' },
  cataluna:         { x: 314, y: 10,  width: 80,  height: 100, label: 'Cataluña' },
  madrid:           { x: 170, y: 140, width: 65,  height: 60,  label: 'Madrid' },
  'castilla-leon':  { x: 50,  y: 75,  width: 170, height: 90,  label: 'Castilla y León' },
  extremadura:      { x: 50,  y: 195, width: 100, height: 80,  label: 'Extremadura' },
  'castilla-la-mancha': { x: 155, y: 155, width: 140, height: 90, label: 'C.-La Mancha' },
  valencia:         { x: 295, y: 112, width: 65,  height: 110, label: 'Valencia' },
  murcia:           { x: 250, y: 250, width: 60,  height: 50,  label: 'Murcia' },
  andalucia:        { x: 60,  y: 278, width: 200, height: 90,  label: 'Andalucía' },
  baleares:         { x: 340, y: 230, width: 55,  height: 35,  label: 'Baleares' },
  canarias:         { x: 60,  y: 350, width: 80,  height: 40,  label: 'Canarias' },
}

interface Props {
  onSelectComunidad?: (id: string, label: string) => void
  counts?: Record<string, number>
  selectedId?: string
}

export default function SpainMap({ onSelectComunidad, counts = {}, selectedId }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  const maxCount = Math.max(...Object.values(counts), 1)

  const getColor = (id: string) => {
    const count = counts[id] || 0
    const isSelected = id === selectedId
    const isHovered  = id === hovered

    if (isSelected) return '#FF6B00'
    if (isHovered)  return '#FF8C30'
    if (count === 0) return '#1A1A1A'
    const intensity = Math.min(count / maxCount, 1)
    const alpha = 0.15 + intensity * 0.65
    return `rgba(255, 107, 0, ${alpha})`
  }

  const getBorderColor = (id: string) => {
    if (id === selectedId || id === hovered) return '#FF6B00'
    return 'rgba(255,107,0,0.15)'
  }

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <svg viewBox="0 0 410 420" style={{ width: '100%', height: 'auto', maxHeight: 420 }}>
        {/* Background */}
        <rect width="410" height="420" fill="transparent" />

        {/* Comunidades */}
        {Object.entries(COMUNIDAD_POSITIONS).map(([id, pos]) => (
          <g key={id} style={{ cursor: 'pointer' }}
            onClick={() => onSelectComunidad?.(id, pos.label)}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            <rect
              x={pos.x} y={pos.y}
              width={pos.width} height={pos.height}
              rx={6} ry={6}
              fill={getColor(id)}
              stroke={getBorderColor(id)}
              strokeWidth={id === selectedId || id === hovered ? 1.5 : 0.5}
              style={{ transition: 'all 0.2s' }}
            />
            {/* Label */}
            {pos.width > 45 && (
              <text
                x={pos.x + pos.width / 2}
                y={pos.y + pos.height / 2 + 4}
                textAnchor="middle"
                fill={id === selectedId ? '#fff' : hovered === id ? '#F5F5F0' : '#666'}
                fontSize={Math.min(9, pos.width / 8)}
                fontFamily="Inter, sans-serif"
                fontWeight={id === selectedId ? '700' : '400'}
                style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.2s' }}
              >
                {pos.label}
              </text>
            )}
            {/* Pro count badge */}
            {counts[id] > 0 && (
              <g>
                <circle
                  cx={pos.x + pos.width - 6}
                  cy={pos.y + 6}
                  r={8}
                  fill="#FF6B00"
                />
                <text
                  x={pos.x + pos.width - 6}
                  y={pos.y + 10}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize={7}
                  fontFamily="Inter, sans-serif"
                  fontWeight="700"
                  style={{ pointerEvents: 'none', userSelect: 'none' }}
                >
                  {counts[id] > 99 ? '99+' : counts[id]}
                </text>
              </g>
            )}
          </g>
        ))}

        {/* Legend */}
        <g transform="translate(10, 395)">
          <rect x={0} y={0} width={10} height={10} rx={2} fill="rgba(255,107,0,0.2)" />
          <text x={14} y={8} fill="#666" fontSize={7} fontFamily="Inter">Pocos</text>
          <rect x={50} y={0} width={10} height={10} rx={2} fill="rgba(255,107,0,0.6)" />
          <text x={64} y={8} fill="#666" fontSize={7} fontFamily="Inter">Muchos</text>
          <rect x={110} y={0} width={10} height={10} rx={2} fill="#FF6B00" />
          <text x={124} y={8} fill="#666" fontSize={7} fontFamily="Inter">Seleccionado</text>
        </g>
      </svg>
    </div>
  )
}

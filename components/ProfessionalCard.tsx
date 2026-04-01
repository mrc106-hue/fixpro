'use client'
import Link from 'next/link'
import { MessageCircle, Phone, Star, MapPin, CheckCircle } from 'lucide-react'
import type { Profesional } from '@/lib/supabase'

interface Props {
  pro: Partial<Profesional> & { id: string; nombre: string; plan: string }
  compact?: boolean
}

const PLAN_LABEL: Record<string, string> = {
  vip:      'VIP',
  premium:  'Premium',
  estandar: 'Estándar',
  gratis:   'Gratis',
}

function PlanBadge({ plan }: { plan: string }) {
  const cls = plan === 'vip' ? 'badge-vip' : plan === 'premium' ? 'badge-premium' : plan === 'estandar' ? 'badge-estandar' : 'badge-gratis'
  return <span className={cls}>{PLAN_LABEL[plan] || plan}</span>
}

function Stars({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={12} fill={i <= Math.round(rating) ? '#FFB800' : 'none'} color={i <= Math.round(rating) ? '#FFB800' : '#333'} />
      ))}
    </div>
  )
}

export default function ProfessionalCard({ pro, compact = false }: Props) {
  const slug = pro.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const isVip = pro.plan === 'vip'
  const isPremium = pro.plan === 'premium'

  if (compact) {
    return (
      <Link href={`/profesional/${slug}-${pro.id}`} style={{ textDecoration: 'none' }}>
        <div style={{
          background: '#111', border: `1px solid ${isVip ? 'rgba(255,184,0,0.2)' : isPremium ? 'rgba(255,107,0,0.15)' : '#1E1E1E'}`,
          borderRadius: 12, padding: '16px', display: 'flex', gap: 12, alignItems: 'center',
          transition: 'all 0.2s', cursor: 'pointer',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = isVip ? 'rgba(255,184,0,0.4)' : 'rgba(255,107,0,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = isVip ? 'rgba(255,184,0,0.2)' : isPremium ? 'rgba(255,107,0,0.15)' : '#1E1E1E'; e.currentTarget.style.transform = '' }}
        >
          {/* Avatar */}
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: `linear-gradient(135deg, ${isVip ? '#FFB800' : '#FF6B00'}20, ${isVip ? '#FFB800' : '#FF6B00'}08)`,
            border: `1px solid ${isVip ? 'rgba(255,184,0,0.2)' : 'rgba(255,107,0,0.15)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22,
          }}>
            🔧
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ color: '#F5F5F0', fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pro.nombre}</span>
              <PlanBadge plan={pro.plan} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Stars rating={pro.valoracion_media || 0} />
              <span style={{ color: '#666', fontSize: 11 }}>{pro.total_valoraciones || 0} reseñas</span>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/profesional/${slug}-${pro.id}`} style={{ textDecoration: 'none' }}>
      <div style={{
        background: '#111',
        border: `1px solid ${isVip ? 'rgba(255,184,0,0.25)' : isPremium ? 'rgba(255,107,0,0.15)' : '#1E1E1E'}`,
        borderRadius: 16,
        overflow: 'hidden',
        transition: 'all 0.25s',
        cursor: 'pointer',
        position: 'relative',
        boxShadow: isVip ? '0 4px 24px rgba(255,184,0,0.08)' : undefined,
      }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = isVip ? '0 12px 40px rgba(255,184,0,0.15)' : '0 12px 40px rgba(255,107,0,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = isVip ? '0 4px 24px rgba(255,184,0,0.08)' : 'none' }}
      >
        {/* Top glow bar */}
        {(isVip || isPremium) && (
          <div style={{ height: 3, background: isVip ? 'linear-gradient(90deg, #FFB800, #FF6B00)' : 'linear-gradient(90deg, #FF6B00, #FF9500)' }} />
        )}

        {/* Cover / photo */}
        <div style={{
          height: 140,
          background: `linear-gradient(135deg, ${isVip ? '#2a1800' : '#1a0a00'}, #111)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ fontSize: 56, opacity: 0.4 }}>🔧</div>
          <div style={{ position: 'absolute', top: 12, right: 12 }}>
            <PlanBadge plan={pro.plan} />
          </div>
          {pro.verificado && (
            <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 4, background: 'rgba(0,0,0,0.6)', borderRadius: 6, padding: '3px 8px' }}>
              <CheckCircle size={12} color="#00E599" />
              <span style={{ fontSize: 10, color: '#00E599', fontWeight: 600 }}>Verificado</span>
            </div>
          )}
        </div>

        <div style={{ padding: '18px' }}>
          {/* Name */}
          <h3 style={{ color: '#F5F5F0', fontSize: 16, fontWeight: 700, marginBottom: 6, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.02em' }}>
            {pro.nombre}
          </h3>

          {/* Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#666', fontSize: 12, marginBottom: 10 }}>
            <MapPin size={12} />
            <span>{pro.provincia || 'España'}</span>
          </div>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <Stars rating={pro.valoracion_media || 0} />
            <span style={{ color: '#FFB800', fontSize: 13, fontWeight: 700 }}>{pro.valoracion_media?.toFixed(1) || '—'}</span>
            <span style={{ color: '#444', fontSize: 11 }}>({pro.total_valoraciones || 0})</span>
          </div>

          {/* Description */}
          {pro.descripcion && (
            <p style={{ color: '#888', fontSize: 12, lineHeight: 1.6, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {pro.descripcion}
            </p>
          )}

          {/* CTA buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            {pro.whatsapp && (
              <a
                href={`https://wa.me/${pro.whatsapp}?text=Hola, te contacto desde FixPro`}
                onClick={e => e.stopPropagation()}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, textDecoration: 'none',
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  color: '#fff', fontSize: 12, fontWeight: 700, textAlign: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                }}
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            )}
            {pro.telefono && (
              <a
                href={`tel:${pro.telefono}`}
                onClick={e => e.stopPropagation()}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, textDecoration: 'none',
                  background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)',
                  color: '#FF6B00', fontSize: 12, fontWeight: 700, textAlign: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                }}
              >
                <Phone size={13} /> Llamar
              </a>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

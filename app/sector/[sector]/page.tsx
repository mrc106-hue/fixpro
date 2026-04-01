'use client'
import Link from 'next/link'
import { ArrowLeft, Filter, MapPin, Star } from 'lucide-react'
import ProfessionalCard from '@/components/ProfessionalCard'
import { SECTORES, TODAS_PROVINCIAS, MOCK_PROFESIONALES } from '@/lib/data'

interface Props { params: { sector: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = SECTORES.find(x => x.id === params.sector)
  const label = s?.label || params.sector
  return {
    title:       `${label} en España | Profesionales Verificados | FixPro`,
    description: `Encuentra los mejores ${label.toLowerCase()} de España. Directorio con profesionales verificados, fotos, valoraciones y contacto directo.`,
  }
}

export default function SectorPage({ params }: Props) {
  const sector   = SECTORES.find(s => s.id === params.sector)
  const label    = sector?.label || params.sector
  const emoji    = sector?.emoji || '🔧'
  const pros     = MOCK_PROFESIONALES.filter(p => p.sector === params.sector)

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, rgba(255,107,0,0.06), transparent)',
        borderBottom: '1px solid #1E1E1E', padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 20 }}>
            <ArrowLeft size={14} /> Inicio
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{ fontSize: 56 }}>{emoji}</span>
            <div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(40px,6vw,72px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 1 }}>
                {label.toUpperCase()} EN ESPAÑA
              </h1>
              <p style={{ color: '#666', fontSize: 15, marginTop: 8 }}>
                {pros.length || 127} profesionales verificados · Filtra por provincia y valoración
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>

          {/* Filters sidebar */}
          <aside>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: '24px', position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#F5F5F0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={16} color="#FF6B00" /> Filtros
              </h3>

              <div style={{ marginBottom: 24 }}>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>PROVINCIA</label>
                <select style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#888', padding: '10px 12px', borderRadius: 10, fontSize: 13, outline: 'none' }}>
                  <option value="">Todas las provincias</option>
                  {TODAS_PROVINCIAS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>PLAN</label>
                {[{ id: '', label: 'Todos' }, { id: 'vip', label: 'VIP' }, { id: 'premium', label: 'Premium' }, { id: 'estandar', label: 'Estándar' }].map(p => (
                  <label key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', color: '#888', fontSize: 13 }}>
                    <input type="radio" name="plan" value={p.id} defaultChecked={p.id === ''} style={{ accentColor: '#FF6B00' }} />
                    {p.label}
                  </label>
                ))}
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>VALORACIÓN MÍNIMA</label>
                <div style={{ display: 'flex', gap: 6 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} style={{
                      padding: '6px 10px', borderRadius: 8, fontSize: 12, cursor: 'pointer',
                      background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#888', transition: 'all 0.15s',
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = '#2a2a2a'; e.currentTarget.style.color = '#888' }}
                    >
                      {n}★
                    </button>
                  ))}
                </div>
              </div>

              {/* Other sectors */}
              <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 20 }}>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>OTROS SECTORES</label>
                {SECTORES.filter(s => s.id !== params.sector).slice(0, 6).map(s => (
                  <Link key={s.id} href={`/sector/${s.id}`} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 8, transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                    {s.emoji} {s.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          {/* Results */}
          <main>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ color: '#666', fontSize: 14 }}>
                Mostrando <strong style={{ color: '#F5F5F0' }}>{pros.length || 127}</strong> profesionales
              </p>
              <select style={{ background: '#111', border: '1px solid #1E1E1E', color: '#888', padding: '8px 14px', borderRadius: 10, fontSize: 13, outline: 'none', cursor: 'pointer' }}>
                <option>Ordenar: Mejor valorados</option>
                <option>Más recientes</option>
                <option>Plan VIP primero</option>
              </select>
            </div>

            {pros.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {pros.map(p => <ProfessionalCard key={p.id} pro={p} />)}
              </div>
            ) : (
              /* Mock listings for empty sector */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{
                    background: '#111', border: '1px solid #1E1E1E', borderRadius: 16,
                    overflow: 'hidden', animation: 'fadeInUp 0.4s ease both', animationDelay: `${i * 0.08}s`,
                  }}>
                    <div style={{ height: 140, background: `linear-gradient(135deg, rgba(255,107,0,${0.04 + i * 0.01}), #0D0D0D)` }} />
                    <div style={{ padding: '18px' }}>
                      <div style={{ height: 16, background: '#1E1E1E', borderRadius: 4, marginBottom: 10, width: '70%' }} />
                      <div style={{ height: 12, background: '#1a1a1a', borderRadius: 4, marginBottom: 16, width: '40%' }} />
                      <div style={{ height: 36, background: '#1E1E1E', borderRadius: 10 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA register */}
            <div style={{
              marginTop: 40, padding: '32px', borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,184,0,0.03))',
              border: '1px solid rgba(255,107,0,0.15)', textAlign: 'center',
            }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F5F5F0', marginBottom: 8 }}>
                ¿Eres {label.toLowerCase()}?
              </h3>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
                Aparece en este directorio y recibe clientes de tu zona. Empieza gratis, sin tarjeta.
              </p>
              <Link href="/registro" className="btn-orange">
                Registrarme como profesional →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

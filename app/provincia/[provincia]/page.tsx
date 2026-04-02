'use client'
import Link from 'next/link'
import { ArrowLeft, MapPin, Filter } from 'lucide-react'
import ProfessionalCard from '@/components/ProfessionalCard'
import { SECTORES, COMUNIDADES, MOCK_PROFESIONALES } from '@/lib/data'

interface Props { params: { provincia: string } }

function labelFromSlug(slug: string) {
  return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

function getComunidadForProvincia(provincia: string) {
  const label = labelFromSlug(provincia)
  return COMUNIDADES.find(c => c.provincias.some(p => p.toLowerCase().replace(/\s+/g, '-') === provincia || p === label))
}

export default function ProvinciaPage({ params }: Props) {
  const label     = labelFromSlug(params.provincia)
  const comunidad = getComunidadForProvincia(params.provincia)
  const pros      = MOCK_PROFESIONALES.filter(p => p.provincia?.toLowerCase().replace(/\s+/g, '-') === params.provincia)

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
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <MapPin size={20} color="#FF6B00" />
                {comunidad && (
                  <span style={{ color: '#FF6B00', fontSize: 13, fontWeight: 600 }}>{comunidad.label}</span>
                )}
              </div>
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,5vw,64px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 1 }}>
                PROFESIONALES EN {label.toUpperCase()}
              </h1>
              <p style={{ color: '#666', fontSize: 15, marginTop: 8 }}>
                {pros.length || 94} profesionales verificados en {pros.length} sectores · Respuesta en &lt;2h
              </p>
            </div>
            <Link href="/presupuesto" style={{
              background: 'linear-gradient(135deg, #FF6B00, #FF8C30)',
              color: '#fff', textDecoration: 'none', padding: '14px 28px',
              borderRadius: 12, fontWeight: 700, fontSize: 15, display: 'inline-flex', alignItems: 'center', gap: 8,
            }}>
              Pedir presupuesto gratis →
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 32 }}>

          {/* Sidebar */}
          <aside>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24, position: 'sticky', top: 80 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#F5F5F0', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Filter size={16} color="#FF6B00" /> Filtrar por sector
              </h3>
              {SECTORES.map(s => (
                <Link key={s.id} href={`/sector/${s.id}`}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 8, padding: '6px 8px', borderRadius: 8, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.08)'; e.currentTarget.style.color = '#FF6B00' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#666' }}
                >
                  <span>{s.emoji}</span> {s.label}
                </Link>
              ))}

              {/* Otras provincias de la comunidad */}
              {comunidad && comunidad.provincias.length > 1 && (
                <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 20, marginTop: 12 }}>
                  <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>
                    OTRAS EN {comunidad.label.toUpperCase()}
                  </label>
                  {comunidad.provincias
                    .filter(p => p.toLowerCase().replace(/\s+/g, '-') !== params.provincia)
                    .slice(0, 6)
                    .map(p => (
                      <Link key={p} href={`/provincia/${p.toLowerCase().replace(/\s+/g, '-')}`}
                        style={{ display: 'block', color: '#555', textDecoration: 'none', fontSize: 13, marginBottom: 6 }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
                        onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                      >
                        → {p}
                      </Link>
                    ))
                  }
                </div>
              )}
            </div>
          </aside>

          {/* Results */}
          <main>
            {/* Sector chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
              {SECTORES.slice(0, 8).map(s => (
                <Link key={s.id} href={`/sector/${s.id}`} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  padding: '6px 14px', borderRadius: 20, background: '#111', border: '1px solid #1E1E1E',
                  color: '#888', fontSize: 12, textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B00'; e.currentTarget.style.color = '#FF6B00' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E'; e.currentTarget.style.color = '#888' }}
                >
                  {s.emoji} {s.label}
                </Link>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <p style={{ color: '#666', fontSize: 14 }}>
                Mostrando <strong style={{ color: '#F5F5F0' }}>{pros.length || 94}</strong> profesionales en {label}
              </p>
              <select style={{ background: '#111', border: '1px solid #1E1E1E', color: '#888', padding: '8px 14px', borderRadius: 10, fontSize: 13, outline: 'none', cursor: 'pointer' }}>
                <option>Mejor valorados</option>
                <option>Más recientes</option>
                <option>Plan VIP primero</option>
              </select>
            </div>

            {pros.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {pros.map(p => <ProfessionalCard key={p.id} pro={p} />)}
              </div>
            ) : (
              /* Skeleton cards */
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{
                    background: '#111', border: '1px solid #1E1E1E', borderRadius: 16,
                    overflow: 'hidden', animation: 'fadeInUp 0.4s ease both', animationDelay: `${i * 0.08}s`,
                  }}>
                    <div style={{ height: 140, background: `linear-gradient(135deg, rgba(255,107,0,${0.03 + i * 0.01}), #0D0D0D)` }} />
                    <div style={{ padding: 18 }}>
                      <div style={{ height: 16, background: '#1E1E1E', borderRadius: 4, marginBottom: 10, width: '65%' }} />
                      <div style={{ height: 12, background: '#1a1a1a', borderRadius: 4, marginBottom: 16, width: '40%' }} />
                      <div style={{ height: 36, background: '#1E1E1E', borderRadius: 10 }} />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Presupuesto CTA */}
            <div style={{
              marginTop: 40, padding: 32, borderRadius: 16,
              background: 'linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,184,0,0.03))',
              border: '1px solid rgba(255,107,0,0.15)', textAlign: 'center',
            }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F5F5F0', marginBottom: 8 }}>
                ¿No encuentras lo que buscas en {label}?
              </h3>
              <p style={{ color: '#666', fontSize: 14, marginBottom: 20 }}>
                Publica tu solicitud y los profesionales de {label} te contactarán con presupuesto.
              </p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/presupuesto" className="btn-orange">
                  Solicitar presupuesto gratis →
                </Link>
                <Link href="/registro" style={{
                  padding: '12px 24px', borderRadius: 10, border: '1px solid #FF6B00',
                  color: '#FF6B00', textDecoration: 'none', fontWeight: 600, fontSize: 14,
                }}>
                  Soy profesional de {label}
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

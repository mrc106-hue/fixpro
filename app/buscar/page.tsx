'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Search, ArrowLeft, SlidersHorizontal, Star, MapPin, Phone, MessageCircle } from 'lucide-react'
import { SECTORES, TODAS_PROVINCIAS, MOCK_PROFESIONALES } from '@/lib/data'

function BuscarContent() {
  const searchParams = useSearchParams()
  const router       = useRouter()

  const [sector,   setSector]   = useState(searchParams.get('sector')   || '')
  const [provincia,setProvincia] = useState(searchParams.get('provincia') || '')
  const [ordenar,  setOrdenar]  = useState('valoracion')

  // Filter mock data
  const resultados = MOCK_PROFESIONALES.filter(p => {
    const matchSector   = !sector   || p.sector === sector
    const matchProvincia = !provincia || p.provincia === provincia
    return matchSector && matchProvincia
  }).sort((a, b) => {
    if (ordenar === 'valoracion') return (b.valoracion || 0) - (a.valoracion || 0)
    const planOrder: Record<string, number> = { vip: 0, premium: 1, estandar: 2, gratis: 3 }
    return (planOrder[a.plan] ?? 4) - (planOrder[b.plan] ?? 4)
  })

  const sectorLabel   = SECTORES.find(s => s.id === sector)?.label || 'Todos'
  const sectorEmoji   = SECTORES.find(s => s.id === sector)?.emoji || '🔍'

  const handleSearch = () => {
    router.push(`/buscar?sector=${sector}&provincia=${provincia}`)
  }

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh', background: '#080808' }}>

      {/* ── Search header ─────────────────────────────────────── */}
      <div style={{
        borderBottom: '1px solid #1E1E1E',
        background: 'linear-gradient(160deg, rgba(255,107,0,0.05), transparent)',
        padding: '32px 24px',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: '#555', textDecoration: 'none', fontSize: 13, marginBottom: 20,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555')}
          >
            <ArrowLeft size={13} /> Inicio
          </Link>

          {/* Search bar */}
          <div style={{
            display: 'flex', gap: 0, borderRadius: 14, overflow: 'hidden',
            background: '#111', border: '1px solid #2a2a2a',
            boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            maxWidth: 720,
          }}>
            <select value={sector} onChange={e => setSector(e.target.value)}
              style={{ flex: 1.6, padding: '16px 18px', background: 'transparent', border: 'none', color: sector ? '#F5F5F0' : '#555', fontSize: 14, outline: 'none', cursor: 'pointer', borderRight: '1px solid #2a2a2a' }}>
              <option value="">Todos los sectores</option>
              {SECTORES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
            </select>
            <select value={provincia} onChange={e => setProvincia(e.target.value)}
              style={{ flex: 1, padding: '16px 16px', background: 'transparent', border: 'none', color: provincia ? '#F5F5F0' : '#555', fontSize: 14, outline: 'none', cursor: 'pointer', borderRight: '1px solid #2a2a2a' }}>
              <option value="">Todas las provincias</option>
              {TODAS_PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <button onClick={handleSearch} style={{
              padding: '16px 26px', background: 'linear-gradient(135deg, #FF6B00, #FF9500)',
              color: '#fff', border: 'none', fontWeight: 700, fontSize: 14,
              display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer',
              whiteSpace: 'nowrap', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#FF8C00,#FFB800)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg,#FF6B00,#FF9500)' }}
            >
              <Search size={16} /> Buscar
            </button>
          </div>

          {/* Result headline */}
          <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <h1 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 'clamp(26px,4vw,44px)', fontWeight: 900,
              color: '#F5F5F0', lineHeight: 1, margin: 0,
            }}>
              {sector ? <>{sectorEmoji} {sectorLabel.toUpperCase()}</> : 'TODOS LOS PROFESIONALES'}
              {provincia && <span style={{ color: '#FF6B00' }}> · {provincia.toUpperCase()}</span>}
            </h1>
            <span style={{
              padding: '4px 14px', borderRadius: 20,
              background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)',
              color: '#FF6B00', fontSize: 13, fontWeight: 600,
            }}>
              {resultados.length > 0 ? resultados.length : '94+'} profesionales
            </span>
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: 28 }}>

          {/* ── Sidebar ─────────────────────────────────────── */}
          <aside>
            <div style={{
              background: '#111', border: '1px solid #1E1E1E', borderRadius: 14,
              padding: '20px', position: 'sticky', top: 88,
            }}>
              <h3 style={{
                fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700,
                color: '#F5F5F0', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <SlidersHorizontal size={14} color="#FF6B00" /> Filtros
              </h3>

              {/* Ordenar */}
              <div style={{ marginBottom: 20 }}>
                <label style={{ color: '#555', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 8 }}>
                  ORDENAR POR
                </label>
                {[
                  { val: 'valoracion', label: '⭐ Mejor valorados' },
                  { val: 'plan', label: '👑 Plan VIP primero' },
                ].map(o => (
                  <label key={o.val} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6, cursor: 'pointer' }}>
                    <input type="radio" name="orden" value={o.val} checked={ordenar === o.val}
                      onChange={() => setOrdenar(o.val)}
                      style={{ accentColor: '#FF6B00' }} />
                    <span style={{ color: '#888', fontSize: 13 }}>{o.label}</span>
                  </label>
                ))}
              </div>

              {/* Sectores */}
              <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 16, marginBottom: 8 }}>
                <label style={{ color: '#555', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>
                  SECTOR
                </label>
                <button
                  onClick={() => setSector('')}
                  style={{
                    display: 'block', width: '100%', textAlign: 'left',
                    padding: '5px 8px', borderRadius: 8, border: 'none',
                    background: !sector ? 'rgba(255,107,0,0.1)' : 'transparent',
                    color: !sector ? '#FF6B00' : '#666', fontSize: 12, cursor: 'pointer', marginBottom: 4,
                  }}
                >
                  🔍 Todos
                </button>
                {SECTORES.map(s => (
                  <button key={s.id} onClick={() => setSector(s.id)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '5px 8px', borderRadius: 8, border: 'none',
                      background: sector === s.id ? 'rgba(255,107,0,0.1)' : 'transparent',
                      color: sector === s.id ? '#FF6B00' : '#666', fontSize: 12, cursor: 'pointer', marginBottom: 2,
                      transition: 'all 0.15s',
                    }}
                  >
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* ── Results grid ──────────────────────────────────── */}
          <main>
            {resultados.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
                {resultados.map(pro => (
                  <ProfessionalResultCard key={pro.id} pro={pro} />
                ))}
              </div>
            ) : (
              /* Empty state + skeletons */
              <div>
                <div style={{
                  background: 'rgba(255,107,0,0.04)', border: '1px solid rgba(255,107,0,0.12)',
                  borderRadius: 14, padding: '40px 32px', textAlign: 'center', marginBottom: 32,
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
                  <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 24, fontWeight: 900, color: '#F5F5F0', marginBottom: 8 }}>
                    Proximamente en tu zona
                  </h3>
                  <p style={{ color: '#555', fontSize: 14, marginBottom: 20 }}>
                    Aún no tenemos profesionales registrados para esta búsqueda.<br />
                    Publica tu solicitud y te contactarán directamente.
                  </p>
                  <Link href="/presupuesto" className="btn-orange" style={{ fontSize: 14, padding: '12px 24px' }}>
                    Publicar solicitud gratis →
                  </Link>
                </div>

                {/* Suggested */}
                <p style={{ color: '#555', fontSize: 13, marginBottom: 16 }}>Profesionales disponibles en otras zonas:</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px,1fr))', gap: 20 }}>
                  {MOCK_PROFESIONALES.slice(0, 3).map(pro => (
                    <ProfessionalResultCard key={pro.id} pro={pro} />
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div style={{
              marginTop: 40, padding: '32px', borderRadius: 14,
              background: 'linear-gradient(135deg,rgba(255,107,0,0.05),rgba(255,184,0,0.03))',
              border: '1px solid rgba(255,107,0,0.12)', textAlign: 'center',
            }}>
              <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 26, fontWeight: 900, color: '#F5F5F0', marginBottom: 8 }}>
                ¿Eres profesional?
              </h3>
              <p style={{ color: '#555', fontSize: 14, marginBottom: 16 }}>
                Aparece en las búsquedas y recibe clientes directamente.
              </p>
              <Link href="/registro" className="btn-orange" style={{ fontSize: 14, padding: '12px 24px' }}>
                Registrarme como profesional →
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

function ProfessionalResultCard({ pro }: { pro: typeof MOCK_PROFESIONALES[0] }) {
  const planColors: Record<string, string> = { vip: '#FFB800', premium: '#FF6B00', estandar: '#5B8DEF', gratis: '#444' }
  const color = planColors[pro.plan] || '#444'

  return (
    <div style={{
      background: '#111', border: `1px solid ${pro.plan === 'vip' ? 'rgba(255,184,0,0.25)' : pro.plan === 'premium' ? 'rgba(255,107,0,0.2)' : '#1E1E1E'}`,
      borderRadius: 14, overflow: 'hidden',
      boxShadow: pro.plan === 'vip' ? '0 8px 32px rgba(255,184,0,0.08)' : undefined,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4)' }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = pro.plan === 'vip' ? '0 8px 32px rgba(255,184,0,0.08)' : '' }}
    >
      {/* Cover */}
      <div style={{
        height: 100, position: 'relative',
        background: `linear-gradient(135deg, ${color}22, #0D0D0D)`,
      }}>
        <div style={{ position: 'absolute', bottom: -20, left: 18 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 12,
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, border: `2px solid ${color}44`,
          }}>
            {SECTORES.find(s => s.id === pro.sector)?.emoji || '🔧'}
          </div>
        </div>
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <span style={{
            padding: '3px 10px', borderRadius: 20,
            background: `${color}22`, border: `1px solid ${color}44`,
            color, fontSize: 9, fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            {pro.plan}
          </span>
        </div>
      </div>

      <div style={{ padding: '28px 18px 18px' }}>
        <h3 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: 18, fontWeight: 800, color: '#F5F5F0', marginBottom: 4, lineHeight: 1.2 }}>
          {pro.nombre}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
          <MapPin size={11} color="#555" />
          <span style={{ color: '#555', fontSize: 12 }}>{pro.provincia}</span>
          {pro.valoracion > 0 && (
            <>
              <span style={{ color: '#2a2a2a' }}>·</span>
              <Star size={11} fill="#FFB800" color="#FFB800" />
              <span style={{ color: '#FFB800', fontSize: 12, fontWeight: 600 }}>{pro.valoracion}</span>
              <span style={{ color: '#444', fontSize: 11 }}>({pro.total_val})</span>
            </>
          )}
        </div>
        {pro.descripcion && (
          <p style={{
            color: '#666', fontSize: 12, lineHeight: 1.5, marginBottom: 14,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>
            {pro.descripcion}
          </p>
        )}
        <div style={{ display: 'flex', gap: 8 }}>
          {pro.whatsapp && (
            <a href={`https://wa.me/${pro.whatsapp}?text=Hola, te contacto desde FixPro`}
              target="_blank" rel="noopener noreferrer"
              style={{
                flex: 1, padding: '9px 0', borderRadius: 10, textAlign: 'center',
                background: 'rgba(37,211,102,0.12)', border: '1px solid rgba(37,211,102,0.25)',
                color: '#25D366', fontSize: 12, fontWeight: 600, textDecoration: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'rgba(37,211,102,0.12)')}
            >
              <MessageCircle size={13} /> WhatsApp
            </a>
          )}
          <Link href={`/profesional/${pro.id}`}
            style={{
              flex: 1, padding: '9px 0', borderRadius: 10, textAlign: 'center',
              background: 'linear-gradient(135deg,#FF6B00,#FF9500)',
              color: '#fff', fontSize: 12, fontWeight: 700, textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <Phone size={13} /> Ver perfil
          </Link>
        </div>
      </div>
    </div>
  )
}

export default function BuscarPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#080808' }}>
        <div style={{ color: '#FF6B00', fontSize: 20, fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700 }}>
          Buscando profesionales...
        </div>
      </div>
    }>
      <BuscarContent />
    </Suspense>
  )
}

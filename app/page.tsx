'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Search, ArrowRight, Star, CheckCircle, TrendingUp, MapPin, Phone, MessageCircle, Zap } from 'lucide-react'
import SpainMap from '@/components/SpainMap'
import ProfessionalCard from '@/components/ProfessionalCard'
import AnimatedCounter from '@/components/AnimatedCounter'
import { SECTORES, TODAS_PROVINCIAS, MOCK_PROFESIONALES } from '@/lib/data'

/* ── Hero particles ──────────────────────────────────────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; color: string }[] = []
    const COLORS = ['#FF6B00', '#FFB800', '#FF9500', '#FFCC00']

    for (let i = 0; i < 80; i++) {
      particles.push({
        x:     Math.random() * canvas.width,
        y:     Math.random() * canvas.height,
        vx:    (Math.random() - 0.5) * 0.5,
        vy:    (Math.random() - 0.5) * 0.5,
        r:     Math.random() * 2.5 + 0.5,
        alpha: Math.random() * 0.6 + 0.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let animId: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = p.color + Math.round(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
}

/* ── Ticker ──────────────────────────────────────────────────────── */
function Ticker() {
  const items = [
    '🔧 Fontanero urgente en Madrid', '⚡ Electricista certificado en Barcelona', '🏗️ Reforma integral en Valencia',
    '🔑 Cerrajero 24h en Sevilla', '🎨 Pintor profesional en Málaga', '❄️ Instalador AC en Zaragoza',
    '🌿 Jardinero en Tarragona', '💻 Técnico informático en Bilbao', '🧱 Albañil en Murcia',
    '☀️ Placas solares en Granada', '📦 Mudanzas en Alicante', '🔌 Técnico electrodomésticos en Córdoba',
  ]
  const doubled = [...items, ...items]

  return (
    <div style={{ borderTop: '1px solid #1E1E1E', borderBottom: '1px solid #1E1E1E', background: 'rgba(255,107,0,0.03)', padding: '12px 0', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(90deg, #080808, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 80, background: 'linear-gradient(-90deg, #080808, transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ display: 'flex', gap: 40, animation: 'tickerScroll 35s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ color: '#666', fontSize: 13, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 6 }}>
            {item} <span style={{ color: '#222' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

/* ── Search Bar ──────────────────────────────────────────────────── */
function SearchBar() {
  const [sector, setSector] = useState('')
  const [provincia, setProvincia] = useState('')

  return (
    <div style={{
      display: 'flex', gap: 0, borderRadius: 16, overflow: 'hidden',
      background: '#111', border: '1px solid #2a2a2a',
      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
      maxWidth: 680, width: '100%',
    }}>
      <select
        value={sector} onChange={e => setSector(e.target.value)}
        style={{
          flex: 1.5, padding: '18px 20px', background: 'transparent', border: 'none',
          color: sector ? '#F5F5F0' : '#666', fontSize: 15, outline: 'none', cursor: 'pointer',
          borderRight: '1px solid #2a2a2a',
        }}
      >
        <option value="">¿Qué necesitas? ▼</option>
        {SECTORES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
      </select>
      <select
        value={provincia} onChange={e => setProvincia(e.target.value)}
        style={{
          flex: 1, padding: '18px 16px', background: 'transparent', border: 'none',
          color: provincia ? '#F5F5F0' : '#666', fontSize: 15, outline: 'none', cursor: 'pointer',
          borderRight: '1px solid #2a2a2a',
        }}
      >
        <option value="">¿En qué provincia?</option>
        {TODAS_PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
      </select>
      <Link
        href={`/buscar?sector=${sector}&provincia=${provincia}`}
        style={{
          padding: '18px 28px', background: 'linear-gradient(135deg, #FF6B00, #FF9500)',
          color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 15,
          display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #FF8C00, #FFB800)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'linear-gradient(135deg, #FF6B00, #FF9500)' }}
      >
        <Search size={18} /> Buscar
      </Link>
    </div>
  )
}

/* ── Featured Banner ─────────────────────────────────────────────── */
function FeaturedBanner() {
  const [active, setActive] = useState(0)
  const featured = [
    { id: '1', empresa: 'Reformas Martínez & Asociados', sector: 'Reformas Integrales', provincia: 'Madrid', rating: 4.9, reviews: 312, badge: 'Empresa Destacada' },
    { id: '2', empresa: 'Fontanería García Urgencias', sector: 'Fontanería 24h', provincia: 'Barcelona', rating: 4.8, reviews: 228, badge: 'Empresa Destacada' },
    { id: '3', empresa: 'Electricidad Torres Profesional', sector: 'Instalaciones Eléctricas', provincia: 'Valencia', rating: 5.0, reviews: 187, badge: 'Empresa Destacada' },
  ]

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % featured.length), 4000)
    return () => clearInterval(t)
  }, [])

  const f = featured[active]

  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden',
      background: 'linear-gradient(135deg, #1a0800, #111)',
      border: '1px solid rgba(255,184,0,0.2)',
      padding: '24px 28px',
      position: 'relative',
      boxShadow: '0 8px 40px rgba(255,107,0,0.08)',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #FFB800, #FF6B00, #FFB800)' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span className="badge-vip">⭐ {f.badge}</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {featured.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} style={{
              width: i === active ? 20 : 6, height: 6, borderRadius: 3, border: 'none', cursor: 'pointer',
              background: i === active ? '#FF6B00' : '#333', transition: 'all 0.3s',
            }} />
          ))}
        </div>
      </div>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, color: '#F5F5F0', marginBottom: 6 }}>
        {f.empresa}
      </h3>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 12 }}>
        {f.sector} · <MapPin size={12} style={{ display: 'inline' }} /> {f.provincia}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="#FFB800" color="#FFB800" />)}
        </div>
        <span style={{ color: '#FFB800', fontWeight: 700 }}>{f.rating}</span>
        <span style={{ color: '#555', fontSize: 12 }}>({f.reviews} reseñas)</span>
      </div>
      <Link href={`/profesional/${f.id}`} className="btn-orange" style={{ padding: '10px 20px', fontSize: 13 }}>
        Ver perfil completo <ArrowRight size={14} />
      </Link>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   HOME PAGE
   ══════════════════════════════════════════════════════════════════ */
export default function HomePage() {
  const [selectedComunidad, setSelectedComunidad] = useState<{ id: string; label: string } | null>(null)

  const mapCounts: Record<string, number> = {
    andalucia: 342, cataluna: 289, madrid: 412, valencia: 198,
    'pais-vasco': 87, aragon: 64, galicia: 93, murcia: 54,
    'castilla-leon': 76, 'castilla-la-mancha': 43,
    extremadura: 28, asturias: 51, cantabria: 32,
    navarra: 44, 'la-rioja': 18, baleares: 67, canarias: 78,
  }

  return (
    <>
      {/* ══ HERO ════════════════════════════════════════════════════ */}
      <section style={{
        minHeight: '100vh', position: 'relative', display: 'flex',
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '100px 24px 60px', overflow: 'hidden',
      }}>
        {/* Background gradient */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(255,107,0,0.04), transparent)' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,107,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px', opacity: 0.3 }} />

        {/* Particles */}
        <ParticleField />

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: 900, width: '100%' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32,
            padding: '7px 18px', borderRadius: 100,
            background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.2)',
            fontSize: 12, fontWeight: 600, color: '#FF6B00', letterSpacing: '0.12em',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#00E599', animation: 'pulseGlow 2s infinite', display: 'inline-block' }} />
            DIRECTORIO PREMIUM DE PROFESIONALES EN ESPAÑA
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 'clamp(52px, 9vw, 110px)',
            fontWeight: 900, lineHeight: 0.95,
            letterSpacing: '-0.01em', marginBottom: 24,
          }}>
            <span style={{ color: '#F5F5F0' }}>ENCUENTRA AL<br /></span>
            <span style={{
              background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'shimmer 3s linear infinite',
            }}>PROFESIONAL</span>
            <span style={{ color: '#F5F5F0' }}><br />QUE NECESITAS</span>
          </h1>

          <p style={{ color: '#888', fontSize: 18, lineHeight: 1.7, maxWidth: 540, margin: '0 auto 40px', fontWeight: 400 }}>
            Más de <strong style={{ color: '#FF6B00' }}>2.400 profesionales</strong> verificados en fontanería, electricidad, reformas y 20 especialidades más. En tu provincia, ahora.
          </p>

          {/* Search */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
            <SearchBar />
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
            {[
              { value: 2400, suffix: '+', label: 'Profesionales' },
              { value: 50, suffix: '', label: 'Provincias' },
              { value: 98, suffix: '%', label: 'Satisfacción' },
              { value: 1200, suffix: '+', label: 'Presupuestos hoy' },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: '#FF6B00' }}>
                  <AnimatedCounter end={s.value} suffix={s.suffix} />
                </div>
                <div style={{ color: '#555', fontSize: 12, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', animation: 'float 2s ease-in-out infinite', opacity: 0.4 }}>
          <div style={{ width: 24, height: 40, borderRadius: 12, border: '1.5px solid #333', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '6px 0' }}>
            <div style={{ width: 3, height: 8, borderRadius: 2, background: '#FF6B00' }} />
          </div>
        </div>
      </section>

      {/* ══ TICKER ══════════════════════════════════════════════════ */}
      <Ticker />

      {/* ══ SECTORES ════════════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">SECTORES</h2>
            <div className="sep-orange" />
            <p style={{ color: '#666', fontSize: 16, marginTop: 16 }}>Encuentra el profesional que necesitas en más de 20 especialidades</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
            {SECTORES.map(s => (
              <Link key={s.id} href={`/sector/${s.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#111', border: '1px solid #1E1E1E',
                  borderRadius: 14, padding: '20px 12px', textAlign: 'center',
                  transition: 'all 0.25s', cursor: 'pointer',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,0,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.background = 'rgba(255,107,0,0.04)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#1E1E1E'; e.currentTarget.style.transform = ''; e.currentTarget.style.background = '#111' }}
                >
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{s.emoji}</div>
                  <div style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.04em', lineHeight: 1.3 }}>{s.label}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED + MAPA ═════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px', background: 'linear-gradient(160deg, rgba(255,107,0,0.02), transparent)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, alignItems: 'start' }}>
            {/* Left: Featured */}
            <div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>DESTACADOS</h2>
              <div className="sep-orange" style={{ margin: '8px 0 32px' }} />
              <FeaturedBanner />

              <div style={{ marginTop: 24 }}>
                <p style={{ color: '#555', fontSize: 13, marginBottom: 12 }}>¿Quieres aparecer aquí?</p>
                <Link href="/registro" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: 10,
                  border: '1px solid rgba(255,107,0,0.3)', color: '#FF6B00',
                  textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.08)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                >
                  <Zap size={14} /> Reservar espacio destacado
                </Link>
              </div>
            </div>

            {/* Right: Map */}
            <div>
              <h2 className="section-title" style={{ marginBottom: 8 }}>MAPA DE ESPAÑA</h2>
              <div className="sep-orange" style={{ margin: '8px 0 24px' }} />
              <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>
                Haz clic en una comunidad para ver los profesionales de esa zona
              </p>

              <div style={{
                background: '#111', border: '1px solid #1E1E1E', borderRadius: 16,
                padding: '24px', marginBottom: 16,
              }}>
                <SpainMap
                  counts={mapCounts}
                  selectedId={selectedComunidad?.id}
                  onSelectComunidad={(id, label) => setSelectedComunidad({ id, label })}
                />
              </div>

              {selectedComunidad && (
                <div style={{
                  background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.2)',
                  borderRadius: 12, padding: '16px 20px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <div>
                    <span style={{ color: '#FF6B00', fontWeight: 700, fontSize: 15 }}>{selectedComunidad.label}</span>
                    <span style={{ color: '#666', fontSize: 13, marginLeft: 8 }}>
                      {mapCounts[selectedComunidad.id] || 0} profesionales
                    </span>
                  </div>
                  <Link href={`/comunidad/${selectedComunidad.id}`} className="btn-orange" style={{ padding: '9px 16px', fontSize: 13 }}>
                    Ver todos <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROFESIONALES DESTACADOS ════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 className="section-title">PROFESIONALES VIP</h2>
            <div className="sep-orange" />
            <p style={{ color: '#666', fontSize: 15, marginTop: 14 }}>Los mejores valorados de España esta semana</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {MOCK_PROFESIONALES.map(pro => (
              <ProfessionalCard key={pro.id} pro={pro} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/buscar" className="btn-orange" style={{ fontSize: 15 }}>
              Ver todos los profesionales <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ PLANES / CTA PRO ════════════════════════════════════════ */}
      <section style={{ padding: '100px 24px', background: 'linear-gradient(160deg, rgba(255,107,0,0.03), transparent)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 className="section-title">HAZTE VISIBLE</h2>
            <div className="sep-orange" />
            <p style={{ color: '#666', fontSize: 16, marginTop: 16 }}>Elige tu nivel de visibilidad. Empieza gratis, crece cuando quieras.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[
              { plan: 'gratis', label: 'Gratis', price: 0, color: '#666', features: ['Listing básico', 'Nombre y teléfono', 'Sin foto', 'Al final de la lista'] },
              { plan: 'estandar', label: 'Estándar', price: 29, color: '#5B8DEF', features: ['Foto de perfil', 'Descripción', 'Botón WhatsApp', '5 fotos de trabajos'] },
              { plan: 'premium', label: 'Premium', price: 69, color: '#FF6B00', popular: true, features: ['Galería 20 fotos', 'Badge verificado', 'Posición destacada', 'Pin en el mapa', '10 leads/mes'] },
              { plan: 'vip', label: 'VIP', price: 99, color: '#FFB800', features: ['Nº1 en sector+zona', 'Pin dorado en mapa', 'Aparece en portada', 'Leads ilimitados', 'Badge animado'] },
            ].map((p, i) => (
              <div key={i} style={{
                background: p.popular ? 'linear-gradient(160deg, rgba(255,107,0,0.08), #111)' : '#111',
                border: `1px solid ${p.popular ? 'rgba(255,107,0,0.3)' : '#1E1E1E'}`,
                borderRadius: 16, padding: '28px 22px',
                position: 'relative', overflow: 'hidden',
                transform: p.popular ? 'scale(1.04)' : undefined,
                boxShadow: p.popular ? '0 16px 60px rgba(255,107,0,0.12)' : undefined,
              }}>
                {p.popular && (
                  <div style={{ position: 'absolute', top: -1, right: 16, padding: '3px 14px', borderRadius: '0 0 10px 10px', background: '#FF6B00', fontSize: 10, fontWeight: 800, color: '#fff' }}>
                    MÁS POPULAR
                  </div>
                )}
                <div style={{ position: 'absolute', top: -1, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />

                <div style={{ fontSize: 11, letterSpacing: '0.14em', color: p.color, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>{p.label}</div>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 44, fontWeight: 900, color: '#F5F5F0', lineHeight: 1, marginBottom: 20 }}>
                  {p.price === 0 ? 'GRATIS' : `${p.price}€`}
                  {p.price > 0 && <span style={{ fontSize: 16, color: '#555', fontFamily: 'Inter, sans-serif' }}>/mes</span>}
                </div>
                <div style={{ marginBottom: 24 }}>
                  {p.features.map((f, fi) => (
                    <div key={fi} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, fontSize: 13, color: '#888' }}>
                      <CheckCircle size={13} color={p.color} />
                      {f}
                    </div>
                  ))}
                </div>
                <Link href="/registro" style={{
                  display: 'block', textAlign: 'center', padding: '12px', borderRadius: 12,
                  textDecoration: 'none', fontSize: 14, fontWeight: 700, transition: 'all 0.2s',
                  ...(p.popular
                    ? { background: 'linear-gradient(135deg, #FF6B00, #FF9500)', color: '#fff', boxShadow: '0 4px 20px rgba(255,107,0,0.35)' }
                    : { border: `1px solid ${p.color}40`, color: p.color }),
                }}>
                  {p.price === 0 ? 'Registrarme gratis' : 'Empezar ahora →'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ════════════════════════════════════════════ */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <h2 className="section-title" style={{ marginBottom: 8 }}>¿CÓMO FUNCIONA?</h2>
          <div className="sep-orange" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 48 }}>
            {[
              { n: '01', icon: <Search size={32} color="#FF6B00" />, title: 'Busca', desc: 'Introduce el servicio que necesitas y tu provincia. Filtra por plan y valoración.' },
              { n: '02', icon: <Star size={32} color="#FFB800" />, title: 'Elige', desc: 'Consulta las fichas completas con fotos, reseñas y especialidades de cada profesional.' },
              { n: '03', icon: <MessageCircle size={32} color="#00E599" />, title: 'Contacta', desc: 'Llama directamente, escribe por WhatsApp o pide presupuesto online. Gratis siempre.' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '40px 24px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 80, color: 'rgba(255,107,0,0.08)', lineHeight: 1, marginBottom: -16 }}>{s.n}</div>
                <div style={{ marginBottom: 16 }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 900, color: '#F5F5F0', marginBottom: 10 }}>{s.title}</h3>
                <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRESUPUESTOSYA CROSS-PROMO ═══════════════════════════════ */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,107,0,0.06), rgba(255,184,0,0.04))',
            border: '1px solid rgba(255,107,0,0.15)', borderRadius: 20,
            padding: '40px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 13, color: '#FF6B00', fontWeight: 700, letterSpacing: '0.1em', marginBottom: 12 }}>¿QUIERES COMPARAR PRECIOS?</div>
            <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: '#F5F5F0', marginBottom: 12 }}>
              Pide presupuesto a varios profesionales a la vez
            </h3>
            <p style={{ color: '#666', fontSize: 15, marginBottom: 24 }}>
              En PresupuestosYa.es recibes hasta 3 presupuestos de profesionales verificados en tu zona. Gratis y sin compromiso.
            </p>
            <a href="https://presupuestosya.es" target="_blank" rel="noopener noreferrer" className="btn-orange" style={{ fontSize: 15 }}>
              Pedir presupuestos gratis en PresupuestosYa →
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

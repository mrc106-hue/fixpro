'use client'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Star, Phone, MessageCircle, MapPin, Shield, Clock, Award, ChevronRight } from 'lucide-react'
import { MOCK_PROFESIONALES, SECTORES } from '@/lib/data'

export default function ProfesionalPage() {
  const params = useParams()
  const slug   = params?.slug as string

  // Try to find by id or by nombre slug
  const pro = MOCK_PROFESIONALES.find(p =>
    p.id === slug || p.nombre.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === slug
  ) || MOCK_PROFESIONALES[0] // fallback for demo

  const sector = SECTORES.find(s => s.id === pro.sector)

  const planColors: Record<string, string> = {
    vip: '#FFB800', premium: '#FF6B00', estandar: '#5B8DEF', gratis: '#666'
  }
  const planColor = planColors[pro.plan] || '#666'

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(pro.valoracion) ? 'full' : i < pro.valoracion ? 'half' : 'empty')

  // Mock reviews
  const reviews = [
    { autor: 'María G.', fecha: 'hace 2 días',   val: 5, texto: 'Excelente profesional. Llegó puntual, trabajo limpio y precio justo. Totalmente recomendable.' },
    { autor: 'Carlos M.', fecha: 'hace 1 semana', val: 5, texto: 'Muy profesional y rápido. Solucionó el problema en menos de una hora. Volveré a contratarle.' },
    { autor: 'Ana R.',    fecha: 'hace 2 semanas',val: 4, texto: 'Buen trabajo en general. La comunicación previa fue perfecta. Pequeño retraso en la llegada pero compensado por la calidad.' },
  ]

  // Mock gallery
  const galleryColors = ['#1a1a1a', '#1E1A14', '#141A1E', '#1A1E14', '#1E141A']

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(160deg, rgba(${pro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.08), transparent)`,
        borderBottom: '1px solid #1E1E1E', padding: '40px 24px',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Link href={`/sector/${pro.sector}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 24 }}>
            <ArrowLeft size={14} /> {sector?.label}
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'start' }}>
            <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
              {/* Avatar */}
              <div style={{
                width: 100, height: 100, borderRadius: 20, flexShrink: 0,
                background: `linear-gradient(135deg, rgba(${pro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.2), #111)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: `2px solid ${planColor}`, fontSize: 40,
              }}>
                {sector?.emoji}
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                  <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(28px,4vw,48px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 1 }}>
                    {pro.nombre}
                  </h1>
                  {(pro.plan === 'premium' || pro.plan === 'vip') && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, background: `rgba(${pro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.15)`, border: `1px solid ${planColor}`, borderRadius: 20, padding: '3px 10px' }}>
                      <Shield size={11} color={planColor} />
                      <span style={{ color: planColor, fontSize: 11, fontWeight: 700 }}>VERIFICADO</span>
                    </div>
                  )}
                  <span style={{ background: `rgba(${pro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.15)`, color: planColor, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, border: `1px solid ${planColor}`, textTransform: 'uppercase' }}>
                    {pro.plan}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {stars.map((s, i) => (
                      <Star key={i} size={16} fill={s !== 'empty' ? '#FFB800' : 'none'} color="#FFB800" />
                    ))}
                    <span style={{ color: '#FFB800', fontWeight: 700, fontSize: 15, marginLeft: 4 }}>{pro.valoracion}</span>
                    <span style={{ color: '#555', fontSize: 13 }}>({pro.total_val} valoraciones)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#666', fontSize: 13 }}>
                    <MapPin size={13} color="#FF6B00" /> {pro.provincia}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#666', fontSize: 13 }}>
                    <Clock size={13} color="#FF6B00" /> Responde en &lt;1h
                  </div>
                </div>
                <p style={{ color: '#888', fontSize: 14, marginTop: 12, maxWidth: 500, lineHeight: 1.6 }}>{pro.descripcion}</p>
              </div>
            </div>

            {/* Contact box */}
            <div style={{ background: '#111', border: `1px solid ${planColor}20`, borderRadius: 16, padding: 24, minWidth: 220, textAlign: 'center' }}>
              <p style={{ color: '#888', fontSize: 12, marginBottom: 12 }}>Contacta ahora</p>
              <a href={`https://wa.me/${pro.whatsapp}`} target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: 14, marginBottom: 10 }}>
                <MessageCircle size={16} /> WhatsApp
              </a>
              <a href={`tel:+${pro.whatsapp}`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#111', border: '1px solid #2a2a2a', color: '#F5F5F0', textDecoration: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 600, fontSize: 14, marginBottom: 16 }}>
                <Phone size={16} /> Llamar
              </a>
              <Link href="/presupuesto" style={{
                display: 'block', background: 'linear-gradient(135deg, #FF6B00, #FF8C30)',
                color: '#fff', textDecoration: 'none', padding: '12px 20px', borderRadius: 10, fontWeight: 700, fontSize: 13,
              }}>
                Pedir presupuesto
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32 }}>

          {/* Left */}
          <div>
            {/* Gallery */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 16 }}>
                Galería de trabajos
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
                {Array.from({ length: pro.plan === 'vip' ? 6 : pro.plan === 'premium' ? 4 : 2 }).map((_, i) => (
                  <div key={i} style={{
                    height: 160, borderRadius: 12, background: galleryColors[i % galleryColors.length],
                    border: '1px solid #1E1E1E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 36, opacity: 0.6,
                  }}>
                    {sector?.emoji}
                  </div>
                ))}
              </div>
            </section>

            {/* Specialties */}
            <section style={{ marginBottom: 40 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 16 }}>
                Especialidades
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Urgencias 24h', 'Presupuesto gratis', 'Garantía 2 años', 'Factura oficial', 'Seguro de responsabilidad civil'].map(tag => (
                  <span key={tag} style={{ padding: '6px 14px', borderRadius: 20, background: '#111', border: '1px solid #2a2a2a', color: '#888', fontSize: 13 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0' }}>
                  Valoraciones ({pro.total_val})
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Star size={18} fill="#FFB800" color="#FFB800" />
                  <span style={{ color: '#FFB800', fontWeight: 700, fontSize: 18 }}>{pro.valoracion}</span>
                  <span style={{ color: '#555', fontSize: 13 }}>/ 5</span>
                </div>
              </div>

              {reviews.map((r, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: 20, marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', fontWeight: 700, fontSize: 14 }}>
                        {r.autor[0]}
                      </div>
                      <div>
                        <p style={{ color: '#F5F5F0', fontSize: 14, fontWeight: 600 }}>{r.autor}</p>
                        <p style={{ color: '#555', fontSize: 12 }}>{r.fecha}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>
                      {Array.from({ length: r.val }).map((_, j) => <Star key={j} size={13} fill="#FFB800" color="#FFB800" />)}
                    </div>
                  </div>
                  <p style={{ color: '#888', fontSize: 14, lineHeight: 1.6 }}>{r.texto}</p>
                </div>
              ))}
            </section>
          </div>

          {/* Right sidebar */}
          <aside>
            {/* Stats */}
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#F5F5F0', marginBottom: 16 }}>Estadísticas</h3>
              {[
                { icon: '⭐', label: 'Valoración media', value: `${pro.valoracion}/5` },
                { icon: '📋', label: 'Total valoraciones', value: pro.total_val.toString() },
                { icon: '📍', label: 'Provincia', value: pro.provincia },
                { icon: '🔧', label: 'Sector', value: sector?.label || '' },
                { icon: '✅', label: 'En FixPro desde', value: '2024' },
              ].map(stat => (
                <div key={stat.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{stat.icon} {stat.label}</span>
                  <span style={{ color: '#F5F5F0', fontSize: 13, fontWeight: 600 }}>{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Badges */}
            {(pro.plan === 'premium' || pro.plan === 'vip') && (
              <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24, marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 18, fontWeight: 700, color: '#F5F5F0', marginBottom: 16 }}>Badges</h3>
                {[
                  { icon: '🛡️', label: 'Profesional Verificado' },
                  { icon: '⚡', label: 'Respuesta Rápida' },
                  { icon: '🏆', label: 'Top Valorado' },
                  ...(pro.plan === 'vip' ? [{ icon: '👑', label: 'Profesional VIP' }] : []),
                ].map(badge => (
                  <div key={badge.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                    <span style={{ fontSize: 18 }}>{badge.icon}</span>
                    <span style={{ color: '#888', fontSize: 13 }}>{badge.label}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTA upgrade (if gratis/estandar) */}
            {(pro.plan === 'gratis' || pro.plan === 'estandar') && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(255,107,0,0.08), rgba(255,184,0,0.04))',
                border: '1px solid rgba(255,107,0,0.2)', borderRadius: 16, padding: 24,
              }}>
                <Award size={24} color="#FF6B00" style={{ marginBottom: 12 }} />
                <p style={{ color: '#F5F5F0', fontSize: 15, fontWeight: 700, marginBottom: 6 }}>¿Eres este profesional?</p>
                <p style={{ color: '#666', fontSize: 13, marginBottom: 16 }}>Mejora tu perfil con más fotos, badge verificado y posición destacada.</p>
                <Link href="/registro" style={{
                  display: 'block', textAlign: 'center', background: 'linear-gradient(135deg, #FF6B00, #FF8C30)',
                  color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: 10, fontWeight: 700, fontSize: 13,
                }}>
                  Mejorar mi perfil →
                </Link>
              </div>
            )}
          </aside>
        </div>

        {/* Similar pros */}
        <section style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0' }}>
              Más {sector?.label} en {pro.provincia}
            </h2>
            <Link href={`/sector/${pro.sector}`} style={{ color: '#FF6B00', textDecoration: 'none', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>
              Ver todos <ChevronRight size={14} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {MOCK_PROFESIONALES.filter(p => p.sector === pro.sector && p.id !== pro.id).slice(0, 3).map(p => (
              <Link key={p.id} href={`/profesional/${p.id}`} style={{ textDecoration: 'none', display: 'block', background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: 16, transition: 'border-color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#FF6B00')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E1E1E')}
              >
                <p style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.nombre}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Star size={12} fill="#FFB800" color="#FFB800" />
                  <span style={{ color: '#FFB800', fontSize: 12 }}>{p.valoracion}</span>
                  <span style={{ color: '#555', fontSize: 12 }}>({p.total_val})</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

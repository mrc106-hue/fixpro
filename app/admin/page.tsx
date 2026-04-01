'use client'
import { useState } from 'react'
import { Users, TrendingUp, DollarSign, AlertCircle, Check, X, Search, Shield, Settings } from 'lucide-react'
import { SECTORES, MOCK_PROFESIONALES } from '@/lib/data'

// Admin only: mrc106@gmail.com
const ADMIN_EMAIL = 'mrc106@gmail.com'

const mockStats = [
  { label: 'Profesionales activos', value: '847', icon: <Users size={20} />, color: '#5B8DEF' },
  { label: 'Leads este mes',        value: '2.341', icon: <TrendingUp size={20} />, color: '#22c55e' },
  { label: 'MRR',                   value: '18.420€', icon: <DollarSign size={20} />, color: '#FFB800' },
  { label: 'Pendientes revisión',   value: '12', icon: <AlertCircle size={20} />, color: '#FF6B00' },
]

const mockPendingPros = [
  { id: 'p1', nombre: 'Electricidad Ruiz', sector: 'electricidad', provincia: 'Madrid', plan: 'premium', email: 'ruiz@electricidad.es', fecha: 'hace 1h' },
  { id: 'p2', nombre: 'Reformas Pérez SL', sector: 'reformas', provincia: 'Barcelona', plan: 'vip', email: 'info@reformasperez.es', fecha: 'hace 3h' },
  { id: 'p3', nombre: 'Jardinería Verde', sector: 'jardineria', provincia: 'Valencia', plan: 'estandar', email: 'verde@jardines.es', fecha: 'hace 5h' },
]

export default function AdminPage() {
  const [tab, setTab]         = useState(0)
  const [search, setSearch]   = useState('')
  const [pending, setPending] = useState(mockPendingPros)

  const approve = (id: string) => setPending(p => p.filter(x => x.id !== id))
  const reject  = (id: string) => setPending(p => p.filter(x => x.id !== id))

  const planColors: Record<string, string> = { vip: '#FFB800', premium: '#FF6B00', estandar: '#5B8DEF', gratis: '#666' }

  const allPros = [...MOCK_PROFESIONALES, ...MOCK_PROFESIONALES.map(p => ({ ...p, id: p.id + 'x', nombre: p.nombre + ' 2' }))]
  const filtered = allPros.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Admin header */}
      <div style={{ background: '#0D0D0D', borderBottom: '1px solid rgba(255,107,0,0.2)', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Shield size={20} color="#FF6B00" />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 22, fontWeight: 900, color: '#F5F5F0' }}>
              FixPro <span style={{ color: '#FF6B00' }}>Admin</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
            <span style={{ color: '#666', fontSize: 13 }}>{ADMIN_EMAIL}</span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {mockStats.map((s, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, padding: 20 }}>
              <div style={{ color: s.color, marginBottom: 12 }}>{s.icon}</div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: '#F5F5F0', marginBottom: 4 }}>{s.value}</p>
              <p style={{ color: '#666', fontSize: 13 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#0D0D0D', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {['Pendientes', 'Profesionales', 'Leads', 'Ingresos', 'Configuración'].map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                background: tab === i ? '#FF6B00' : 'transparent',
                color: tab === i ? '#fff' : '#666',
              }}>
              {t}
              {i === 0 && pending.length > 0 && (
                <span style={{ marginLeft: 6, background: tab === 0 ? 'rgba(255,255,255,0.3)' : '#FF6B00', color: '#fff', fontSize: 10, fontWeight: 700, padding: '1px 6px', borderRadius: 10 }}>
                  {pending.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab: Pendientes */}
        {tab === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>
              Solicitudes pendientes de revisión ({pending.length})
            </h2>
            {pending.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 24px', color: '#555' }}>
                <Check size={40} style={{ margin: '0 auto 16px', color: '#22c55e' }} />
                <p style={{ fontSize: 16 }}>Todo al día. No hay solicitudes pendientes.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {pending.map(p => {
                  const sector = SECTORES.find(s => s.id === p.sector)
                  return (
                    <div key={p.id} style={{ background: '#111', border: '1px solid rgba(255,107,0,0.2)', borderRadius: 14, padding: 20, display: 'flex', gap: 16, alignItems: 'center' }}>
                      <div style={{ width: 48, height: 48, borderRadius: 12, background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>
                        {sector?.emoji}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                          <p style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 15 }}>{p.nombre}</p>
                          <span style={{ background: `rgba(${p.plan === 'vip' ? '255,184,0' : '255,107,0'},0.15)`, color: planColors[p.plan], fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase' }}>
                            {p.plan}
                          </span>
                        </div>
                        <p style={{ color: '#666', fontSize: 13 }}>{p.email} · {sector?.label} · {p.provincia} · {p.fecha}</p>
                      </div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button onClick={() => approve(p.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#22c55e', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                          <Check size={14} /> Aprobar
                        </button>
                        <button onClick={() => reject(p.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid #ef4444', color: '#ef4444', padding: '8px 16px', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: 13 }}>
                          <X size={14} /> Rechazar
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab: Profesionales */}
        {tab === 1 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0' }}>
                Todos los profesionales ({filtered.length})
              </h2>
              <div style={{ position: 'relative' }}>
                <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#555' }} />
                <input placeholder="Buscar profesional..." value={search} onChange={e => setSearch(e.target.value)}
                  style={{ background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '10px 12px 10px 32px', borderRadius: 10, fontSize: 13, outline: 'none', width: 240 }}
                />
              </div>
            </div>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 100px 100px', gap: 16, padding: '12px 20px', background: '#0D0D0D', borderBottom: '1px solid #1E1E1E' }}>
                {['Nombre', 'Sector', 'Provincia', 'Plan', 'Valoración', 'Acciones'].map(col => (
                  <span key={col} style={{ color: '#555', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em' }}>{col.toUpperCase()}</span>
                ))}
              </div>
              {filtered.map((p, i) => {
                const sector = SECTORES.find(s => s.id === p.sector)
                return (
                  <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 100px 100px 100px', gap: 16, padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #1a1a1a' : 'none', alignItems: 'center' }}>
                    <span style={{ color: '#F5F5F0', fontSize: 14, fontWeight: 500 }}>{p.nombre}</span>
                    <span style={{ color: '#888', fontSize: 13 }}>{sector?.emoji} {sector?.label}</span>
                    <span style={{ color: '#888', fontSize: 13 }}>{p.provincia}</span>
                    <span style={{ background: `rgba(${p.plan === 'vip' ? '255,184,0' : p.plan === 'premium' ? '255,107,0' : '91,141,239'},0.15)`, color: planColors[p.plan], fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 20, textTransform: 'uppercase', display: 'inline-block' }}>
                      {p.plan}
                    </span>
                    <span style={{ color: '#FFB800', fontSize: 13, fontWeight: 600 }}>⭐ {p.valoracion}</span>
                    <button style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontSize: 12 }}>
                      Ver
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Tab: Leads */}
        {tab === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>Leads del sistema</h2>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, padding: 24, textAlign: 'center', color: '#555' }}>
              <TrendingUp size={40} style={{ margin: '0 auto 16px' }} />
              <p>2.341 leads distribuidos este mes entre los profesionales activos</p>
            </div>
          </div>
        )}

        {/* Tab: Ingresos */}
        {tab === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>Ingresos</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { plan: 'VIP', precio: 99, count: 89, color: '#FFB800' },
                { plan: 'Premium', precio: 69, count: 143, color: '#FF6B00' },
                { plan: 'Estándar', precio: 29, count: 276, color: '#5B8DEF' },
                { plan: 'Gratis', precio: 0, count: 339, color: '#666' },
              ].map(p => (
                <div key={p.plan} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ color: p.color, fontWeight: 700, fontSize: 16 }}>{p.plan}</span>
                    <span style={{ color: '#666', fontSize: 13 }}>{p.count} profesionales</span>
                  </div>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: '#F5F5F0', marginBottom: 4 }}>
                    {(p.precio * p.count).toLocaleString('es-ES')}€
                  </p>
                  <p style={{ color: '#555', fontSize: 13 }}>MRR de este plan</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Config */}
        {tab === 4 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>Configuración</h2>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, padding: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <Settings size={20} color="#FF6B00" />
                <h3 style={{ color: '#F5F5F0', fontSize: 18, fontWeight: 700 }}>Variables de sistema</h3>
              </div>
              {[
                { label: 'Supabase URL', value: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xxx.supabase.co' },
                { label: 'Stripe modo', value: 'Live (producción)' },
                { label: 'Email admin', value: ADMIN_EMAIL },
                { label: 'Railway service', value: 'fixpro' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{item.label}</span>
                  <span style={{ color: '#F5F5F0', fontSize: 13, fontFamily: 'monospace' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

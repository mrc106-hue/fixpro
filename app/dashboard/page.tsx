'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Star, Phone, MessageCircle, Eye, TrendingUp, Users, Bell, Settings, LogOut, ChevronRight, Check } from 'lucide-react'
import { SECTORES } from '@/lib/data'

// Mock data for the dashboard
const mockPro = {
  nombre: 'Fontanería García',
  sector: 'fontaneria',
  provincia: 'Madrid',
  plan: 'vip',
  valoracion: 4.9,
  total_val: 127,
  descripcion: 'Más de 15 años de experiencia en fontanería residencial e industrial. Urgencias 24h.',
  whatsapp: '34600000001',
  email: 'garcia@fontaneria.es',
  telefono: '600000001',
}

const mockLeads = [
  { id: 1, nombre: 'María García', descripcion: 'Fuga de agua en cocina, urgente', provincia: 'Madrid', sector: 'fontaneria', fecha: 'hace 2h', estado: 'nuevo', telefono: '34611111111' },
  { id: 2, nombre: 'Carlos M.', descripcion: 'Instalación de calentador nuevo', provincia: 'Madrid', sector: 'fontaneria', fecha: 'hace 5h', estado: 'contactado', telefono: '34622222222' },
  { id: 3, nombre: 'Ana López', descripcion: 'Reparación de cisterna baño', provincia: 'Alcobendas', sector: 'fontaneria', fecha: 'hace 1 día', estado: 'cerrado', telefono: '34633333333' },
  { id: 4, nombre: 'Juan R.', descripcion: 'Cambio grifería baño y cocina', provincia: 'Getafe', sector: 'fontaneria', fecha: 'hace 2 días', estado: 'contactado', telefono: '34644444444' },
]

const mockStats = [
  { label: 'Vistas este mes', value: '847', icon: <Eye size={20} />, delta: '+12%', positive: true },
  { label: 'Leads recibidos', value: '34', icon: <Users size={20} />, delta: '+8%', positive: true },
  { label: 'Valoración media', value: '4.9', icon: <Star size={20} />, delta: '=', positive: true },
  { label: 'Clics WhatsApp', value: '156', icon: <MessageCircle size={20} />, delta: '+22%', positive: true },
]

const TABS = ['Leads', 'Estadísticas', 'Mi perfil', 'Plan']

const estadoColors: Record<string, string> = { nuevo: '#FF6B00', contactado: '#5B8DEF', cerrado: '#22c55e' }

export default function DashboardPage() {
  const [tab, setTab]     = useState(0)
  const [leads, setLeads] = useState(mockLeads)

  const sector = SECTORES.find(s => s.id === mockPro.sector)
  const planColors: Record<string, string> = { vip: '#FFB800', premium: '#FF6B00', estandar: '#5B8DEF', gratis: '#666' }
  const planColor = planColors[mockPro.plan]

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ background: '#0D0D0D', borderBottom: '1px solid #1E1E1E', padding: '16px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: `rgba(${mockPro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.15)`, border: `1px solid ${planColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
              {sector?.emoji}
            </div>
            <div>
              <p style={{ color: '#F5F5F0', fontWeight: 700, fontSize: 15 }}>{mockPro.nombre}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ background: `rgba(${mockPro.plan === 'vip' ? '255,184,0' : '255,107,0'},0.15)`, color: planColor, fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                  {mockPro.plan.toUpperCase()}
                </span>
                <span style={{ color: '#555', fontSize: 12 }}>{mockPro.provincia}</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button style={{ background: 'transparent', border: '1px solid #1E1E1E', borderRadius: 8, padding: '8px', cursor: 'pointer', color: '#666' }}>
              <Bell size={16} />
            </button>
            <button style={{ background: 'transparent', border: '1px solid #1E1E1E', borderRadius: 8, padding: '8px', cursor: 'pointer', color: '#666' }}>
              <Settings size={16} />
            </button>
            <button style={{ background: 'transparent', border: '1px solid #1E1E1E', borderRadius: 8, padding: '8px 12px', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
              <LogOut size={14} /> Salir
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
          {mockStats.map((s, i) => (
            <div key={i} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 14, padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ color: '#555' }}>{s.icon}</div>
                <span style={{ color: s.positive ? '#22c55e' : '#ef4444', fontSize: 12, fontWeight: 600 }}>{s.delta}</span>
              </div>
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: '#F5F5F0', marginBottom: 4 }}>{s.value}</p>
              <p style={{ color: '#666', fontSize: 13 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 24, background: '#0D0D0D', borderRadius: 12, padding: 4, width: 'fit-content' }}>
          {TABS.map((t, i) => (
            <button key={i} onClick={() => setTab(i)}
              style={{ padding: '8px 20px', borderRadius: 10, border: 'none', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s',
                background: tab === i ? '#FF6B00' : 'transparent',
                color: tab === i ? '#fff' : '#666',
              }}>
              {t}
            </button>
          ))}
        </div>

        {/* Tab: Leads */}
        {tab === 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0' }}>
                Leads recibidos ({leads.filter(l => l.estado === 'nuevo').length} nuevos)
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {leads.map(lead => (
                <div key={lead.id} style={{
                  background: '#111', border: `1px solid ${lead.estado === 'nuevo' ? 'rgba(255,107,0,0.3)' : '#1E1E1E'}`,
                  borderRadius: 14, padding: 20, display: 'flex', gap: 20, alignItems: 'center',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                      <p style={{ color: '#F5F5F0', fontWeight: 600, fontSize: 15 }}>{lead.nombre}</p>
                      <span style={{ background: `${estadoColors[lead.estado]}20`, color: estadoColors[lead.estado], fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20, textTransform: 'uppercase' }}>
                        {lead.estado}
                      </span>
                      {lead.estado === 'nuevo' && (
                        <span style={{ background: 'rgba(255,107,0,0.1)', color: '#FF6B00', fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 20 }}>
                          ● NUEVO
                        </span>
                      )}
                    </div>
                    <p style={{ color: '#888', fontSize: 14, marginBottom: 4 }}>{lead.descripcion}</p>
                    <p style={{ color: '#555', fontSize: 12 }}>📍 {lead.provincia} · {lead.fecha}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                    <a href={`https://wa.me/${lead.telefono}`} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#25D366', color: '#fff', textDecoration: 'none', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    <a href={`tel:+${lead.telefono}`}
                      style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#111', border: '1px solid #2a2a2a', color: '#F5F5F0', textDecoration: 'none', padding: '8px 14px', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
                      <Phone size={14} /> Llamar
                    </a>
                    {lead.estado === 'nuevo' && (
                      <button onClick={() => setLeads(ls => ls.map(l => l.id === lead.id ? { ...l, estado: 'contactado' } : l))}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '8px 14px', borderRadius: 8, fontSize: 13, cursor: 'pointer' }}>
                        <Check size={14} /> Marcar contactado
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Estadísticas */}
        {tab === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 24 }}>Estadísticas del perfil</h2>
            {/* Simple bar chart mock */}
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24, marginBottom: 20 }}>
              <h3 style={{ color: '#888', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 20 }}>VISTAS POR DÍA (ÚLTIMOS 7 DÍAS)</h3>
              <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 120 }}>
                {[45, 67, 89, 54, 120, 98, 134].map((v, i) => (
                  <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: '100%', height: `${(v / 134) * 100}px`, background: `rgba(255,107,0,${0.3 + (v / 134) * 0.7})`, borderRadius: '4px 4px 0 0', transition: 'all 0.3s' }} />
                    <span style={{ color: '#555', fontSize: 11 }}>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][i]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { title: 'Fuentes de tráfico', items: [{ label: 'Búsqueda por sector', pct: 45 }, { label: 'Mapa interactivo', pct: 28 }, { label: 'Búsqueda por provincia', pct: 18 }, { label: 'Portada FixPro', pct: 9 }] },
                { title: 'Acciones realizadas', items: [{ label: 'Ver número de teléfono', pct: 52 }, { label: 'Clic en WhatsApp', pct: 34 }, { label: 'Solicitar presupuesto', pct: 14 }] },
              ].map((block, i) => (
                <div key={i} style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24 }}>
                  <h3 style={{ color: '#888', fontSize: 13, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 16 }}>{block.title.toUpperCase()}</h3>
                  {block.items.map(item => (
                    <div key={item.label} style={{ marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ color: '#888', fontSize: 13 }}>{item.label}</span>
                        <span style={{ color: '#F5F5F0', fontSize: 13, fontWeight: 600 }}>{item.pct}%</span>
                      </div>
                      <div style={{ height: 4, background: '#1E1E1E', borderRadius: 2 }}>
                        <div style={{ height: 4, background: '#FF6B00', borderRadius: 2, width: `${item.pct}%`, transition: 'width 0.5s' }} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab: Mi perfil */}
        {tab === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 24 }}>Editar mi perfil</h2>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[
                  { label: 'NOMBRE / EMPRESA', value: mockPro.nombre, key: 'nombre' },
                  { label: 'EMAIL', value: mockPro.email, key: 'email' },
                  { label: 'TELÉFONO', value: mockPro.telefono, key: 'telefono' },
                  { label: 'WHATSAPP (CON PREFIJO)', value: mockPro.whatsapp, key: 'whatsapp' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>{f.label}</label>
                    <input defaultValue={f.value}
                      style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                      onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                      onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                    />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>DESCRIPCIÓN</label>
                <textarea defaultValue={mockPro.descripcion} rows={4}
                  style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                  onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                />
              </div>
              <button style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
                Guardar cambios
              </button>
            </div>
          </div>
        )}

        {/* Tab: Plan */}
        {tab === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 8 }}>Tu plan actual</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Gestiona tu suscripción y cambia de plan cuando quieras.</p>
            <div style={{ background: `rgba(255,184,0,0.06)`, border: `1px solid rgba(255,184,0,0.2)`, borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div>
                  <p style={{ color: '#FFB800', fontSize: 13, fontWeight: 700, marginBottom: 4 }}>👑 PLAN VIP ACTIVO</p>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 36, fontWeight: 900, color: '#F5F5F0' }}>99€ <span style={{ fontSize: 18, color: '#666' }}>/ mes</span></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ color: '#666', fontSize: 13 }}>Próxima factura</p>
                  <p style={{ color: '#F5F5F0', fontWeight: 600 }}>1 Mayo 2026</p>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                {['Posición nº1 en sector+provincia', 'Pin dorado en mapa', 'Aparece en portada', 'Leads ilimitados', 'Badge VIP animado', 'Galería 20 fotos'].map(f => (
                  <div key={f} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                    <Check size={13} color="#FFB800" />
                    <span style={{ color: '#888', fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '12px 24px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                Cancelar suscripción
              </button>
              <Link href="/registro" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', textDecoration: 'none', padding: '12px 24px', borderRadius: 10, fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Ver facturas <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

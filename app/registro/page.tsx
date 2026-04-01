'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Shield, Star, Zap, Crown } from 'lucide-react'
import { SECTORES, TODAS_PROVINCIAS, PLANES } from '@/lib/data'

const STEPS = ['Tu perfil', 'Tu negocio', 'Elige plan', 'Confirmar']

export default function RegistroPage() {
  const [step, setStep]           = useState(0)
  const [planSel, setPlanSel]     = useState('premium')
  const [sending, setSending]     = useState(false)
  const [done, setDone]           = useState(false)
  const [form, setForm]           = useState({
    nombre: '', email: '', telefono: '', whatsapp: '',
    sector: '', provincia: '', descripcion: '',
    web: '', instagram: '', anos_experiencia: '',
  })

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async () => {
    setSending(true)
    await new Promise(r => setTimeout(r, 1500))
    setSending(false)
    setDone(true)
  }

  if (done) return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,107,0,0.1)', border: '2px solid #FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>
          ✅
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 900, color: '#F5F5F0', marginBottom: 12 }}>
          ¡YA ESTÁS EN FIXPRO!
        </h1>
        <p style={{ color: '#888', fontSize: 16, lineHeight: 1.6, marginBottom: 32 }}>
          Hemos recibido tu solicitud. En menos de 24 horas activaremos tu perfil y empezarás a recibir clientes.
        </p>
        <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'left' }}>
          <p style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>Próximos pasos:</p>
          {['Revisamos tu perfil (24h máx)', 'Activamos tu listing', 'Empiezas a recibir solicitudes', 'Gestiona todo desde tu dashboard'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: '#fff', fontSize: 10, fontWeight: 700 }}>{i + 1}</span>
              </div>
              <span style={{ color: '#888', fontSize: 13 }}>{s}</span>
            </div>
          ))}
        </div>
        <Link href="/" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700 }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  )

  const planIcons: Record<string, React.ReactNode> = {
    gratis: <span>🆓</span>,
    estandar: <Zap size={20} color="#5B8DEF" />,
    premium: <Star size={20} color="#FF6B00" />,
    vip: <Crown size={20} color="#FFB800" />,
  }

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, rgba(255,107,0,0.06), transparent)', borderBottom: '1px solid #1E1E1E', padding: '40px 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 20 }}>
            <ArrowLeft size={14} /> Inicio
          </Link>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 1, marginBottom: 8 }}>
            REGÍSTRATE COMO PROFESIONAL
          </h1>
          <p style={{ color: '#666', fontSize: 15 }}>Empieza gratis, sin tarjeta. En 5 minutos.</p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '40px 24px' }}>
        {/* Steps */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              {i > 0 && <div style={{ position: 'absolute', top: 16, left: '-50%', right: '50%', height: 2, background: i <= step ? '#FF6B00' : '#1E1E1E' }} />}
              <div style={{
                width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: i < step ? '#FF6B00' : i === step ? 'rgba(255,107,0,0.15)' : '#111',
                border: `2px solid ${i <= step ? '#FF6B00' : '#2a2a2a'}`,
                marginBottom: 8, fontSize: 13, fontWeight: 700,
                color: i < step ? '#fff' : i === step ? '#FF6B00' : '#555',
              }}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 12, color: i === step ? '#F5F5F0' : '#555', textAlign: 'center' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Step 0: Perfil */}
        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#F5F5F0', marginBottom: 24 }}>Tu perfil</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { key: 'nombre', label: 'Nombre / Empresa *', placeholder: 'Ej: Fontanería García', type: 'text' },
                { key: 'email', label: 'Email *', placeholder: 'tu@email.com', type: 'email' },
                { key: 'telefono', label: 'Teléfono *', placeholder: '600 000 000', type: 'tel' },
                { key: 'whatsapp', label: 'WhatsApp (con prefijo)', placeholder: '34600000000', type: 'tel' },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>{f.label.toUpperCase()}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>
              ))}
            </div>
            <button onClick={() => setStep(1)} disabled={!form.nombre || !form.email || !form.telefono}
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!form.nombre || !form.email || !form.telefono) ? 0.5 : 1 }}>
              Siguiente →
            </button>
          </div>
        )}

        {/* Step 1: Negocio */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#F5F5F0', marginBottom: 24 }}>Tu negocio</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              <div>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>SECTOR *</label>
                <select value={form.sector} onChange={e => set('sector', e.target.value)}
                  style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: form.sector ? '#F5F5F0' : '#666', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none' }}>
                  <option value="">Selecciona tu sector</option>
                  {SECTORES.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.label}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>PROVINCIA *</label>
                <select value={form.provincia} onChange={e => set('provincia', e.target.value)}
                  style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: form.provincia ? '#F5F5F0' : '#666', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none' }}>
                  <option value="">Selecciona provincia</option>
                  {TODAS_PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>AÑOS DE EXPERIENCIA</label>
                <input type="number" min={0} max={50} placeholder="10" value={form.anos_experiencia}
                  onChange={e => set('anos_experiencia', e.target.value)}
                  style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>WEB (OPCIONAL)</label>
                <input type="url" placeholder="https://tuweb.es" value={form.web}
                  onChange={e => set('web', e.target.value)}
                  style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 }}>DESCRIPCIÓN *</label>
              <textarea placeholder="Describe tus servicios, experiencia, zona de trabajo..." value={form.descripcion}
                onChange={e => set('descripcion', e.target.value)} rows={4}
                style={{ width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a', color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14, outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(0)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={() => setStep(2)} disabled={!form.sector || !form.provincia || !form.descripcion}
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!form.sector || !form.provincia || !form.descripcion) ? 0.5 : 1 }}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Plan */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#F5F5F0', marginBottom: 8 }}>Elige tu plan</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Empieza gratis y actualiza cuando quieras.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 24 }}>
              {PLANES.map(p => {
                const isSelected = planSel === p.id
                const color = p.color
                return (
                  <div key={p.id} onClick={() => setPlanSel(p.id)}
                    style={{
                      background: isSelected ? `rgba(${p.id === 'vip' ? '255,184,0' : p.id === 'premium' ? '255,107,0' : p.id === 'estandar' ? '91,141,239' : '102,102,102'},0.08)` : '#111',
                      border: `2px solid ${isSelected ? color : '#1E1E1E'}`,
                      borderRadius: 16, padding: 20, cursor: 'pointer', transition: 'all 0.2s', position: 'relative',
                    }}>
                    {p.popular && <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#FF6B00', color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>MÁS POPULAR</div>}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      {planIcons[p.id]}
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 20, fontWeight: 900, color: color }}>{p.label.toUpperCase()}</span>
                    </div>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 32, fontWeight: 900, color: '#F5F5F0', marginBottom: 12 }}>
                      {p.precio === 0 ? 'Gratis' : `${p.precio}€/mes`}
                    </p>
                    {p.features.slice(0, 3).map(f => (
                      <div key={f} style={{ display: 'flex', gap: 6, alignItems: 'center', marginBottom: 6 }}>
                        <Check size={12} color={color} />
                        <span style={{ color: '#888', fontSize: 12 }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(1)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={() => setStep(3)}
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer' }}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 28, fontWeight: 700, color: '#F5F5F0', marginBottom: 24 }}>Confirmar registro</h2>
            <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 16, padding: 24, marginBottom: 24 }}>
              <h3 style={{ color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.1em', marginBottom: 16 }}>RESUMEN</h3>
              {[
                { label: 'Nombre', value: form.nombre },
                { label: 'Email', value: form.email },
                { label: 'Teléfono', value: form.telefono },
                { label: 'Sector', value: SECTORES.find(s => s.id === form.sector)?.label || form.sector },
                { label: 'Provincia', value: form.provincia },
                { label: 'Plan', value: `${PLANES.find(p => p.id === planSel)?.label} — ${PLANES.find(p => p.id === planSel)?.precio === 0 ? 'Gratis' : `${PLANES.find(p => p.id === planSel)?.precio}€/mes`}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #1a1a1a' }}>
                  <span style={{ color: '#666', fontSize: 13 }}>{row.label}</span>
                  <span style={{ color: '#F5F5F0', fontSize: 13, fontWeight: 600 }}>{row.value}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 24, padding: 16, background: 'rgba(255,107,0,0.04)', borderRadius: 10, border: '1px solid rgba(255,107,0,0.1)' }}>
              <Shield size={16} color="#FF6B00" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                Al registrarte aceptas los <Link href="/terminos" style={{ color: '#FF6B00' }}>Términos y Condiciones</Link> y la <Link href="/privacidad" style={{ color: '#FF6B00' }}>Política de Privacidad</Link> de FixPro.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(2)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={handleSubmit} disabled={sending}
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.7 : 1 }}>
                {sending ? 'Procesando...' : planSel === 'gratis' ? 'Registrarme gratis' : `Registrarme — ${PLANES.find(p => p.id === planSel)?.precio}€/mes →`}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

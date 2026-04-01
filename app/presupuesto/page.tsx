'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Shield, Clock, Check } from 'lucide-react'
import { SECTORES, TODAS_PROVINCIAS } from '@/lib/data'

export default function PresupuestoPage() {
  const [step, setStep]     = useState(0)
  const [done, setDone]     = useState(false)
  const [sending, setSend]  = useState(false)
  const [form, setForm]     = useState({
    sector: '', provincia: '', descripcion: '', urgente: false,
    nombre: '', email: '', telefono: '', disponibilidad: '',
  })
  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }))

  const handleSend = async () => {
    setSend(true)
    await new Promise(r => setTimeout(r, 1500))
    setSend(false)
    setDone(true)
  }

  if (done) return (
    <div style={{ paddingTop: 80, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: 480 }}>
        <div style={{ fontSize: 64, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 48, fontWeight: 900, color: '#F5F5F0', marginBottom: 12 }}>
          ¡SOLICITUD ENVIADA!
        </h1>
        <p style={{ color: '#888', fontSize: 16, lineHeight: 1.6, marginBottom: 24 }}>
          Los mejores profesionales de <strong style={{ color: '#F5F5F0' }}>{form.provincia}</strong> especializados en <strong style={{ color: '#FF6B00' }}>{SECTORES.find(s => s.id === form.sector)?.label}</strong> recibirán tu solicitud y te contactarán con presupuesto.
        </p>
        <div style={{ background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: 20, marginBottom: 24, textAlign: 'left' }}>
          {[
            '📱 Recibirás los presupuestos por WhatsApp/email',
            '⏱️ Los profesionales suelen responder en menos de 2h',
            '✅ Compara y elige sin compromiso',
            '🆓 Completamente gratis para el cliente',
          ].map((item, i) => (
            <p key={i} style={{ color: '#888', fontSize: 14, marginBottom: i < 3 ? 8 : 0 }}>{item}</p>
          ))}
        </div>
        <Link href="/" style={{ display: 'inline-block', background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', textDecoration: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700 }}>
          Volver al inicio
        </Link>
      </div>
    </div>
  )

  const inputStyle = {
    width: '100%', background: '#0D0D0D', border: '1px solid #2a2a2a',
    color: '#F5F5F0', padding: '12px 14px', borderRadius: 10, fontSize: 14,
    outline: 'none', boxSizing: 'border-box' as const,
  }
  const labelStyle = { color: '#888', fontSize: 12, fontWeight: 600, letterSpacing: '0.08em', display: 'block', marginBottom: 8 } as const

  return (
    <div style={{ paddingTop: 80, minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(160deg, rgba(255,107,0,0.06), transparent)', borderBottom: '1px solid #1E1E1E', padding: '40px 24px' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 20 }}>
            <ArrowLeft size={14} /> Inicio
          </Link>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 900, color: '#F5F5F0', lineHeight: 1, marginBottom: 8 }}>
            PIDE PRESUPUESTO GRATIS
          </h1>
          <p style={{ color: '#666', fontSize: 15 }}>Cuéntanos qué necesitas y los profesionales de tu zona te contactarán.</p>
        </div>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>
        {/* Trust badges */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 32, flexWrap: 'wrap' }}>
          {[
            { icon: <Shield size={14} color="#FF6B00" />, text: 'Profesionales verificados' },
            { icon: <Clock size={14} color="#FF6B00" />, text: 'Respuesta en &lt;2h' },
            { icon: <Check size={14} color="#FF6B00" />, text: '100% gratis para el cliente' },
          ].map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#888', fontSize: 12 }}>
              {b.icon}
              <span dangerouslySetInnerHTML={{ __html: b.text }} />
            </div>
          ))}
        </div>

        {step === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>¿Qué necesitas?</h2>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>TIPO DE SERVICIO *</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 8 }}>
                {SECTORES.slice(0, 12).map(s => (
                  <div key={s.id} onClick={() => set('sector', s.id)}
                    style={{
                      padding: '10px 12px', borderRadius: 10, border: `1px solid ${form.sector === s.id ? '#FF6B00' : '#1E1E1E'}`,
                      background: form.sector === s.id ? 'rgba(255,107,0,0.08)' : '#111',
                      cursor: 'pointer', transition: 'all 0.15s',
                      display: 'flex', alignItems: 'center', gap: 8,
                    }}>
                    <span style={{ fontSize: 18 }}>{s.emoji}</span>
                    <span style={{ color: form.sector === s.id ? '#FF6B00' : '#888', fontSize: 12, fontWeight: form.sector === s.id ? 600 : 400 }}>{s.label}</span>
                  </div>
                ))}
                <div onClick={() => {}} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #1E1E1E', background: '#111', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 18 }}>➕</span>
                  <span style={{ color: '#666', fontSize: 12 }}>Otro</span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>PROVINCIA *</label>
              <select value={form.provincia} onChange={e => set('provincia', e.target.value)}
                style={{ ...inputStyle, color: form.provincia ? '#F5F5F0' : '#666' }}>
                <option value="">¿Dónde necesitas el servicio?</option>
                {TODAS_PROVINCIAS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>DESCRIBE LO QUE NECESITAS *</label>
              <textarea placeholder="Ej: Tengo una fuga de agua en la cocina, necesito reparación urgente. El grifo del fregadero pierde agua..."
                value={form.descripcion} onChange={e => set('descripcion', e.target.value)} rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div onClick={() => set('urgente', !form.urgente)}
                  style={{
                    width: 20, height: 20, borderRadius: 4, border: `2px solid ${form.urgente ? '#FF6B00' : '#2a2a2a'}`,
                    background: form.urgente ? '#FF6B00' : 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                  }}>
                  {form.urgente && <Check size={12} color="#fff" />}
                </div>
                <span style={{ color: '#888', fontSize: 14 }}>🚨 Es urgente (necesito respuesta hoy)</span>
              </label>
            </div>

            <button onClick={() => setStep(1)} disabled={!form.sector || !form.provincia || !form.descripcion}
              style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!form.sector || !form.provincia || !form.descripcion) ? 0.5 : 1 }}>
              Continuar →
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 24, fontWeight: 700, color: '#F5F5F0', marginBottom: 20 }}>Tus datos de contacto</h2>
            <p style={{ color: '#666', fontSize: 14, marginBottom: 24 }}>Solo para que los profesionales puedan contactarte. No spam.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
              {[
                { key: 'nombre', label: 'Nombre *', placeholder: 'Tu nombre', type: 'text' },
                { key: 'telefono', label: 'Teléfono / WhatsApp *', placeholder: '600 000 000', type: 'tel' },
              ].map(f => (
                <div key={f.key}>
                  <label style={labelStyle}>{f.label.toUpperCase()}</label>
                  <input type={f.type} placeholder={f.placeholder} value={(form as any)[f.key]}
                    onChange={e => set(f.key, e.target.value)}
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                    onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
                  />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>EMAIL *</label>
              <input type="email" placeholder="tu@email.com" value={form.email}
                onChange={e => set('email', e.target.value)}
                style={inputStyle}
                onFocus={e => (e.target.style.borderColor = '#FF6B00')}
                onBlur={e => (e.target.style.borderColor = '#2a2a2a')}
              />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={labelStyle}>¿CUÁNDO PUEDES?</label>
              <select value={form.disponibilidad} onChange={e => set('disponibilidad', e.target.value)} style={{ ...inputStyle, color: form.disponibilidad ? '#F5F5F0' : '#666' }}>
                <option value="">Selecciona disponibilidad</option>
                <option value="hoy">Hoy mismo</option>
                <option value="manana">Mañana</option>
                <option value="semana">Esta semana</option>
                <option value="flexible">Soy flexible</option>
              </select>
            </div>

            <div style={{ background: 'rgba(255,107,0,0.04)', border: '1px solid rgba(255,107,0,0.1)', borderRadius: 10, padding: 16, marginBottom: 24 }}>
              <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>
                <Shield size={12} style={{ display: 'inline', marginRight: 6, color: '#FF6B00' }} />
                Tus datos solo se compartirán con los profesionales seleccionados. Consulta nuestra <Link href="/privacidad" style={{ color: '#FF6B00' }}>política de privacidad</Link>.
              </p>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setStep(0)} style={{ background: 'transparent', border: '1px solid #2a2a2a', color: '#666', padding: '14px 24px', borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                ← Atrás
              </button>
              <button onClick={handleSend} disabled={!form.nombre || !form.email || !form.telefono || sending}
                style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8C30)', color: '#fff', border: 'none', padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: 'pointer', opacity: (!form.nombre || !form.email || !form.telefono) ? 0.5 : 1 }}>
                {sending ? 'Enviando...' : '🚀 Enviar solicitud gratis'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

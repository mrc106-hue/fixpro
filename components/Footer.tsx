import Link from 'next/link'
import { Wrench } from 'lucide-react'
import { SECTORES } from '@/lib/data'

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid #1E1E1E', background: '#0A0A0A', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'linear-gradient(135deg, #FF6B00, #FFB800)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Wrench size={20} color="#000" strokeWidth={2.5} />
              </div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 900, background: 'linear-gradient(135deg, #FF6B00, #FFB800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>FixPro</span>
            </div>
            <p style={{ color: '#666', fontSize: 14, lineHeight: 1.7, maxWidth: 280 }}>
              El directorio premium de profesionales del hogar y servicios en España. Encuentra al experto que necesitas, donde estás.
            </p>

            {/* Cross-promo */}
            <div style={{
              marginTop: 24, padding: '16px 18px', borderRadius: 12,
              background: 'rgba(255,107,0,0.06)', border: '1px solid rgba(255,107,0,0.15)',
            }}>
              <p style={{ color: '#888', fontSize: 12, marginBottom: 8 }}>¿Necesitas comparar presupuestos?</p>
              <a href="https://presupuestosya.es" target="_blank" rel="noopener noreferrer" style={{
                color: '#FF6B00', fontSize: 13, fontWeight: 700, textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                Prueba PresupuestosYa.es →
              </a>
            </div>
          </div>

          {/* Sectores */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: '#F5F5F0', marginBottom: 16, letterSpacing: '0.1em' }}>SECTORES</h4>
            {SECTORES.slice(0, 8).map(s => (
              <Link key={s.id} href={`/sector/${s.id}`} style={{ display: 'block', color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                {s.label}
              </Link>
            ))}
          </div>

          {/* Provincias */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: '#F5F5F0', marginBottom: 16, letterSpacing: '0.1em' }}>PROVINCIAS</h4>
            {['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga', 'Tarragona', 'Zaragoza', 'Murcia'].map(p => (
              <Link key={p} href={`/provincia/${p.toLowerCase()}`} style={{ display: 'block', color: '#666', textDecoration: 'none', fontSize: 13, marginBottom: 8, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
                onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                {p}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 14, fontWeight: 700, color: '#F5F5F0', marginBottom: 16, letterSpacing: '0.1em' }}>EMPRESA</h4>
            {['Registro Profesional', 'Pedir Presupuesto', 'Panel Profesional', 'Publicidad', 'Aviso Legal', 'Privacidad', 'Cookies'].map(l => (
              <div key={l} style={{ marginBottom: 8 }}>
                <a href="#" style={{ color: '#666', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#FF6B00')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#666')}>
                  {l}
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#444', fontSize: 12 }}>
            © {new Date().getFullYear()} FixPro España. Todos los derechos reservados.
          </p>
          <p style={{ color: '#333', fontSize: 12 }}>
            Parte del ecosistema <span style={{ color: '#FF6B00' }}>SiteNova AI</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

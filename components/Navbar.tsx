'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Wrench, Search } from 'lucide-react'
import { SECTORES } from '@/lib/data'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [sectoresOpen, setSectoresOpen] = useState(false)

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(8,8,8,0.9)', backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,107,0,0.08)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Wrench size={20} color="#000" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: 26, fontWeight: 900,
            background: 'linear-gradient(135deg, #FF6B00, #FFB800)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '0.02em',
          }}>FixPro</span>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          {/* Sectores dropdown */}
          <div style={{ position: 'relative' }}
            onMouseEnter={() => setSectoresOpen(true)}
            onMouseLeave={() => setSectoresOpen(false)}
          >
            <button style={{ background: 'none', border: 'none', color: '#888', fontSize: 14, fontWeight: 500, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
              Sectores ▾
            </button>
            {sectoresOpen && (
              <div style={{
                position: 'absolute', top: '100%', left: -20, width: 320, paddingTop: 8,
                background: '#111', border: '1px solid #1E1E1E', borderRadius: 12, padding: '12px',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, zIndex: 200,
                boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
              }}>
                {SECTORES.slice(0, 12).map(s => (
                  <Link key={s.id} href={`/sector/${s.id}`} style={{
                    padding: '8px 10px', borderRadius: 8, textDecoration: 'none',
                    color: '#888', fontSize: 12, fontWeight: 500,
                    display: 'flex', alignItems: 'center', gap: 6,
                    transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#FF6B00'; e.currentTarget.style.background = 'rgba(255,107,0,0.06)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = 'transparent' }}
                  >
                    <span>{s.emoji}</span> {s.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {[{ label: 'Provincias', href: '/provincia' }, { label: 'Presupuesto', href: '/presupuesto' }].map(l => (
            <Link key={l.label} href={l.href} style={{ color: '#888', textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
              {l.label}
            </Link>
          ))}

          <Link href="/registro" style={{
            padding: '8px 20px', borderRadius: 10,
            border: '1px solid rgba(255,107,0,0.3)',
            color: '#FF6B00', textDecoration: 'none',
            fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,107,0,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
          >
            Soy Profesional
          </Link>

          <Link href="/dashboard" className="btn-orange" style={{ padding: '9px 20px', fontSize: 13 }}>
            <Search size={14} /> Buscar
          </Link>
        </div>
      </div>
    </nav>
  )
}

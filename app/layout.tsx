import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title:       'FixPro | Directorio de Profesionales del Hogar en España',
  description: 'Encuentra fontaneros, electricistas, carpinteros y más de 20 especialidades en tu provincia. Directorio premium con profesionales verificados.',
  keywords:    'fontaneros, electricistas, reformas, carpinteros, cerrajeros, profesionales hogar, España, directorio',
  openGraph: {
    title:       'FixPro — Profesionales del Hogar en España',
    description: 'El directorio premium de profesionales del hogar. Encuentra al experto que necesitas en tu provincia.',
    type:        'website',
    locale:      'es_ES',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main style={{ minHeight: '100vh' }}>{children}</main>
        <Footer />
      </body>
    </html>
  )
}

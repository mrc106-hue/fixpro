import { createClient } from '@supabase/supabase-js'

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnon)

// Server-side client (with service role key)
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

// ── Types ────────────────────────────────────────────────────────
export type Plan = 'gratis' | 'estandar' | 'premium' | 'vip'

export interface Profesional {
  id: string
  nombre: string
  email: string
  telefono?: string
  whatsapp?: string
  sector_principal: string
  sectores_adicionales?: string[]
  provincia: string
  zonas_cobertura?: string[]
  descripcion?: string
  foto_perfil?: string
  plan: Plan
  plan_activo: boolean
  valoracion_media: number
  total_valoraciones: number
  verificado: boolean
  created_at: string
}

export interface Lead {
  id: string
  nombre: string
  telefono: string
  provincia: string
  sector: string
  descripcion: string
  created_at: string
}

export interface Valoracion {
  id: string
  profesional_id: string
  puntuacion: number
  comentario: string
  created_at: string
}

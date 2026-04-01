import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// GET /api/profesionales?sector=fontaneria&provincia=Madrid&plan=vip&limit=20&page=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const sector   = searchParams.get('sector')
  const provincia = searchParams.get('provincia')
  const plan     = searchParams.get('plan')
  const limit    = parseInt(searchParams.get('limit') || '20')
  const page     = parseInt(searchParams.get('page') || '1')
  const offset   = (page - 1) * limit

  let query = supabase
    .from('profesionales')
    .select('*, valoraciones(count)')
    .eq('activo', true)
    .order('plan', { ascending: false }) // vip > premium > estandar > gratis
    .order('valoracion_media', { ascending: false })
    .range(offset, offset + limit - 1)

  if (sector)   query = query.eq('sector', sector)
  if (provincia) query = query.eq('provincia', provincia)
  if (plan)     query = query.eq('plan', plan)

  const { data, error, count } = await query

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, count, page, limit })
}

// POST /api/profesionales — crear nuevo profesional
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { nombre, email, telefono, whatsapp, sector, provincia, descripcion, plan, web, instagram, anos_experiencia } = body

  // Validate required fields
  if (!nombre || !email || !telefono || !sector || !provincia) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  // Check if email already registered
  const { data: existing } = await supabase
    .from('profesionales')
    .select('id')
    .eq('email', email)
    .single()

  if (existing) {
    return NextResponse.json({ error: 'Este email ya está registrado' }, { status: 409 })
  }

  const slug = nombre.toLowerCase()
    .replace(/[áà]/g, 'a').replace(/[éè]/g, 'e').replace(/[íì]/g, 'i').replace(/[óò]/g, 'o').replace(/[úù]/g, 'u')
    .replace(/ñ/g, 'n').replace(/ü/g, 'u')
    .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-')
    + '-' + Date.now().toString(36)

  const { data, error } = await supabase
    .from('profesionales')
    .insert({
      nombre, email, telefono, whatsapp: whatsapp || telefono,
      sector, provincia, descripcion, plan: plan || 'gratis',
      web, instagram, anos_experiencia: anos_experiencia ? parseInt(anos_experiencia) : null,
      slug, activo: plan === 'gratis', // gratis activo directamente, otros esperan pago
    })
    .select()
    .single()

  if (error) {
    console.error('Insert error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data, slug }, { status: 201 })
}

// PATCH /api/profesionales — update (requiere auth)
export async function PATCH(req: NextRequest) {
  const body = await req.json()
  const { id, ...updates } = body

  if (!id) return NextResponse.json({ error: 'id requerido' }, { status: 400 })

  // Remove read-only fields
  delete updates.email
  delete updates.slug
  delete updates.created_at

  const { data, error } = await supabase
    .from('profesionales')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

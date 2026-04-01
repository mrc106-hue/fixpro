import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Lead distribution limits by plan
const LEAD_LIMITS: Record<string, number> = {
  vip:      9999,
  premium:  10,
  estandar: 5,
  gratis:   0,
}

// POST /api/leads — create and distribute a lead
export async function POST(req: NextRequest) {
  const body = await req.json()
  const { sector, provincia, descripcion, nombre_cliente, email_cliente, telefono_cliente, urgente } = body

  if (!sector || !provincia || !descripcion || !nombre_cliente || !telefono_cliente) {
    return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
  }

  // Find eligible professionals (active, same sector+province, with remaining lead quota)
  const { data: pros, error: prosError } = await supabase
    .from('profesionales')
    .select('id, plan, nombre, whatsapp, email')
    .eq('sector', sector)
    .eq('provincia', provincia)
    .eq('activo', true)
    .neq('plan', 'gratis') // gratis plan doesn't receive leads
    .order('plan', { ascending: false }) // VIP first

  if (prosError) {
    return NextResponse.json({ error: prosError.message }, { status: 500 })
  }

  // Check lead counts for this month
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)

  const eligiblePros = []
  for (const pro of (pros || [])) {
    const limit = LEAD_LIMITS[pro.plan] || 0
    const { count } = await supabase
      .from('leads')
      .select('id', { count: 'exact', head: true })
      .eq('profesional_id', pro.id)
      .gte('created_at', startOfMonth.toISOString())

    if ((count || 0) < limit) {
      eligiblePros.push(pro)
    }
  }

  // Create the lead
  const { data: lead, error: leadError } = await supabase
    .from('leads')
    .insert({
      sector, provincia, descripcion,
      nombre_cliente, email_cliente, telefono_cliente,
      urgente: urgente || false,
      estado: 'nuevo',
    })
    .select()
    .single()

  if (leadError) {
    return NextResponse.json({ error: leadError.message }, { status: 500 })
  }

  // Distribute to eligible pros (max 3 per lead)
  const toNotify = eligiblePros.slice(0, 3)
  for (const pro of toNotify) {
    await supabase
      .from('leads')
      .update({ profesional_id: pro.id })
      .eq('id', lead.id)
  }

  // If urgente and has WhatsApp, trigger notification (in production this would use Twilio/etc)
  if (urgente && toNotify.length > 0) {
    console.log(`[URGENTE] Lead ${lead.id} distribuido a ${toNotify.length} profesionales`)
  }

  return NextResponse.json({
    success: true,
    lead_id: lead.id,
    profesionales_notificados: toNotify.length,
    mensaje: toNotify.length > 0
      ? `Tu solicitud ha sido enviada a ${toNotify.length} profesionales. Te contactarán pronto.`
      : 'Tu solicitud ha sido registrada. Estamos buscando profesionales en tu zona.',
  }, { status: 201 })
}

// GET /api/leads?profesional_id=xxx — get leads for a professional
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const proId = searchParams.get('profesional_id')
  const estado = searchParams.get('estado')

  if (!proId) return NextResponse.json({ error: 'profesional_id requerido' }, { status: 400 })

  let query = supabase
    .from('leads')
    .select('*')
    .eq('profesional_id', proId)
    .order('created_at', { ascending: false })

  if (estado) query = query.eq('estado', estado)

  const { data, error } = await query

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

// PATCH /api/leads — update lead state
export async function PATCH(req: NextRequest) {
  const { id, estado } = await req.json()

  if (!id || !estado) return NextResponse.json({ error: 'id y estado requeridos' }, { status: 400 })
  if (!['nuevo', 'contactado', 'presupuestado', 'cerrado', 'rechazado'].includes(estado)) {
    return NextResponse.json({ error: 'estado inválido' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('leads')
    .update({ estado, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

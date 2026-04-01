import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe    = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
const supabase  = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

const PRICE_IDS: Record<string, string> = {
  estandar: process.env.STRIPE_PRICE_ESTANDAR!,
  premium:  process.env.STRIPE_PRICE_PREMIUM!,
  vip:      process.env.STRIPE_PRICE_VIP!,
}

export async function POST(req: NextRequest) {
  const { plan, profesional_id, email } = await req.json()

  if (!plan || !profesional_id || !email) {
    return NextResponse.json({ error: 'plan, profesional_id y email son requeridos' }, { status: 400 })
  }

  if (!PRICE_IDS[plan]) {
    return NextResponse.json({ error: 'Plan inválido o no disponible para pago' }, { status: 400 })
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fixpro.es'

  const session = await stripe.checkout.sessions.create({
    mode:               'subscription',
    payment_method_types: ['card'],
    customer_email:     email,
    line_items: [{
      price:    PRICE_IDS[plan],
      quantity: 1,
    }],
    metadata: {
      profesional_id,
      plan,
    },
    success_url: `${baseUrl}/dashboard?success=1&plan=${plan}`,
    cancel_url:  `${baseUrl}/registro?cancel=1`,
    allow_promotion_codes: true,
    billing_address_collection: 'auto',
    locale: 'es',
  })

  // Log intent
  await supabase.from('profesionales').update({
    stripe_checkout_session: session.id,
  }).eq('id', profesional_id)

  return NextResponse.json({ url: session.url, session_id: session.id })
}

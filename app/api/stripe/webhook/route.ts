import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const stripe   = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' })
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(req: NextRequest) {
  const body      = await req.text()
  const signature = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    console.error('Webhook signature failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {

    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { profesional_id, plan } = session.metadata!

      if (profesional_id && plan) {
        await supabase.from('profesionales').update({
          plan,
          activo: true,
          stripe_customer_id:    session.customer as string,
          stripe_subscription_id: session.subscription as string,
          plan_activo_desde:     new Date().toISOString(),
        }).eq('id', profesional_id)

        console.log(`✅ Plan ${plan} activado para profesional ${profesional_id}`)
      }
      break
    }

    case 'invoice.payment_succeeded': {
      const invoice = event.data.object as Stripe.Invoice
      const customerId = invoice.customer as string

      // Renew subscription
      const { data: pro } = await supabase
        .from('profesionales')
        .select('id, plan')
        .eq('stripe_customer_id', customerId)
        .single()

      if (pro) {
        await supabase.from('profesionales').update({
          activo: true,
          plan_renovado: new Date().toISOString(),
        }).eq('id', pro.id)

        // Reset monthly lead count
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)
        console.log(`✅ Suscripción renovada para profesional ${pro.id}`)
      }
      break
    }

    case 'customer.subscription.deleted':
    case 'invoice.payment_failed': {
      const obj = event.data.object as any
      const customerId = obj.customer as string

      const { data: pro } = await supabase
        .from('profesionales')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (pro) {
        await supabase.from('profesionales').update({
          plan:   'gratis',
          activo: true, // stays active on gratis
          stripe_subscription_id: null,
        }).eq('id', pro.id)

        console.log(`⚠️ Suscripción cancelada/fallida para profesional ${pro.id} → downgrade a gratis`)
      }
      break
    }

    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      const customerId = sub.customer as string
      const priceId = sub.items.data[0]?.price.id

      // Determine new plan from price ID
      const priceMap: Record<string, string> = {
        [process.env.STRIPE_PRICE_ESTANDAR!]: 'estandar',
        [process.env.STRIPE_PRICE_PREMIUM!]:  'premium',
        [process.env.STRIPE_PRICE_VIP!]:      'vip',
      }
      const newPlan = priceMap[priceId] || 'gratis'

      const { data: pro } = await supabase
        .from('profesionales')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single()

      if (pro) {
        await supabase.from('profesionales').update({ plan: newPlan }).eq('id', pro.id)
        console.log(`✅ Plan actualizado a ${newPlan} para profesional ${pro.id}`)
      }
      break
    }

    default:
      console.log(`Unhandled event: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing for webhook
export const config = { api: { bodyParser: false } }

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
  typescript: true,
})

export const STRIPE_PRICES = {
  estandar: process.env.STRIPE_PRICE_ESTANDAR || '',
  premium:  process.env.STRIPE_PRICE_PREMIUM  || '',
  vip:      process.env.STRIPE_PRICE_VIP      || '',
  banner:   process.env.STRIPE_PRICE_BANNER   || '',
}

export async function createCheckoutSession({
  priceId,
  email,
  profesionalId,
  plan,
  successUrl,
  cancelUrl,
}: {
  priceId:      string
  email:        string
  profesionalId:string
  plan:         string
  successUrl:   string
  cancelUrl:    string
}) {
  return stripe.checkout.sessions.create({
    mode:                  'subscription',
    payment_method_types:  ['card'],
    customer_email:         email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url:  cancelUrl,
    metadata: { profesionalId, plan },
    allow_promotion_codes: true,
  })
}

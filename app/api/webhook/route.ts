// app/api/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Gérer les événements
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ status: 'paid' })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('Error updating order:', error);
      }

      // Décrémenter le stock
      const metadata = paymentIntent.metadata;
      if (metadata.items) {
        const items = JSON.parse(metadata.items);
        
        for (const item of items) {
          await supabaseAdmin.rpc('decrement_stock', {
            variant_id: item.variant_id,
            quantity: item.quantity,
          });
        }
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      await supabaseAdmin
        .from('orders')
        .update({ status: 'cancelled' })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Note: Ajouter cette fonction SQL dans Supabase :
/*
CREATE OR REPLACE FUNCTION decrement_stock(variant_id UUID, quantity INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE product_variants
  SET stock = GREATEST(stock - quantity, 0)
  WHERE id = variant_id;
END;
$$ LANGUAGE plpgsql;
*/
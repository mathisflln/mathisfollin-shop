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
    console.error('❌ Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Gérer les événements
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande comme payée
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('❌ Error updating order:', error);
      } else {
        console.log('✅ Payment succeeded:', paymentIntent.id);
      }

      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande comme échouée
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('❌ Error updating order status to failed:', error);
      }

      console.log('❌ Payment failed:', paymentIntent.id);
      console.log('Failure reason:', paymentIntent.last_payment_error?.message);
      break;
    }

    case 'payment_intent.canceled': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande comme annulée
      await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      console.log('🚫 Payment canceled:', paymentIntent.id);
      break;
    }

    case 'payment_intent.processing': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour le statut comme "en cours de traitement"
      await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'processing',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      console.log('⏳ Payment processing:', paymentIntent.id);
      break;
    }

    default:
      console.log(`ℹ️ Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
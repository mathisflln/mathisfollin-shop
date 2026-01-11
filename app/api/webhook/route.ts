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
        .update({ 
          status: 'paid',
          updated_at: new Date().toISOString()
        })
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

      console.log('✅ Payment succeeded:', paymentIntent.id);
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande avec le statut échoué
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'failed',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('Error updating order status to failed:', error);
      }

      console.log('❌ Payment failed:', paymentIntent.id);
      console.log('Failure reason:', paymentIntent.last_payment_error?.message);
      break;
    }

    case 'payment_intent.canceled': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Mettre à jour la commande comme annulée
      const { error } = await supabaseAdmin
        .from('orders')
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('stripe_payment_intent_id', paymentIntent.id);

      if (error) {
        console.error('Error updating order status to cancelled:', error);
      }

      console.log('🚫 Payment canceled:', paymentIntent.id);
      break;
    }

    case 'payment_intent.processing': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Optionnel : mettre à jour le statut comme "en cours de traitement"
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
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

// Note: Ajouter cette fonction SQL dans Supabase si pas déjà fait :
/*
CREATE OR REPLACE FUNCTION decrement_stock(variant_id UUID, quantity INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE product_variants
  SET stock = GREATEST(stock - quantity, 0)
  WHERE id = variant_id;
END;
$$ LANGUAGE plpgsql;

-- Mettre à jour aussi la table orders pour ajouter les nouveaux statuts :
ALTER TABLE orders 
ALTER COLUMN status TYPE VARCHAR(20);

-- Les statuts possibles sont maintenant : 'pending', 'processing', 'paid', 'failed', 'cancelled', 'shipped'
*/
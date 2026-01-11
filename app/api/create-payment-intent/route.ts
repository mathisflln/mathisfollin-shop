// app/api/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { items, email, shipping } = await req.json();

    // Calculer le total
    const amount = items.reduce(
      (total: number, item: any) => total + item.product.base_price * item.quantity * 100,
      0
    );

    // Créer le Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount),
      currency: 'eur',
      receipt_email: email,
      metadata: {
        email,
        items: JSON.stringify(items.map((item: any) => ({
          product_id: item.product.id,
          variant_id: item.variant.id,
          quantity: item.quantity,
        }))),
      },
    });

    // Créer la commande dans Supabase
    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        email,
        name: shipping.name,
        phone: shipping.phone,
        stripe_payment_intent_id: paymentIntent.id,
        total_amount: amount / 100,
        status: 'pending',
        shipping_address: shipping,
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // Créer les order_items
    const orderItems = items.map((item: any) => ({
      order_id: order.id,
      product_id: item.product.id,
      variant_id: item.variant.id,
      quantity: item.quantity,
      price: item.product.base_price,
    }));

    const { error: itemsError } = await supabaseAdmin
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order.id,
    });
  } catch (error: any) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
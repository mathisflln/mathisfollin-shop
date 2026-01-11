// app/panier/page.tsx
'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="min-h-screen">
        <header className="border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <Link href="/" className="text-2xl font-bold">FAH Shop</Link>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Découvrez nos produits pour soutenir la cause</p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800"
          >
            Continuer mes achats
          </Link>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return <CheckoutForm onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold">FAH Shop</Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Mon panier</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.variant.id} className="flex gap-4 border rounded-lg p-4">
                <div className="w-24 h-24 relative bg-gray-100 rounded-md flex-shrink-0">
                  <Image
                    src={item.product.images[0] || '/placeholder.png'}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-sm text-gray-600">
                    Taille: {item.variant.size} • Couleur: {item.variant.color}
                  </p>
                  <p className="font-semibold mt-2">
                    {item.product.base_price.toFixed(2)} €
                  </p>
                </div>

                <div className="flex flex-col justify-between items-end">
                  <button
                    onClick={() => removeItem(item.variant.id)}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Supprimer
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      className="w-8 h-8 border rounded-md hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      className="w-8 h-8 border rounded-md hover:bg-gray-100"
                      disabled={item.quantity >= item.variant.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Récapitulatif</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{getTotal().toFixed(2)} €</span>
                </div>
                <div className="flex justify-between">
                  <span>Livraison</span>
                  <span>Gratuite</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>{getTotal().toFixed(2)} €</span>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
              >
                Procéder au paiement
              </button>

              <Link
                href="/"
                className="block text-center mt-4 text-sm hover:underline"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
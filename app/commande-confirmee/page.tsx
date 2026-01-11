// app/commande-confirmee/page.tsx
'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore } from '@/store/cart';

export default function OrderConfirmationPage() {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link href="/" className="text-2xl font-bold">FAH Shop</Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg p-12 shadow-sm">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-4">Commande confirmée !</h1>
          
          <p className="text-gray-600 mb-2">
            Merci pour votre commande et votre soutien à la FAH Marie-Curie.
          </p>
          
          <p className="text-gray-600 mb-8">
            Vous allez recevoir un email de confirmation avec les détails de votre commande.
          </p>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
            <p className="text-sm text-yellow-800">
              💛 Votre achat contribue directement à nos actions contre le harcèlement scolaire.
            </p>
          </div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800"
            >
              Retour à la boutique
            </Link>
            <a
              href="https://mathisfollin.fr"
              className="border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50"
            >
              Site principal
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
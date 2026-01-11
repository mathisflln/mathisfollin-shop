// components/CheckoutForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useCartStore } from '@/store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

if (!stripePublishableKey) {
  throw new Error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY');
}

const stripePromise = loadStripe(stripePublishableKey);

interface CheckoutFormProps {
  onBack: () => void;
}

function PaymentForm({ clientSecret, onBack }: { clientSecret: string; onBack: () => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const clearCart = useCartStore((state) => state.clearCart);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/commande-confirmee`,
      },
    });

    if (error) {
      toast.error(error.message || 'Erreur lors du paiement');
      setLoading(false);
    } else {
      clearCart();
      router.push('/commande-confirmee');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="flex-1 border border-gray-300 py-3 rounded-md hover:bg-gray-50"
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-300"
        >
          {loading ? 'Traitement...' : 'Payer'}
        </button>
      </div>
    </form>
  );
}

export default function CheckoutForm({ onBack }: CheckoutFormProps) {
  const { items, getTotal } = useCartStore();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'France',
  });

  const handleShippingSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items,
          email: formData.email,
          shipping: formData,
        }),
      });

      const data = await response.json();
      
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error(data.error || 'Erreur lors de la création du paiement');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold">Finaliser la commande</h1>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {!clientSecret ? (
          <form onSubmit={handleShippingSubmit} className="bg-white rounded-lg p-8 space-y-6">
            <h2 className="text-xl font-semibold mb-4">Informations de livraison</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Nom complet *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Téléphone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">Adresse *</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Ville *</label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Code postal *</label>
                <input
                  type="text"
                  required
                  value={formData.postal_code}
                  onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                  className="w-full border rounded-md px-4 py-2"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <div className="flex justify-between text-lg font-semibold mb-6">
                <span>Total à payer</span>
                <span>{getTotal().toFixed(2)} €</span>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onBack}
                  className="flex-1 border py-3 rounded-md hover:bg-gray-50"
                >
                  Retour
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-black text-white py-3 rounded-md hover:bg-gray-800 disabled:bg-gray-300"
                >
                  {loading ? 'Chargement...' : 'Continuer vers le paiement'}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-6">Paiement sécurisé</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} onBack={onBack} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
// components/CheckoutForm.tsx
'use client';

import { useState, FormEvent } from 'react';
import { useCartStore } from '@/store/cart';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <PaymentElement />
      
      <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary"
          style={{ flex: 1 }}
        >
          Retour
        </button>
        <button
          type="submit"
          disabled={!stripe || loading}
          className="btn btn-primary"
          style={{ 
            flex: 1,
            opacity: (!stripe || loading) ? 0.5 : 1,
            cursor: (!stripe || loading) ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Traitement...' : 'Payer maintenant'}
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
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">FAH Shop</Link>
        </div>
      </header>

      <div className="page-header">
        <div className="container-narrow">
          <h1 className="page-title">Finaliser la commande</h1>
        </div>
      </div>

      <div className="container-narrow" style={{ paddingBottom: '120px' }}>
        {!clientSecret ? (
          <form onSubmit={handleShippingSubmit}>
            <div style={{ 
              background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <h2 style={{ 
                fontSize: '1.5rem', 
                fontWeight: '700', 
                marginBottom: '2rem',
                letterSpacing: '-0.02em'
              }}>
                Informations de livraison
              </h2>
              
              <div className="form-group">
                <label className="form-label">Adresse email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="form-input"
                  placeholder="votre@email.com"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Nom complet</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Téléphone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="form-input"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Adresse</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="form-input"
                  placeholder="123 rue de la Paix"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Ville</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input"
                    placeholder="Paris"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Code postal</label>
                  <input
                    type="text"
                    required
                    value={formData.postal_code}
                    onChange={(e) => setFormData({ ...formData, postal_code: e.target.value })}
                    className="form-input"
                    placeholder="75000"
                  />
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '16px',
              padding: '2.5rem',
              marginBottom: '2rem'
            }}>
              <div className="summary-row">
                <span style={{ color: '#666' }}>Sous-total</span>
                <span style={{ fontWeight: '600' }}>{getTotal().toFixed(2)} €</span>
              </div>
              <div className="summary-row">
                <span style={{ color: '#666' }}>Livraison</span>
                <span style={{ fontWeight: '600' }}>Gratuite</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{getTotal().toFixed(2)} €</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={onBack}
                className="btn btn-secondary"
                style={{ flex: 1 }}
              >
                Retour au panier
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-large"
                style={{ 
                  flex: 2,
                  opacity: loading ? 0.5 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer'
                }}
              >
                {loading ? 'Chargement...' : 'Continuer vers le paiement'}
              </button>
            </div>
          </form>
        ) : (
          <div style={{ 
            background: 'white',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            padding: '2.5rem'
          }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Paiement sécurisé
            </h2>
            <p style={{ fontSize: '0.9375rem', color: '#666', marginBottom: '2rem' }}>
              Vos informations de paiement sont traitées de manière sécurisée par Stripe.
            </p>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <PaymentForm clientSecret={clientSecret} onBack={onBack} />
            </Elements>
          </div>
        )}
      </div>
    </div>
  );
}
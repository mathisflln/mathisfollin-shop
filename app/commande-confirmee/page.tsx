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
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">FAH Shop</Link>
        </div>
      </header>

      <div style={{ paddingTop: '180px', paddingBottom: '120px' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          <div className="success-icon">
            <svg style={{ width: '40px', height: '40px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            Commande confirmée !
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#666', 
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            Merci pour votre commande et votre soutien à la FAH Marie-Curie.
            <br />
            Vous allez recevoir un email de confirmation avec tous les détails.
          </p>

          <div className="success-message">
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem',
              padding: '1.5rem',
              background: '#fafafa',
              borderRadius: '12px',
              marginBottom: '2rem'
            }}>
              <div style={{ fontSize: '2rem' }}>💛</div>
              <p style={{ 
                fontSize: '0.9375rem', 
                color: '#666',
                textAlign: 'left',
                lineHeight: '1.6'
              }}>
                Votre achat contribue directement à nos actions de sensibilisation et de prévention contre le harcèlement scolaire.
              </p>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '1rem',
              padding: '1.5rem',
              background: '#fafafa',
              borderRadius: '12px'
            }}>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                  Livraison
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  Sous 5 jours ouvrés
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.25rem' }}>
                  Frais de port
                </div>
                <div style={{ fontSize: '1rem', fontWeight: '600' }}>
                  Gratuits
                </div>
              </div>
            </div>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '3rem'
          }}>
            <Link href="/" className="btn btn-primary btn-large">
              Retour à la boutique
            </Link>
            <a
              href="https://mathisfollin.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-large"
            >
              Découvrir nos actions
            </a>
          </div>

          <p style={{ 
            fontSize: '0.875rem', 
            color: '#999', 
            marginTop: '3rem' 
          }}>
            Une question sur votre commande ? Contactez-nous à{' '}
            <a 
              href="mailto:contact@mathisfollin.fr"
              style={{ color: '#0a0a0a', textDecoration: 'underline' }}
            >
              contact@mathisfollin.fr
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
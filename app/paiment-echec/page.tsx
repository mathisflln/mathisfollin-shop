// app/paiement-echec/page.tsx
'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function PaymentFailedPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error') || 'Le paiement a échoué';

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">FAH Shop</Link>
        </div>
      </header>

      <div style={{ paddingTop: '180px', paddingBottom: '120px' }}>
        <div className="container-narrow" style={{ textAlign: 'center' }}>
          {/* Icône d'erreur */}
          <div style={{
            width: '80px',
            height: '80px',
            background: '#fef2f2',
            border: '2px solid #fecaca',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 2rem'
          }}>
            <svg style={{ width: '40px', height: '40px', color: '#dc2626' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            fontWeight: '800', 
            marginBottom: '1rem',
            letterSpacing: '-0.03em'
          }}>
            Paiement échoué
          </h1>
          
          <p style={{ 
            fontSize: '1.125rem', 
            color: '#666', 
            marginBottom: '3rem',
            lineHeight: '1.6'
          }}>
            {error}
          </p>

          {/* Message d'information */}
          <div style={{
            background: 'white',
            border: '1px solid rgba(0, 0, 0, 0.06)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '3rem',
            textAlign: 'left'
          }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              marginBottom: '1rem' 
            }}>
              Que faire maintenant ?
            </h3>
            
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem' 
            }}>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg style={{ width: '20px', height: '20px', color: '#0a0a0a', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.9375rem', color: '#666' }}>
                  Vérifiez les informations de votre carte bancaire
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg style={{ width: '20px', height: '20px', color: '#0a0a0a', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.9375rem', color: '#666' }}>
                  Assurez-vous d'avoir suffisamment de fonds disponibles
                </span>
              </li>
              <li style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <svg style={{ width: '20px', height: '20px', color: '#0a0a0a', flexShrink: 0, marginTop: '2px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span style={{ fontSize: '0.9375rem', color: '#666' }}>
                  Contactez votre banque si le problème persiste
                </span>
              </li>
            </ul>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link href="/panier" className="btn btn-primary btn-large">
              Réessayer le paiement
            </Link>
            <Link href="/" className="btn btn-secondary btn-large">
              Retour à la boutique
            </Link>
          </div>

          <div style={{
            marginTop: '3rem',
            padding: '1.5rem',
            background: '#fafafa',
            borderRadius: '12px'
          }}>
            <p style={{ fontSize: '0.875rem', color: '#666', marginBottom: '0.5rem' }}>
              💡 <strong>Rassurez-vous</strong> : votre panier a été conservé
            </p>
            <p style={{ fontSize: '0.875rem', color: '#666' }}>
              Vous pouvez reprendre votre commande à tout moment
            </p>
          </div>

          <p style={{ 
            fontSize: '0.875rem', 
            color: '#999', 
            marginTop: '3rem' 
          }}>
            Besoin d'aide ? Contactez-nous à{' '}
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
// app/panier/page.tsx
'use client';

import { useCartStore } from '@/store/cart';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import CheckoutForm from '@/components/CheckoutForm';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const [showCheckout, setShowCheckout] = useState(false);

  if (items.length === 0 && !showCheckout) {
    return (
      <div>
        <header className="header">
          <div className="container header-content">
            <Link href="/" className="logo">FAH Shop</Link>
            <nav className="nav">
              <Link href="/" className="nav-link">Produits</Link>
            </nav>
          </div>
        </header>

        <div className="empty-state" style={{ paddingTop: '180px' }}>
          <div className="empty-state-icon">
            <svg style={{ width: '40px', height: '40px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h1 className="empty-state-title">Votre panier est vide</h1>
          <p className="empty-state-description">
            Découvrez nos produits et soutenez notre cause
          </p>
          <Link href="/" className="btn btn-primary btn-large">
            Voir les produits
          </Link>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return <CheckoutForm onBack={() => setShowCheckout(false)} />;
  }

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">FAH Shop</Link>
        </div>
      </header>

      <div className="page-header">
        <div className="container">
          <h1 className="page-title">Mon Panier</h1>
        </div>
      </div>

      <div className="container">
        <div className="cart-layout">
          <div>
            {items.map((item) => (
              <div key={item.variant.id} className="cart-item">
                <div className="cart-item-image">
                  <Image
                    src={item.product.images[0] || '/placeholder.png'}
                    alt={item.product.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                    {item.product.name}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', color: '#666', marginBottom: '1rem' }}>
                    {item.variant.size} • {item.variant.color}
                  </p>
                  <p style={{ fontSize: '1.25rem', fontWeight: '700' }}>
                    {item.product.base_price.toFixed(2)} €
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => removeItem(item.variant.id)}
                    style={{ 
                      fontSize: '0.875rem', 
                      color: '#666', 
                      background: 'none', 
                      border: 'none', 
                      cursor: 'pointer',
                      padding: '0.5rem',
                      transition: 'color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.color = '#0a0a0a'}
                    onMouseOut={(e) => e.currentTarget.style.color = '#666'}
                  >
                    Supprimer
                  </button>

                  <div className="quantity-selector">
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                      className="quantity-btn"
                      disabled={item.quantity >= item.variant.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>
              Récapitulatif
            </h2>
            
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

            <button
              onClick={() => setShowCheckout(true)}
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1.5rem' }}
            >
              Procéder au paiement
            </button>

            <Link
              href="/"
              style={{ 
                display: 'block', 
                textAlign: 'center', 
                marginTop: '1rem', 
                fontSize: '0.9375rem',
                color: '#666'
              }}
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
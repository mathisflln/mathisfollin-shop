// components/Header.tsx
'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const itemCount = useCartStore((state) => state.getItemCount());

  return (
    <header className="header">
      <div className="container header-content">
        <Link href="/" className="logo">
          FAH Shop
        </Link>
        
        <nav className="nav">
          <Link href="/" className="nav-link">
            Produits
          </Link>
          <Link href="/panier" className="btn btn-primary cart-button">
            <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span className="desktop-only">Panier</span>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>
        </nav>
      </div>
      
      <style jsx>{`
        .desktop-only {
          display: inline;
        }
        
        @media (max-width: 640px) {
          .desktop-only {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
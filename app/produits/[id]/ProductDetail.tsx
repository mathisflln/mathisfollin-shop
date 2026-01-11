// app/produits/[id]/ProductDetail.tsx
'use client';

import { useState } from 'react';
import { Product, ProductVariant } from '@/types/product';
import { SizeSelector, ColorSelector } from '@/components/VariantSelectors';
import { useCartStore } from '@/store/cart';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Props {
  product: Product;
  variants: ProductVariant[];
}

export default function ProductDetail({ product, variants }: Props) {
  const addItem = useCartStore((state) => state.addItem);
  
  const sizes = [...new Set(variants.map(v => v.size))];
  const colors = [...new Set(variants.map(v => v.color))];
  
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const selectedVariant = variants.find(
    v => v.size === selectedSize && v.color === selectedColor
  );

  const availableForColor = (size: string) => {
    return variants.some(v => v.size === size && v.color === selectedColor && v.stock > 0);
  };

  const availableForSize = (color: string) => {
    return variants.some(v => v.color === color && v.size === selectedSize && v.stock > 0);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) {
      toast.error('Veuillez sélectionner une taille et une couleur');
      return;
    }

    if (selectedVariant.stock < quantity) {
      toast.error('Stock insuffisant');
      return;
    }

    addItem(product, selectedVariant, quantity);
    toast.success('✓ Produit ajouté au panier');
  };

  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">FAH Shop</Link>
          <nav className="nav">
            <Link href="/" className="nav-link">Produits</Link>
            <Link href="/panier" className="btn btn-primary">Panier</Link>
          </nav>
        </div>
      </header>

      <div className="page-header">
        <div className="container-wide">
          <Link 
            href="/" 
            style={{ 
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9375rem',
              color: '#666',
              marginBottom: '2rem',
              transition: 'color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.color = '#0a0a0a'}
            onMouseOut={(e) => e.currentTarget.style.color = '#666'}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Retour aux produits
          </Link>
        </div>
      </div>

      <div className="container-wide" style={{ paddingBottom: '120px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>
          {/* Image */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ 
              aspectRatio: '1', 
              position: 'relative', 
              background: '#f5f5f5',
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid rgba(0, 0, 0, 0.06)'
            }}>
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              ) : (
                <div style={{ 
                  width: '100%', 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#ccc'
                }}>
                  <svg style={{ width: '96px', height: '96px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              fontWeight: '800', 
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
              lineHeight: '1.2'
            }}>
              {product.name}
            </h1>
            
            <div style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: '2rem',
              letterSpacing: '-0.02em'
            }}>
              {product.base_price.toFixed(2)} €
            </div>
            
            <p style={{ 
              fontSize: '1.125rem', 
              color: '#666', 
              marginBottom: '3rem',
              lineHeight: '1.7'
            }}>
              {product.description}
            </p>

            <div style={{ 
              background: 'white',
              border: '1px solid rgba(0, 0, 0, 0.06)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2rem'
            }}>
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                onSizeChange={setSelectedSize}
                availableForColor={availableForColor}
              />

              <ColorSelector
                colors={colors}
                selectedColor={selectedColor}
                onColorChange={setSelectedColor}
                availableForSize={availableForSize}
              />

              {/* Quantity */}
              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label" style={{ marginBottom: '1rem' }}>Quantité</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div className="quantity-selector">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="quantity-btn"
                    >
                      −
                    </button>
                    <span className="quantity-value">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(selectedVariant?.stock || 1, quantity + 1))}
                      className="quantity-btn"
                      disabled={quantity >= (selectedVariant?.stock || 1)}
                    >
                      +
                    </button>
                  </div>
                  {selectedVariant && (
                    <span style={{ fontSize: '0.875rem', color: '#666' }}>
                      {selectedVariant.stock} en stock
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedVariant || selectedVariant.stock === 0}
                className="btn btn-primary btn-large"
                style={{ 
                  width: '100%',
                  opacity: (!selectedVariant || selectedVariant.stock === 0) ? 0.5 : 1,
                  cursor: (!selectedVariant || selectedVariant.stock === 0) ? 'not-allowed' : 'pointer'
                }}
              >
                {selectedVariant?.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
              </button>
            </div>

            {/* Info supplementaire */}
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem',
              fontSize: '0.9375rem',
              color: '#666'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Livraison gratuite sous 5 jours ouvrés</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>100% des bénéfices reversés à la FAH Marie-Curie</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <svg style={{ width: '20px', height: '20px', flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Qualité premium garantie</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
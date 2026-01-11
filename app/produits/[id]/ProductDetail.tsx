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
    toast.success('Produit ajouté au panier !');
  };

  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">FAH Shop</Link>
          <Link href="/panier" className="hover:underline">Panier</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <Link href="/" className="text-sm hover:underline mb-6 inline-block">
          ← Retour aux produits
        </Link>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Images */}
          <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
            {product.images && product.images.length > 0 ? (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                Pas d&apos;image disponible
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-2xl font-semibold mb-6">
              {product.base_price.toFixed(2)} €
            </p>
            <p className="text-gray-600 mb-8">{product.description}</p>

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
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Quantité</label>
              <input
                type="number"
                min="1"
                max={selectedVariant?.stock || 1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-md px-4 py-2 w-24"
              />
              {selectedVariant && (
                <span className="ml-4 text-sm text-gray-600">
                  {selectedVariant.stock} en stock
                </span>
              )}
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!selectedVariant || selectedVariant.stock === 0}
              className="w-full bg-black text-white py-4 rounded-md hover:bg-gray-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {selectedVariant?.stock === 0 ? 'Rupture de stock' : 'Ajouter au panier'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
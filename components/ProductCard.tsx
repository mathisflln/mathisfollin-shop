// components/ProductCard.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/produits/${product.id}`}
      className="group block bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl hover:border-fah-yellow transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="aspect-square relative bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Badge "Nouveau" optionnel */}
        <div className="absolute top-3 right-3 bg-fah-yellow text-fah-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
          NOUVEAU
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-fah-yellow transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-fah-black">
            {product.base_price.toFixed(2)} €
          </span>
          
          <button className="bg-fah-black text-white px-5 py-2 rounded-lg font-semibold group-hover:bg-fah-yellow group-hover:text-fah-black transition-all duration-300 flex items-center gap-2">
            Voir
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </Link>
  );
}
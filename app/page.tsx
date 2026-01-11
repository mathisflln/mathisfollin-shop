// app/page.tsx
import { supabase } from '@/lib/supabase';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import { Product } from '@/types/product';

export default async function HomePage() {
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            FAH Shop
          </Link>
          
          <nav className="flex gap-6 items-center">
            <Link href="/" className="hover:underline">
              Produits
            </Link>
            <Link href="/panier" className="hover:underline">
              Panier
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-yellow-400 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Boutique Officielle FAH
          </h1>
          <p className="text-xl mb-8">
            Soutenez notre cause avec style
          </p>
          <a
            href="#produits"
            className="inline-block bg-black text-white px-8 py-3 rounded-md hover:bg-gray-800 transition"
          >
            Découvrir nos produits
          </a>
        </div>
      </section>

      {/* Products Grid */}
      <section id="produits" className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-8">Nos produits</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {!products || products.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            Aucun produit disponible pour le moment
          </p>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center text-sm text-gray-600">
          <p>© 2025 FAH Marie-Curie - Tous droits réservés</p>
          <div className="flex gap-4 justify-center mt-4">
            <Link href="https://mathisfollin.fr" className="hover:underline">
              Site principal
            </Link>
            <Link href="/mentions-legales" className="hover:underline">
              Mentions légales
            </Link>
            <Link href="/cgv" className="hover:underline">
              CGV
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
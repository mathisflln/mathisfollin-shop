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
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-fah-yellow rounded-lg flex items-center justify-center">
              <span className="text-2xl font-black text-fah-black">F</span>
            </div>
            <div>
              <h1 className="text-2xl font-black text-fah-black">FAH Shop</h1>
              <p className="text-xs text-gray-500">Marie-Curie</p>
            </div>
          </Link>
          
          <nav className="flex gap-6 items-center">
            <Link href="/" className="text-gray-700 hover:text-fah-yellow font-semibold transition-colors">
              Produits
            </Link>
            <Link 
              href="/panier" 
              className="bg-fah-yellow text-fah-black px-5 py-2 rounded-lg font-bold hover:bg-fah-black hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Panier
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-fah-yellow via-yellow-300 to-fah-yellow py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-fah-black rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-fah-black rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-black mb-6 text-fah-black leading-tight">
            Boutique Officielle
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-fah-black to-gray-700">
              FAH Marie-Curie
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-10 text-gray-800 font-medium max-w-2xl mx-auto">
            Soutenez notre cause contre le harcèlement scolaire avec style 💛
          </p>
          
          <a
            href="#produits"
            className="inline-flex items-center gap-3 bg-fah-black text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-800 transition-all duration-300 shadow-2xl hover:shadow-fah-yellow/50 hover:scale-105 transform"
          >
            Découvrir nos produits
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-fah-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-fah-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-fah-black">Soutien Direct</h3>
              <p className="text-gray-600">100% des bénéfices pour la lutte contre le harcèlement</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-fah-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-fah-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-fah-black">Qualité Premium</h3>
              <p className="text-gray-600">Produits de haute qualité, confortables et durables</p>
            </div>
            
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-fah-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-fah-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 text-fah-black">Livraison Rapide</h3>
              <p className="text-gray-600">Livraison gratuite sous 5 jours ouvrés</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section id="produits" className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-fah-black">
            Nos Produits
          </h2>
          <p className="text-xl text-gray-600">
            Chaque achat compte dans notre combat
          </p>
        </div>
        
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gray-50 rounded-2xl">
              <svg className="w-20 h-20 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-xl text-gray-500 font-medium">
                Aucun produit disponible pour le moment
              </p>
              <p className="text-gray-400 mt-2">
                Revenez bientôt pour découvrir nos nouveautés
              </p>
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="bg-fah-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6">
            Ensemble contre le harcèlement
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Chaque produit acheté contribue directement à nos actions de sensibilisation et de prévention
          </p>
          <a
            href="https://mathisfollin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-fah-yellow text-fah-black px-8 py-4 rounded-xl font-bold hover:bg-white transition-all duration-300 shadow-xl"
          >
            En savoir plus sur nos actions
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">FAH Marie-Curie</h3>
              <p className="text-sm">
                Association de lutte contre le harcèlement scolaire
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Liens utiles</h3>
              <div className="space-y-2 text-sm">
                <Link href="https://mathisfollin.fr" className="block hover:text-fah-yellow transition-colors">
                  Site principal
                </Link>
                <Link href="/mentions-legales" className="block hover:text-fah-yellow transition-colors">
                  Mentions légales
                </Link>
                <Link href="/cgv" className="block hover:text-fah-yellow transition-colors">
                  CGV
                </Link>
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <p className="text-sm">
                Pour toute question sur votre commande
                <br />
                <a href="mailto:contact@mathisfollin.fr" className="text-fah-yellow hover:underline">
                  contact@mathisfollin.fr
                </a>
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>© 2025 FAH Marie-Curie - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
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
    <div>
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <Link href="/" className="logo">
            FAH Shop
          </Link>
          
          <nav className="nav">
            <Link href="/" className="nav-link">
              Produits
            </Link>
            <Link href="/panier" className="btn btn-primary">
              Panier
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="container-narrow">
          <h1 className="hero-title">
            Boutique Officielle FAH Marie-Curie
          </h1>
          
          <p className="hero-subtitle">
            Soutenez la lutte contre le harcèlement scolaire avec des produits de qualité. 
            100% des bénéfices reversés à notre cause.
          </p>
          
          <div className="hero-cta">
            <a href="#produits" className="btn btn-primary btn-large">
              Découvrir les produits
            </a>
            <a href="https://mathisfollin.fr" target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-large">
              En savoir plus
            </a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <div>
              <div className="stat-value">100%</div>
              <div className="stat-label">Bénéfices reversés à la cause</div>
            </div>
            <div>
              <div className="stat-value">Premium</div>
              <div className="stat-label">Qualité garantie</div>
            </div>
            <div>
              <div className="stat-value">Gratuit</div>
              <div className="stat-label">Livraison sous 5 jours</div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="produits" className="products-section">
        <div className="container-wide">
          <div className="section-header">
            <h2 className="section-title">Nos Produits</h2>
            <p className="section-subtitle">
              Chaque achat contribue directement à nos actions de prévention
            </p>
          </div>
          
          {products && products.length > 0 ? (
            <div className="products-grid">
              {products?.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg style={{ width: '40px', height: '40px', color: '#999' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="empty-state-title">Aucun produit disponible</h3>
              <p className="empty-state-description">
                Revenez bientôt pour découvrir nos nouveaux produits
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="container-narrow">
          <h2 className="cta-title">
            Ensemble contre le harcèlement scolaire
          </h2>
          <p className="cta-description">
            Chaque produit acheté contribue directement à nos actions de sensibilisation 
            et de prévention dans les établissements scolaires.
          </p>
          <a
            href="https://mathisfollin.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-white btn-large"
          >
            Découvrir nos actions
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-column">
              <h3>FAH Marie-Curie</h3>
              <p style={{ color: '#666', fontSize: '0.9375rem', lineHeight: '1.6' }}>
                Association de lutte contre le harcèlement scolaire. 
                Ensemble pour un environnement scolaire plus sûr.
              </p>
            </div>
            
            <div className="footer-column">
              <h3>Liens utiles</h3>
              <div className="footer-links">
                <Link href="https://mathisfollin.fr" className="footer-link">
                  Site principal
                </Link>
                <Link href="/mentions-legales" className="footer-link">
                  Mentions légales
                </Link>
                <Link href="/cgv" className="footer-link">
                  Conditions générales de vente
                </Link>
              </div>
            </div>
            
            <div className="footer-column">
              <h3>Contact</h3>
              <div className="footer-links">
                <a href="mailto:contact@mathisfollin.fr" className="footer-link">
                  contact@mathisfollin.fr
                </a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            © 2025 FAH Marie-Curie. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
}
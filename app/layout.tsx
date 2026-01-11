// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'FAH Shop - Boutique Officielle',
  description: 'Soutenez la lutte contre le harcèlement scolaire avec la boutique officielle FAH Marie-Curie',
  openGraph: {
    title: 'FAH Shop - Boutique Officielle',
    description: 'Soutenez la lutte contre le harcèlement scolaire',
    url: 'https://shop.mathisfollin.fr',
    siteName: 'FAH Shop',
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
// app/produits/[id]/page.tsx
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import ProductDetail from '@/app/produits/[id]/ProductDetail';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (!product) {
    notFound();
  }

  const { data: variants } = await supabase
    .from('product_variants')
    .select('*')
    .eq('product_id', params.id)
    .gt('stock', 0);

  return <ProductDetail product={product} variants={variants || []} />;
}
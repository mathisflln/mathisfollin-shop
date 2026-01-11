// types/product.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  base_price: number;
  images: string[];
  category: string;
  stripe_product_id: string | null;
  active: boolean;
  created_at: string;
}

export interface ProductVariant {
  id: string;
  product_id: string;
  size: string;
  color: string;
  stock: number;
  sku: string;
  stripe_price_id: string | null;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
}

export interface Order {
  id: string;
  email: string;
  name: string;
  phone: string;
  stripe_payment_intent_id: string;
  total_amount: number;
  status: 'pending' | 'paid' | 'shipped' | 'cancelled';
  shipping_address: ShippingAddress;
  items: OrderItem[];
  created_at: string;
}

export interface OrderItem {
  id: string;
  product_id: string;
  variant_id: string;
  quantity: number;
  price: number;
  product?: Product;
  variant?: ProductVariant;
}

export interface ShippingAddress {
  name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
}
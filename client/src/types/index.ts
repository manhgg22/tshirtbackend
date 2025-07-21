export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

export interface Design {
  _id: string;
  userId: string;
  name: string;
  image: string;
  isPublic: boolean;
}

export interface CartItem {
  productId: string;
  designId?: string;
  quantity: number;
  price: number;
  product: Product;
  design?: Design;
}

export interface Order {
  _id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
}

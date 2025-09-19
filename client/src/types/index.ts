export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  sold: number;
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
  product: Product;
  design?: Design;
  quantity: number;
  price: number;
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

export interface CartState {
  items: CartItem[];
}

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

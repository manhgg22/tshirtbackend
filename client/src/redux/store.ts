import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import productReducer from './productSlice';
import cartReducer from './cartSlice';
import { AuthState, Product, CartItem } from '../types';

export interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  loading: boolean;
  error: string | null;
}

export interface CartState {
  items: CartItem[];
}

export interface RootState {
  auth: AuthState;
  products: ProductState;
  cart: CartState;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem, Product, Design } from '../types';

import { CartState } from './store';

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{ product: Product; design?: Design; quantity: number }>) => {
      const { product, design, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item.productId === product._id &&
          ((!design && !item.designId) || (design && item.designId === design._id))
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          productId: product._id,
          designId: design?._id,
          quantity,
          price: product.price,
          product,
          design,
        });
      }
    },
    removeItem: (state, action: PayloadAction<{ productId: string; designId?: string }>) => {
      const { productId, designId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId &&
          ((!designId && !item.designId) || (designId && item.designId === designId)))
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string; designId?: string; quantity: number }>
    ) => {
      const { productId, designId, quantity } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          ((!designId && !item.designId) || (designId && item.designId === designId))
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

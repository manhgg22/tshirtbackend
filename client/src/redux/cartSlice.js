import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, design, quantity } = action.payload;
      
      // Validate product exists
      if (!product || !product._id) {
        console.error('Invalid product:', product);
        return;
      }
      
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
          name: product.name,
          image: product.images?.[0]?.url || product.image,
          category: product.category,
          product,
          design,
        });
      }
    },
    removeItem: (state, action) => {
      const { productId, designId } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId &&
          ((!designId && !item.designId) || (designId && item.designId === designId)))
      );
    },
    updateQuantity: (state, action) => {
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

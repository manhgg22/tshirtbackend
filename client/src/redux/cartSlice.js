import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('shoppingCart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    items: [],
    promoCode: null,
    discount: 0,
    shippingFee: 0,
  };
};

// Save cart to localStorage
const saveCartToStorage = (state) => {
  try {
    localStorage.setItem('shoppingCart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = loadCartFromStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, design, quantity, size, color } = action.payload;
      
      // Validate product exists
      if (!product || !product._id) {
        console.error('Invalid product:', product);
        return;
      }
      
      const existingItem = state.items.find(
        (item) =>
          item.productId === product._id &&
          ((!design && !item.designId) || (design && item.designId === design._id)) &&
          item.size === size &&
          item.color === color
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
          size: size || 'M',
          color: color || 'Trắng',
          product,
          design,
        });
      }
      saveCartToStorage(state);
    },
    removeItem: (state, action) => {
      const { productId, designId, size, color } = action.payload;
      state.items = state.items.filter(
        (item) =>
          !(item.productId === productId &&
          ((!designId && !item.designId) || (designId && item.designId === designId)) &&
          item.size === size &&
          item.color === color)
      );
      saveCartToStorage(state);
    },
    updateQuantity: (state, action) => {
      const { productId, designId, quantity, size, color } = action.payload;
      const item = state.items.find(
        (item) =>
          item.productId === productId &&
          ((!designId && !item.designId) || (designId && item.designId === designId)) &&
          item.size === size &&
          item.color === color
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      saveCartToStorage(state);
    },
    applyPromoCode: (state, action) => {
      const { code, discount } = action.payload;
      state.promoCode = code;
      state.discount = discount;
      saveCartToStorage(state);
    },
    removePromoCode: (state) => {
      state.promoCode = null;
      state.discount = 0;
      saveCartToStorage(state);
    },
    updateShippingFee: (state, action) => {
      state.shippingFee = action.payload;
      saveCartToStorage(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = null;
      state.discount = 0;
      state.shippingFee = 0;
      saveCartToStorage(state);
    },
  },
});

export const { 
  addItem, 
  removeItem, 
  updateQuantity, 
  clearCart,
  applyPromoCode,
  removePromoCode,
  updateShippingFee
} = cartSlice.actions;

export default cartSlice.reducer;

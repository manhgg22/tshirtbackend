import { createSlice } from '@reduxjs/toolkit';

// Load wishlist from localStorage
const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      return JSON.parse(savedWishlist);
    }
  } catch (error) {
    console.error('Error loading wishlist from localStorage:', error);
  }
  return {
    items: [],
  };
};

// Save wishlist to localStorage
const saveWishlistToStorage = (state) => {
  try {
    localStorage.setItem('wishlist', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving wishlist to localStorage:', error);
  }
};

const initialState = loadWishlistFromStorage();

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const { product } = action.payload;

      // Validate product exists
      if (!product || !product._id) {
        console.error('Invalid product:', product);
        return;
      }

      // Check if product already in wishlist
      const existingItem = state.items.find((item) => item.productId === product._id);

      if (!existingItem) {
        state.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || product.image,
          category: product.category,
          product,
          addedAt: new Date().toISOString(),
        });
        saveWishlistToStorage(state);
      }
    },
    removeFromWishlist: (state, action) => {
      const { productId } = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      saveWishlistToStorage(state);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state);
    },
    toggleWishlist: (state, action) => {
      const { product } = action.payload;

      if (!product || !product._id) {
        console.error('Invalid product:', product);
        return;
      }

      const existingItemIndex = state.items.findIndex((item) => item.productId === product._id);

      if (existingItemIndex !== -1) {
        // Remove from wishlist
        state.items.splice(existingItemIndex, 1);
      } else {
        // Add to wishlist
        state.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.images?.[0]?.url || product.image,
          category: product.category,
          product,
          addedAt: new Date().toISOString(),
        });
      }
      saveWishlistToStorage(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, toggleWishlist } = wishlistSlice.actions;

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some((item) => item.productId === productId);
export const selectWishlistCount = (state) => state.wishlist.items.length;

export default wishlistSlice.reducer;


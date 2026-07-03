import { createSlice } from "@reduxjs/toolkit";

const getCartFromStorage = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const saveCartToStorage = (cartItems) => {
  localStorage.setItem("cart", JSON.stringify(cartItems));
};

const initialState = {
  cartItems: getCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Add to Cart
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (product) => product.id === item.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({
          ...item,
          quantity: 1,
        });
      }

      saveCartToStorage(state.cartItems);
    },

    // Remove Item
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );

      saveCartToStorage(state.cartItems);
    },

    // Increase Quantity
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      saveCartToStorage(state.cartItems);
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.id === action.payload
      );

      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (product) => product.id !== action.payload
        );
      }

      saveCartToStorage(state.cartItems);
    },

    // Clear Cart
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
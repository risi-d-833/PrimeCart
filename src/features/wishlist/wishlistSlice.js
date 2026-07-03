import { createSlice } from "@reduxjs/toolkit";

const getWishlistFromStorage = () => {
  const wishlist = localStorage.getItem("wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

const saveWishlistToStorage = (wishlistItems) => {
  localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
};

const initialState = {
  wishlistItems: getWishlistFromStorage(),
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const existing = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existing >= 0) {
        state.wishlistItems.splice(existing, 1);
      } else {
        state.wishlistItems.push(action.payload);
      }

      saveWishlistToStorage(state.wishlistItems);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
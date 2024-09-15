import { create } from "zustand";

export const useStore = create((set) => ({
  cart: [],
  favourite: [],
  total: 0,
  addToCart: (product) =>
    set((state) => {
      const productExist = state.cart.find((item) => item.id === product.id);

      const updatedCart = productExist
        ? state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.cart, { ...product, quantity: 1 }];

      const updatedTotal = updatedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        cart: updatedCart,
        total: updatedTotal,
      };
    }),
  updateCartQuantity: (productId, value) =>
    set((state) => {
      const updateCart = state.cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + value }
            : item
        )
        .filter((item) => item.quantity > 0);

        const updatedTotal = updateCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
  
        return {
          cart: updateCart,
          total: updatedTotal,
        };
    }),

  removeCartProduct: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);

      return { cart: updatedCart };
    }),

  addtoFavourite: (product) =>
    set((state) => {
      const productExist = state.favourite.find(
        (item) => item.id === product.id
      );

      const updatedFavourite = !productExist
        ? [...state.favourite, { ...product}]
        : [...state.favourite];

      console.log("current wishlist", updatedFavourite)

      return { favourite: updatedFavourite };
    }),
}));

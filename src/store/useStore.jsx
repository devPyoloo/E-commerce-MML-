import { create } from "zustand";

export const useStore = create((set) => ({
  cart: [],
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

      return {
        cart: updatedCart,
        total: updatedCart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }),
}));

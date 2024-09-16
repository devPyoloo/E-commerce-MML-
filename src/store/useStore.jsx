import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set) => ({
      cart: [],
      favourite: [],
      total: 0,
      addToCart: (product) =>
        set((state) => {
          const productExist = state.cart.find(
            (item) => item.id === product.id
          );

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
          const updatedCart = state.cart.filter(
            (item) => item.id !== productId
          );

          return { cart: updatedCart };
        }),

      addtoFavourite: (product) =>
        set((state) => {
          const isFavourite = state.favourite.some(
            (item) => item.id === product.id
          );

          return isFavourite
            ? {
                favourite: state.favourite.filter(
                  (item) => item.id !== product.id
                ),
              }
            : { favourite: [...state.favourite, product] };
        }),
    }),
    {
      name: "store-data",
      partialize: (state) => ({ cart: state.cart, favourite: state.favourite }), //choose a state you want persist
    }
  )
);

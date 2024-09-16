import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

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

          toast.success("Added to cart", {
            style: {
              borderRadius: "5px",
              background: "#EBEBEB",
              color: "#0B0B0C",
            },
          });

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

          toast.success("Removed from cart", {
            style: {
              borderRadius: "5px",
              background: "#EBEBEB",
              color: "#0B0B0C",
            },
          });

          return { cart: updatedCart };
        }),

      addtoFavourite: (product) =>
        set((state) => {
          const isFavourite = state.favourite.some(
            (item) => item.id === product.id
          );

          const updatedFavourite = isFavourite
            ? state.favourite.filter((item) => item.id !== product.id)
            : [...state.favourite, product];

          toast[isFavourite ? "error" : "success"](
            isFavourite ? "Removed from cart" : "Added to favourite",
            {
              style: {
                borderRadius: "5px",
                background: "#EBEBEB",
                color: "#0B0B0C",
              },
            }
          );

          return { favourite: updatedFavourite };
        }),
    }),
    {
      name: "store-data",
      partialize: (state) => ({ cart: state.cart, favourite: state.favourite }), //choose a state you want persist
    }
  )
);

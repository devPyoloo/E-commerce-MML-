import { create } from 'zustand'

export const useStore = create((set) => ({
cart: [],
addToCart: (product) => set((state) => {

  const productExist = state.cart.find((item) =>
    item.id === product.id)

  if(productExist) {
    return {
      cart: state.cart.map((item) => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
    }
   } else {
    return {
      cart: [...state.cart, { ...product, quantity: 1 } ] 
    }
    }
  })
}) 
)


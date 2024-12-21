import { create } from "zustand";


export const useModalStore = create((set) => ({
  isToggleModal: true,
  toggleModal: () => set(state => ({ isToggleModal: !state.isToggleModal })),
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value })
}))
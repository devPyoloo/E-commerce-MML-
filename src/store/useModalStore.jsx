import { create } from "zustand";


export const useModalStore = create((set) => ({
  isToggleModal: true,
  setToggleModal: (value) => set({ isToggleModal: value }),
  toggleModal: () => set(state => ({ isToggleModal: !state.isToggleModal }))
}))
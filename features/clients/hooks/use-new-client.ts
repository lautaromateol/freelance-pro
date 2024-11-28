import { create } from "zustand"

type NewClientState = {
  isOpen: boolean,
  onOpen: () => void,
  onClose: () => void
}

export const useNewClient = create<NewClientState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}))
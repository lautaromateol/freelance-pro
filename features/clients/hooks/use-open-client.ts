import { create } from "zustand";

type OpenClientState = {
  id?: string
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

export const useOpenClient = create<OpenClientState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ id: undefined, isOpen: false })

}))
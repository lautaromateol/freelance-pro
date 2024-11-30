import { create } from "zustand";

type OpenProjectState = {
  id?: string
  isOpen: boolean
  onOpen: (id: string) => void
  onClose: () => void
}

export const useOpenProject = create<OpenProjectState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id) => set({ id, isOpen: true }),
  onClose: () => set({ id: undefined, isOpen: false })

}))
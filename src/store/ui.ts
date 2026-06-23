import { create } from 'zustand'

interface UIStore {
  sidebarOpen: boolean
  selectedMachineId: string | null
  toggleSidebar: () => void
  setSidebarOpen: (open: boolean) => void
  setSelectedMachine: (id: string | null) => void
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarOpen: true,
  selectedMachineId: null,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setSelectedMachine: (id) => set({ selectedMachineId: id }),
}))

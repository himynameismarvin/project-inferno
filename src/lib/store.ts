import { create } from 'zustand'

interface AppState {
  currentClassId: string | null
  sidebarOpen: boolean
  setCurrentClassId: (classId: string | null) => void
  setSidebarOpen: (open: boolean) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentClassId: null,
  sidebarOpen: true,
  setCurrentClassId: (classId) => set({ currentClassId: classId }),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}))
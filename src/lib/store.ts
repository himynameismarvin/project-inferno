import { create } from 'zustand'

interface AppState {
  currentClassId: string | null
  setCurrentClassId: (classId: string | null) => void
}

export const useAppStore = create<AppState>((set) => ({
  currentClassId: null,
  setCurrentClassId: (classId) => set({ currentClassId: classId }),
}))
import { create } from 'zustand'

export const useStore = create<{
    tab: string
    setTab: (tab: string) => void
}>((set) => ({
  tab: "First",
  setTab: (tab: string) => set(() => ({ tab })),
}))
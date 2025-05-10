import { create } from 'zustand'

interface ImageState {
  file: File | null
  filter: string
  upload: (event: React.DragEvent<HTMLDivElement>) => void
  setFilter: (filter: string) => void
  resetImage: () => void
}

export const useImageStore = create<ImageState>((set) => ({
  file: null,
  filter: "",
  upload: (e) => {
    if (!e.dataTransfer) return;

    const tempFile = e.dataTransfer.files[0];

    if (!tempFile.type.match("image.*")) return;

    set({ file: tempFile });
  },
  setFilter: (filter) => set((state) => ({
    filter: state.filter === filter ? "" : filter
  })),
  resetImage: () => set({ file: null, filter: "" }),
}))

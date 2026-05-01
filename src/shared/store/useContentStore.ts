import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ContentState } from '../types';

export const useContentStore = create<ContentState>()(
  persist(
    (set) => ({
      contents: [],
      isGenerating: false,
      addContent: (content) =>
        set((state) => ({ contents: [content, ...state.contents] })),
      addMultipleContents: (contents) =>
        set((state) => ({ contents: [...contents, ...state.contents] })),
      removeContent: (id) =>
        set((state) => ({
          contents: state.contents.filter((c) => c.id !== id),
        })),
      updateContent: (id, updated) =>
        set((state) => ({
          contents: state.contents.map((c) =>
            c.id === id ? { ...c, ...updated } : c
          ),
        })),
      setIsGenerating: (status) => set({ isGenerating: status }),
    }),
    {
      name: 'seo-blog-storage',
      partialize: (state) => ({ contents: state.contents }), // Sadece içerikleri kaydet, isGenerating'i kaydetme
    }
  )
);

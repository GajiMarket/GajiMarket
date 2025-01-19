import { create } from "zustand";

interface KeywordState {
    addedKeywords: string[];
    addKeyword: (keyword: string) => void;
    removeKeyword: (keyword: string) => void;
    resetKeywords: () => void;
}

export const useKeywordStore = create<KeywordState>((set) => ({
    addedKeywords: [],
  
    addKeyword: (keyword: string) =>
      set((state) => ({
        addedKeywords: [...state.addedKeywords, keyword],
      })),
  
    removeKeyword: (keyword: string) =>
      set((state) => ({
        addedKeywords: state.addedKeywords.filter((item) => item !== keyword),
      })),
  
    resetKeywords: () => set(() => ({ addedKeywords: [] })),
  }));
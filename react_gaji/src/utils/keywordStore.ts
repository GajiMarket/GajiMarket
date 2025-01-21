import { create } from "zustand";

interface KeywordState {
  addedKeywords: string[];
  addKeyword: (keyword: string) => void;
  removeKeyword: (keyword: string) => void;
  resetKeywords: () => void;
  setKeywords: (keywords: string[]) => void; // 서버 데이터를 추가할 메서드
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

  setKeywords: (keywords: string[]) => set(() => ({ addedKeywords: keywords })), // 상태 초기화 메서드
}));

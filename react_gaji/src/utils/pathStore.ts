import { create } from "zustand";

interface ProductState {
    // productId: number | null;
    longitude: number | null;
    latitude: number | null;
    setProduct: (longitude: number, latitude: number) => void;
    clearProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    // productId: null,
    longitude: null,
    latitude: null,

    setProduct: (longitude, latitude) => set({ longitude, latitude }), // setProduct에 상태저장
    clearProduct: () => set({ longitude: null, latitude: null }),
}));
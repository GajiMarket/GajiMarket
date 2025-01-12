import { create } from "zustand";

interface ProductState {
    productId: number | null;
    longitude: number | null;
    latitude: number | null;
    setProduct: (productId: number, longitude: number, latitude: number) => void;
    // clearProduct: () => void;
}

export const useProductStore = create<ProductState>((set) => ({
    productId: null,
    longitude: null,
    latitude: null,

    setProduct: (productId, longitude, latitude) => set({ productId, longitude, latitude }), // setProduct에 상태저장
    clearProduct: () => set({ productId: null, longitude: null, latitude: null }),
}));
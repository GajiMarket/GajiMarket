import { create } from "zustand";

interface PathState {
    product_id: number | null;
    longitude: number | null;
    latitude: number | null;
    setProductId: (product_id: number) => void; // 메서드 이름을 일관성 있게 수정
    setCoordinates: (longitude: number, latitude: number) => void;
    resetCoordinates: () => void; // 초기화 메서드
}

export const usePathStore = create<PathState>((set) => ({
    product_id: null,
    longitude: null,
    latitude: null,
    setProductId: (product_id) => set({ product_id }), // product_id 설정 메서드
    setCoordinates: (longitude, latitude) => set({ longitude, latitude }),
    resetCoordinates: () => set({ product_id: null, longitude: null, latitude: null }), // product_id도 초기화
}));
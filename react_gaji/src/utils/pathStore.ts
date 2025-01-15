import { create } from "zustand";

interface PathState {
    longitude: number | null;
    latitude: number | null;
    setCoordinates: (longitude: number, latitude: number) => void;
    resetCoordinates: () => void; // 초기화 메서드
}

export const usePathStore = create<PathState>((set) => ({
    longitude: null,
    latitude: null,
    setCoordinates: (longitude, latitude) => set({ longitude, latitude }),
    resetCoordinates: () => set({ longitude: null, latitude: null }),
}));
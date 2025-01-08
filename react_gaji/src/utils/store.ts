import {create} from 'zustand';

interface CounterState {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
}

// Zustand store 생성

const store = create<CounterState>((set) => ({
    count: 0, //초기화
    increase: () => set((state) => ({ count: state.count + 1})),
    decrease: () => set((state) => ({ count: state.count - 1})),
    reset: () => set(() => ({ count: 0 })),
}));

export default store;
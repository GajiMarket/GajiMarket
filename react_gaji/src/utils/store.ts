import {create} from 'zustand';

// 채팅 Zustand 상태 관리 생성
interface ChatState {
    messages: { [key: string]: string[] };
    addMessage: (roomId: string, message: string) => void;
  }
  
export const useChatStore = create<ChatState>((set) => ({
    messages: {},
    addMessage: (roomId, message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [roomId]: [...(state.messages[roomId] || []), message],
            },
        })),
}));



// Zustand store 연습용
interface CounterState {
    count: number;
    increase: () => void;
    decrease: () => void;
    reset: () => void;
}

// Zustand store 연습용 react 페이지 생성
const store = create<CounterState>((set) => ({
    count: 0, //초기화
    increase: () => set((state) => ({ count: state.count + 1})),
    decrease: () => set((state) => ({ count: state.count - 1})),
    reset: () => set(() => ({ count: 0 })),
}));

export default store;
import { create } from 'zustand';

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
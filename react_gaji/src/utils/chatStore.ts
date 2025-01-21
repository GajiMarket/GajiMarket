import { create } from 'zustand';

interface ChatMessage {
    id: number;
    sender: 'buyer' | 'seller';
    message: string;
    timestamp: string;
    // productId: string;
}

interface ChatStore {
    messages: { [key: string]: ChatMessage[] };
    addMessage: (roomId: string, message: ChatMessage) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
    messages: {},
    addMessage: (roomId, message) =>
        set((state) => ({
            messages: {
                ...state.messages,
                [roomId]: [...(state.messages[roomId] || []), message],
            },
        })),
}));
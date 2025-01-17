import { create } from 'zustand';
import { sendMessagesToServer } from './apiService'; // 서버 통신 api
import { useChatStore } from './chatStore'; // 기존 Zustand 스토어 가져오기

interface NewStoreState {
  userId: string; // 유저 ID
  setUserId: (id: string) => void; // 유저 ID 설정
  sendToServer: (roomId: string) => Promise<void>; // 서버로 메시지 전송 함수
}

export const useNewStore = create<NewStoreState>((set, get) => ({
  userId: '',
  setUserId: (id) => set({ userId: id }),
  sendToServer: async (roomId) => {
    const messages = useChatStore.getState().messages[roomId] || []; // 기존 ChatStore에서 메시지 가져오기
    const userId = get().userId; // NewStore에서 userId 가져오기

    if (!userId || messages.length === 0) {
      console.warn('No userId or messages to send');
      return;
    }

    try {
      const payload = { roomId, userId, messages };
      await sendMessagesToServer(payload); // 서버 전송
    } catch (error) {
      console.error('Error sending messages to server:', error);
    }
  },
}));
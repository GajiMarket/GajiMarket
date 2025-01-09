import { IChatUser, IChatMessage } from '../models/chat.models';
import { getChatUserById, getMessagesBetweenUsers, sendMessage } from '../DAO/chat.dao';

// 채팅 사용자
export const findUserById = async (id: number): Promise<IChatUser | null> => {
    return await getChatUserById(id);
}

// 채팅 메세지
export const getChatMessages = async (userId1: number, userId2: number): Promise<IChatMessage[]> => {
    return await getMessagesBetweenUsers(userId1, userId2);
};

export const createChatMessage = async (message: IChatMessage): Promise<void> => {
    await sendMessage(message);
}
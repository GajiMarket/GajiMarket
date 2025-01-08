import { IChatMessage } from '../models/chat.message.models';
import { getMessagesBetweenUsers, sendMessage } from '../DAO/chat.message.dao';

export const getChatMessages = async (userId1: number, userId2: number): Promise<IChatMessage[]> => {
    return await getMessagesBetweenUsers(userId1, userId2);
};

export const createChatMessage = async (message: IChatMessage): Promise<void> => {
    await sendMessage(message);
}
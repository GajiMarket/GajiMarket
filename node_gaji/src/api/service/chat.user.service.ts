import { IChatUser } from '../models/chat.user.models';
import { getChatUserById } from '../DAO/chat.user.dao';

export const findUserById = async (id: number): Promise<IChatUser | null> => {
    return await getChatUserById(id);
}
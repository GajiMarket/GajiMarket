import { IChatMessage, IChatUser, IUser } from '../models/chat.models';
import { getMessagesByChatRoomId, sendMessage, getUserById, getChatRoomsByMemberNo } from '../DAO/chat.dao';

export const fetchMessages = async (chat_room_id: number): Promise<IChatMessage[]> => {
  return await getMessagesByChatRoomId(chat_room_id);
};

export const createMessage = async (message: IChatMessage): Promise<IChatMessage> => {
  return await sendMessage(message);
};

export const fetchUser = async (member_no: number): Promise<IUser | null> => {
  return await getUserById(member_no);
};

export const fetchChatRooms = async (member_no: number): Promise<IChatUser[]> => {
  return await getChatRoomsByMemberNo(member_no);
};
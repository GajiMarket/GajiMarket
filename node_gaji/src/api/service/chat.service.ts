import { getMessagesFromDB, saveMessageToDB } from '../DAO/chat.dao';

export const getChatMessages = async (roomId: string) => {
  return await getMessagesFromDB(roomId);
};

export const saveChatMessage = async (roomId: string, message: string) => {
  await saveMessageToDB(roomId, message);
};
import { getChatRoomsFromDB, getChatProductFromDB } from '../DAO/chat.dao';

export const getChatRoomsByMember = async (memberNo: number) => {
  return await getChatRoomsFromDB(memberNo);
};

export const getChatProductById = async (productId: number) => {
  return await getChatProductFromDB(productId);
};
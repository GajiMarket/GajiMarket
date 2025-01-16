import { getChatRoomsFromDB, getChatProductFromDB } from '../DAO/chat.dao';

export const getChatRooms = async (memberNo: number) => {
  return await getChatRoomsFromDB(memberNo);
};

export const getChatProductById = async (productId: number) => {
  return await getChatProductFromDB(productId);
};
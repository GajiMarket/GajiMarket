import { getChatRoomsFromDB, getProductFromDB } from '../DAO/chat.dao';

export const getChatRooms = async (memberNo: number) => {
  return await getChatRoomsFromDB(memberNo);
};

export const getProductByMemberNo = async (memberNo: number) => {
  return await getProductFromDB(memberNo);
};
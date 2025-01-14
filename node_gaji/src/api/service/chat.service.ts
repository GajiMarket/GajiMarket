import { getChatRoomsFromDB } from '../DAO/chat.dao';

export const getChatRooms = async (memberNo: number) => {
  return await getChatRoomsFromDB(memberNo);
};
import { getChatRoomsFromDB, getChatProductFromDB } from '../DAO/chat.dao';
/**
 * 주어진 memberNo로 해당 사용자의 채팅방 목록을 반환합니다.
 * 
 * @param memberNo - 채팅방을 조회할 회원의 고유 번호
 * @returns 채팅방 목록
 */
export const getChatRoomsByMember = async (memberNo: number) => {
  return await getChatRoomsFromDB(memberNo);
};
/**
 * 주어진 productId로 해당 상품 정보를 반환합니다.
 * 
 * @param productId - 조회할 상품의 고유 ID
 * @returns 상품 정보
 */
export const getChatProductById = async (productId: number) => {
  return await getChatProductFromDB(productId);
};
import { Request, Response } from 'express';
import { getChatRoomsByMember, getChatProductById } from '../service/chat.service';

/**
 * @openapi
 * /chatrooms/{memberNo}:
 *   get:
 *     tags:
 *       - Chat
 *     summary: 특정 사용자의 채팅방 목록 조회
 *     description: 특정 사용자의 고유 번호를 통해 해당 사용자가 참여한 모든 채팅방 목록을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: memberNo
 *         required: true
 *         schema:
 *           type: integer
 *         description: 사용자의 고유 번호
 *     responses:
 *       200:
 *         description: 채팅방 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   chatRoomId:
 *                     type: integer
 *                   chatRoomName:
 *                     type: string
 *       500:
 *         description: 채팅방 목록 조회 실패
 */
export const getChatRooms = async (req: Request, res: Response) => {
  const memberNo = parseInt(req.params.memberNo, 10);

  try {
    const chatRooms = await getChatRoomsByMember(memberNo);
    console.log('Fetched chat rooms:', chatRooms); // 로그 추가
    res.json(chatRooms);
  } catch (error) {
    console.error('Failed to fetch chat rooms:', error);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};

/**
 * @openapi
 * /product/{productId}:
 *   get:
 *     tags:
 *       - Chat
 *     summary: 채팅방 상품 정보 조회
 *     description: 특정 상품 ID를 기반으로 해당 상품과 관련된 상세 정보를 가져옵니다.
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: integer
 *         description: 상품의 고유 ID
 *     responses:
 *       200:
 *         description: 상품 정보 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 productId:
 *                   type: integer
 *                 productName:
 *                   type: string
 *                 price:
 *                   type: number
 *       500:
 *         description: 상품 정보 조회 실패
 */
export const getChatProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.productId, 10);

  try {
    const product = await getChatProductById(productId);
    console.log('Fetched product:', product); // 로그 추가
    res.json(product);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

import { Request, Response } from 'express';
import { getChatRoomsByMember, getChatProductById } from '../service/chat.service';

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
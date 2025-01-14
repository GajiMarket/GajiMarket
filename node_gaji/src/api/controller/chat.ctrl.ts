import { Request, Response } from 'express';
import { getChatRooms } from '../service/chat.service';

export const getChatRoomsByMember = async (req: Request, res: Response) => {
  const memberNo = parseInt(req.params.memberNo, 10);

  try {
    const chatRooms = await getChatRooms(memberNo);
    res.json(chatRooms);
  } catch (error) {
    console.error('Failed to fetch chat rooms:', error);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};
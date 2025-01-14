import { Request, Response } from 'express';
import { getChatMessages, saveChatMessage } from '../service/chat.service';

export const getMessages = async (req: Request, res: Response) => {
  const { roomId } = req.params;
  const messages = await getChatMessages(roomId);
  res.json(messages);
};

export const postMessage = async (req: Request, res: Response) => {
  const { roomId, message } = req.body;
  await saveChatMessage(roomId, message);
  res.status(201).send();
};
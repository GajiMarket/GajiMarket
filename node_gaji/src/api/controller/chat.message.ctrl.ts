import { Request, Response } from 'express';
import { getChatMessages, createChatMessage } from '../service/chat.message.service';
import { IChatMessage } from '../models/chat.message.models';

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    const userId1 = Number(req.params.userId1);
    const userId2 = Number(req.params.userId2);
    const messages = await getChatMessages(userId1, userId2);
    res.json(messages);
};

export const sendMessage = async (req: Request, res: Response) => {
    const message: IChatMessage = req.body;
    await createChatMessage(message);
    res.status(201).json({ message: 'Message sent' });
};
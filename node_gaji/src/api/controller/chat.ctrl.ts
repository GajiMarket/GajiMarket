import { Request, Response } from 'express';
import { findUserById, getChatMessages, createChatMessage } from '../service/chat.service';
import { IChatMessage } from '../models/chat.models';

// 채팅 사용자
export const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = Number(req.params.id);
    const user = await findUserById(userId);
    if (user) {
        res.json(user);
    }else {
        res.status(404).json({error: 'User not found'});
    }
};

// 채팅 메세지
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
import { Request, Response } from 'express';
import { fetchMessages, createMessage, fetchUser, fetchChatRooms } from '../service/chat.service';

export const getMessages = async (req: Request, res: Response) => {
  const chat_room_id = Number(req.params.id);
  try {
    const messages = await fetchMessages(chat_room_id);
    res.json(messages);
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  const chat_room_id = Number(req.params.id);
  const { chat_message, member_no, images } = req.body;
  try {
    const newMessage = await createMessage({ chat_room_id, chat_message, read_or_not: false, created_at: new Date(), member_no, images });
    res.json(newMessage);
  } catch (error) {
    console.error('Failed to send message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  const member_no = Number(req.params.id);
  try {
    const user = await fetchUser(member_no);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};

export const getChatRooms = async (req: Request, res: Response) => {
  const member_no = Number(req.params.id);
  try {
    const chatRooms = await fetchChatRooms(member_no);
    res.json(chatRooms);
  } catch (error) {
    console.error('Failed to fetch chat rooms:', error);
    res.status(500).json({ error: 'Failed to fetch chat rooms' });
  }
};
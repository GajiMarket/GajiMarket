import { db } from '../../config/dbConfig';
import { IChatMessage, IChatUser, IUser } from '../models/chat.models';

export const getMessagesByChatRoomId = async (chat_room_id: number): Promise<IChatMessage[]> => {
  const result = await db.query('SELECT * FROM chat_messages WHERE chat_room_id = $1 ORDER BY created_at ASC', [chat_room_id]);
  return result.rows;
};

export const sendMessage = async (message: IChatMessage): Promise<IChatMessage> => {
  const result = await db.query(
    'INSERT INTO chat_messages (chat_message, read_or_not, created_at, chat_room_id, member_no, images) VALUES ($1, $2, NOW(), $3, $4, $5) RETURNING *',
    [message.chat_message, message.read_or_not, message.chat_room_id, message.member_no, message.images]
  );
  return result.rows[0];
};

export const getUserById = async (member_no: number): Promise<IUser | null> => {
  const result = await db.query('SELECT * FROM member_tbl WHERE member_no = $1', [member_no]);
  return result.rows[0] || null;
};

export const getChatRoomsByMemberNo = async (member_no: number): Promise<IChatUser[]> => {
  const result = await db.query('SELECT * FROM chat_room WHERE member_no = $1 OR buyer_no = $1', [member_no]);
  return result.rows;
};
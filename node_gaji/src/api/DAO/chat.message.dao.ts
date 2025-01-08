import { db, schema } from '../../config/dbConfig';
import { IChatMessage } from '../models/chat.message.models';

export const getMessagesBetweenUsers = async (userId1: number, userId2: number): Promise<IChatMessage[]> => {
  const result = await db.query(
    'SELECT * FROM chat_messages WHERE (message_id = $1 AND chat_message_id = $2) OR (message_id = $2 AND chat_message_id = $1) ORDER BY created_at ASC',
    [userId1, userId2]
  );
  return result.rows;
};

export const sendMessage = async (message: IChatMessage): Promise<void> => {
  await db.query(
    'INSERT INTO chat_messages (message_id, chat_room_id, chat_message, created_at, images) VALUES ($1, $2, $3, $4, $5)',
    [message.message_id, message.chat_room_id, message.chat_message, message.created_at, message.images]
  );
};
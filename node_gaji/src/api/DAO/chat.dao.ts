import { db } from '../../config/dbConfig';

export const getMessagesFromDB = async (roomId: string) => {
  const result = await db.query('SELECT * FROM chat_messages WHERE chat_room_id = $1', [roomId]);
  return result.rows;
};

export const saveMessageToDB = async (roomId: string, message: string) => {
  await db.query('INSERT INTO chat_messages (chat_room_id, chat_message) VALUES ($1, $2)', [roomId, message]);
};
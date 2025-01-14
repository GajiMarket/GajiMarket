import { db } from '../../config/dbConfig';

export const getChatRoomsFromDB = async (memberNo: number) => {
  const result = await db.query(`
    SELECT cr.chat_room_id, cm.chat_message AS last_message, cm.created_at AS last_message_time, m.member_nick AS name, m.member_addr AS location
    FROM chat_room cr
    JOIN chat_messages cm ON cr.chat_room_id = cm.chat_room_id
    JOIN member_tbl m ON cr.member_no = m.member_no
    WHERE cr.buyer_no = $1 OR cr.member_no = $1
    ORDER BY cm.created_at DESC
  `, [memberNo]);
  return result.rows;
};
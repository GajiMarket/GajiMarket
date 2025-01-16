import { db } from '../../config/dbConfig';

export const getChatRoomsFromDB = async (memberNo: number) => {
  const result = await db.query(`
    SELECT cr.chat_room_id, cm.chat_message AS last_message, cm.created_at AS last_message_time, m.member_nick AS name, m.member_addr AS location
    FROM team4.chat_room cr
    JOIN team4.chat_messages cm ON cr.chat_room_id = cm.chat_room_id
    JOIN team4.member_tbl m ON cr.member_no = m.member_no
    WHERE cr.buyer_no = $1 OR cr.member_no = $1
    ORDER BY cm.created_at DESC
  `, [memberNo]);
  return result.rows;
};

export const getChatProductFromDB = async (productId: number) => {
  const result = await db.query(`
    SELECT status, title, sell_price AS price, member_addr AS location
    FROM team4.product
    WHERE product_id = $1
  `, [productId]);
  return result.rows[0];
};
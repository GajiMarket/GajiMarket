import { db } from '../../config/dbConfig';

export const getChatRoomsFromDB = async (memberNo: number) => {
  const result = await db.query(`
    SELECT cr.chat_room_id, cm.chat_message AS last_message,
           CASE
             WHEN DATE(cm.created_at) = CURRENT_DATE THEN TO_CHAR(cm.created_at, 'HH24:MI')
             ELSE TO_CHAR(cm.created_at, 'MM-DD')
           END AS last_message_time,
           CASE
             WHEN cr.member_no = $1 THEN b.member_nick
             ELSE m.member_nick
           END AS name,
           CASE
             WHEN cr.member_no = $1 THEN
               CASE
                 WHEN POSITION('구' IN b.member_addr) > 0 THEN SUBSTRING(b.member_addr FROM POSITION('구' IN b.member_addr) - 2 FOR 3)
                 ELSE SUBSTRING(b.member_addr FROM POSITION('동' IN b.member_addr) - 2 FOR 3)
               END
             ELSE
               CASE
                 WHEN POSITION('구' IN m.member_addr) > 0 THEN SUBSTRING(m.member_addr FROM POSITION('구' IN m.member_addr) - 2 FOR 3)
                 ELSE SUBSTRING(m.member_addr FROM POSITION('동' IN m.member_addr) - 2 FOR 3)
               END
           END AS location,
           CASE
             WHEN cr.member_no = $1 THEN
               CASE
                 WHEN POSITION('구' IN m.member_addr) > 0 THEN SUBSTRING(m.member_addr FROM POSITION('구' IN m.member_addr) - 2 FOR 3)
                 ELSE SUBSTRING(m.member_addr FROM POSITION('동' IN m.member_addr) - 2 FOR 3)
               END
             ELSE
               CASE
                 WHEN POSITION('구' IN b.member_addr) > 0 THEN SUBSTRING(b.member_addr FROM POSITION('구' IN b.member_addr) - 2 FOR 3)
                 ELSE SUBSTRING(b.member_addr FROM POSITION('동' IN b.member_addr) - 2 FOR 3)
               END
           END AS opposite_location,
           (SELECT image FROM team4.photo WHERE product_id = cr.product_id ORDER BY photo_id LIMIT 1) AS avatar
    FROM team4.chat_room cr
    JOIN team4.chat_messages cm ON cr.chat_room_id = cm.chat_room_id
    JOIN team4.member_tbl m ON cr.member_no = m.member_no
    JOIN team4.member_tbl b ON cr.buyer_no = b.member_no
    WHERE cr.member_no = $1 OR cr.buyer_no = $1
    ORDER BY cm.created_at DESC
  `, [memberNo]);
  return result.rows;
};

export const getChatProductFromDB = async (productId: number) => {
  const productResult = await db.query(`
    SELECT status, title, sell_price AS price, member_addr AS location
    FROM team4.product
    WHERE product_id = $1
  `, [productId]);

  const photoResult = await db.query(`
    SELECT image
    FROM team4.photo
    WHERE product_id = $1
    ORDER BY photo_id LIMIT 1
  `, [productId]);

  return {
    ...productResult.rows[0],
    image: photoResult.rows[0]?.image || null
  };
};
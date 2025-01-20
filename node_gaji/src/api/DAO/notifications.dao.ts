import { IProduct } from "api/models/product";
import { INotifications } from "api/models/notifications.model";
import { db, schema } from "../../config/dbConfig";
import { notifyClient } from "../../config/websocket";

export const sendNotificationToUsers = async (product: IProduct): Promise<void> => {
  try {
    const query = `
      SELECT k.member_no, k.keyword_name
      FROM ${schema}.keyword k
      WHERE $1 ILIKE '%' || k.keyword_name || '%';
    `;

    const values = [product.title];
    const result = await db.query<{ member_no: number; keyword_name: string }>(query, values);

    if (result.rows.length === 0) {
      console.log("No matching keywords found for the product.");
      return;
    }

    for (const row of result.rows) {
      const message = `새로운 제품 '${product.title}'이(가) 등록되었습니다!`;

      // WebSocket으로 알림 전송
      notifyClient(row.member_no.toString(), message);

      console.log(`Notification sent to member_no: ${row.member_no}, message: "${message}"`);
    }
  } catch (error) {
    console.error("Error in sendNotificationToUsers:", error);
    throw new Error("사용자 알림 전송 중 오류가 발생했습니다.");
  }
};

export const getNotificationsByMember = async (memberNo: number): Promise<INotifications[]> => {
    const query = `
      SELECT * FROM ${schema}.notifications
      WHERE member_no = $1
      ORDER BY created_at DESC
    `;
  
    const result = await db.query(query, [memberNo]);
    console.log("member notice:", result.rows);
    return result.rows as INotifications[];
};

export const createNotification = async (message: string, memberNo: number, keywordId: number): Promise<void> => {
    const query = `
      INSERT INTO ${schema}.notifications (notice_message, member_no, keyword_id, read_or_not, created_at)
      VALUES ($1, $2, $3, $4, NOW())
    `;
  
    await db.query(query, [message, memberNo, keywordId, false]);
};
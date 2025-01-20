import { db, schema } from "../../config/dbConfig";
import { INotifications } from "../models/notifications.model";
import { IProduct } from "../models/product";
import { notifyClient } from "../../config/websocket";

// 알림 목록 조회
export const getNotificationsByMember = async (memberNo: number): Promise<INotifications[]> => {
  const query = `
    SELECT * FROM ${schema}.notifications
    WHERE member_no = $1
    ORDER BY created_at DESC
  `;
  const result = await db.query(query, [memberNo]);
  return result.rows as INotifications[];
};

// 알림 생성
export const createNotification = async (
  message: string,
  memberNo: number,
  keywordId: number
): Promise<void> => {
  const query = `
    INSERT INTO ${schema}.notifications (notice_message, member_no, keyword_id, read_or_not, created_at)
    VALUES ($1, $2, $3, $4, NOW())
  `;
  await db.query(query, [message, memberNo, keywordId, false]);
};

// 알림 읽음 처리
export const updateNotificationReadStatus = async (id: number): Promise<void> => {
  const query = `
    UPDATE ${schema}.notifications
    SET read_or_not = true
    WHERE notice_id = $1
  `;
  await db.query(query, [id]);
};

// 키워드와 매칭된 사용자에게 알림 전송
export const sendNotificationToUsers = async (product: IProduct): Promise<void> => {
  try {
    // 키워드와 매칭된 사용자 조회
    const query = `
      SELECT k.member_no, k.keyword_id
      FROM ${schema}.keyword k
      WHERE $1 ILIKE '%' || k.keyword_name || '%';
    `;

    const values = [product.title];
    const result = await db.query<{ member_no: number; keyword_id: number }>(query, values);

    if (result.rows.length === 0) {
      console.log("No matching keywords found for the product.");
      return;
    }

    for (const row of result.rows) {
      const message = `새로운 제품 '${product.title}'이(가) 등록되었습니다!`;

      // WebSocket으로 사용자에게 알림 전송
      notifyClient(row.member_no.toString(), message);

      // 알림 DB에 기록
      await createNotification(message, row.member_no, row.keyword_id);

      console.log(`Notification sent and recorded for member_no: ${row.member_no}, message: "${message}"`);
    }
  } catch (error) {
    console.error("Error in sendNotificationToUsers:", error);
    throw new Error("사용자 알림 전송 중 오류가 발생했습니다.");
  }
};